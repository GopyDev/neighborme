from urllib2 import urlopen
import json
import os
import requests
from flask import url_for

class FacebookAPI(object):
    base_url = 'https://graph.facebook.com/v2.4'

    def __init__(self, access_token):
        self.access_token = access_token

    def get_me(self):
        return self.get('/me?fields=first_name,last_name,gender')

    def get(self, query):
        url = '%s%s&access_token=%s' % (self.base_url, query, self.access_token)
        return json.loads(urlopen(url).read())


class PayPal(object):
    """
    Interact with the PayPal API
    """

    #PAYPAL_ADAPTIVE_ENDPOINT should be set to
    #'https://svcs.paypal.com/AdaptivePayments/Pay'
    #in the production environment
    adaptive_endpoint = os.environ.get('PAYPAL_ADAPTIVE_ENDPOINT') or\
        'https://svcs.sandbox.paypal.com/AdaptivePayments/Pay'

    #PAYPAL_ADAPTIVE_ENDPOINT should be set to
    #'https://www.paypal.com/cgi-bin/webscr'
    #in the production environment
    endpoint = os.environ.get('PAYPAL_ENDPOINT') or\
        'https://www.sandbox.paypal.com/cgi-bin/webscr'



    def __init__(self):
        self.paypal_id = os.environ.get('PAYPAL_ID') #neighborme's paypal email
        self.app_id = os.environ.get('PAYPAL_APP_ID') or 'APP-80W284485P519543T' #universal sandbox app id

        #The following are found in a business account profile
        #under `selling tools` -> `api access` -> `update`
        self.api_username = os.environ.get('PAYPAL_DEVELOPER_USER_NAME')
        self.api_password = os.environ.get('PAYPAL_DEVELOPER_PASSWORD')
        self.api_signature = os.environ.get('PAYPAL_DEVELOPER_SIGNATURE')

        #Specify route to IPN listener
        self.ipn_listener = os.environ.get('PAYPAL_IPN_LISTENER') or\
            url_for('ipnlistener', _external=True)


    def send_funds(self, receiver_id, amount):
        """
        Access the PayPal API. Specifically,
        use Adaptive Payments to make a Chained Payment.
        https://developer.paypal.com/docs/classic/adaptive-payments/integration-guide/APIntro/

        Call this when a client of neighborme has marked a request as completed.
        receiver_id is the email associated with the contractor's paypal account
        and amount is the dollar amount, not including neighborme's service fee.
        """

        headers = {
            'X-PAYPAL-SECURITY-USERID': self.api_username,
            'X-PAYPAL-SECURITY-PASSWORD': self.api_password,
            'X-PAYPAL-SECURITY-SIGNATURE': self.api_signature,
            'X-PAYPAL-REQUEST-DATA-FORMAT': 'JSON',
            'X-PAYPAL-RESPONSE-DATA-FORMAT': 'JSON',
            'X-PAYPAL-APPLICATION-ID': self.app_id
        }


        payload  = {
            'actionType': 'PAY',
            'currencyCode': 'USD',
            'feesPayer': 'PRIMARYRECEIVER', #neighborme pays paypal fees
            'reverseAllParallelPaymentsOnError': True,
            'receiverList': {
                'receiver': [
                    {
                        'email': self.paypal_id,
                        'amount': '%.2f' % (amount*1.1), #10% fee
                        'primary': True
                    },
                    {
                        'email': receiver_id,
                        'amount': '%.2f' % amount,
                        'primary': False
                    }
                ]
            },
            'returnUrl': url_for('dashboard.requests', _external=True),
            'cancelUrl': url_for('dashboard.requests', _external=True),
            'requestEnvelope': {
                'errorLanguage': 'en_US',
                'detailLevel': 'ReturnAll',
            },
            'ipnNotificationUrl': self.ipn_listener
        }

        res = requests.post(self.adaptive_endpoint, headers=headers, json=payload)
        return json.loads(res.text)

    def verify_ipn(self, data):
        """Validate a paypal IPN"""
        data = dict(data)
        data['cmd'] = '_notify-validate'
        resp = requests.post(self.endpoint, data=data)
        if resp.text == 'VERIFIED':
            return True
        return False

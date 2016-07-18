## PayPal Payments

`app.lib.PayPal.send_funds` implements a
[Chained Payment](https://developer.paypal.com/docs/classic/adaptive-payments/ht_ap-basicChainedPayment-curl-etc/). The response includes a pay key which is used to send the user to a paypal authorization page. This would ideally be implemented as a [lightbox](https://developer.paypal.com/docs/classic/adaptive-payments/ht_ap-embeddedPayment-curl-etc/) in the interface.

### User Experience
A client of neighborme will be charged 110% of the fee arranged
between them and the contractor. The client's paypal history
will show a payment made to neighborme. The contractor will
receive a paypal payment from neighborme  - 100% of the fee
arranged through the app. neighborme incurs all paypal fees.
Users on neighborme see paypal details of neither client nor
contractor.

### Environment Variables

Testing (temporarily working) credentials can be added to the
environment thusly:
```
export PAYPAL_DEVELOPER_USER_NAME=neighbordev_api1.neighborme.com
export PAYPAL_DEVELOPER_PASSWORD=WP4E7DN4KP4C7YWC
export PAYPAL_DEVELOPER_SIGNATURE=AFcWxV21C7fd0v3bYYYRCpSSRl31ApNkZWW2FeIvExHRiP2ng67WV4RJ
export PAYPAL_APP_ID=APP-80W284485P519543T #neighborme's app id
export PAYPAL_ID=syedahmedz-facilitator@hotmail.com #neighborme's paypal account
```

The values of the first three variables above, containing `DEVELOPER`, are obtained through a [registration process](https://developer.paypal.com/docs/classic/lifecycle/goingLive/#credentials) with PayPal. Additionally, an `APP_ID` (obtained through registration) needs to be specified. For testing, use the sandbox id `'APP-80W284485P519543T'`.

To obtain sandbox credentials for accessing the API, log into a sandbox business account and navigate to `profile` -> `selling tools` -> `api access` -> `update`.

### IPNs

PayPal Instant Payment Notifications are saved in the database in the `'ipns'`
table. The are saved as an [SQLAlchemy JSON](http://docs.sqlalchemy.org/en/latest/dialects/postgresql.html#json-types) type. An example IPN schema follows:

```
{  
    "pay_key":"AP-3K38418910365311W",
    "transaction[0].id_for_sender_txn":"65B03942H62875718",
    "transaction[0].paymentType":"SERVICE",
    "transaction[0].pending_reason":"NONE",
    "transaction[1].paymentType":"SERVICE",
    "charset":"windows-1252",
    "log_default_shipping_address_in_transaction":"false",
    "transaction[0].id":"7VL9508832191002B",
    "notify_version":"UNVERSIONED",
    "transaction[1].id":"7MX20793BV4455152",
    "test_ipn":"1",
    "transaction[0].status":"Completed",
    "status":"COMPLETED",
    "sender_email":"sandbox-facilitator@gmail.com",
    "transaction[0].receiver":"sandbox-contractor@hotmail.com",
    "transaction[1].status":"Completed",
    "transaction[0].is_primary_receiver":"true",
    "transaction[1].id_for_sender_txn":"90288295WJ377921R",
    "verify_sign":"AFcWxV21C7fd0v3bYYYRCpSSRl31AfE9vk74yLOQ-VeCViWjPjG3I3hm",
    "transaction[1].pending_reason":"NONE",
    "transaction[0].status_for_sender_txn":"Completed",
    "transaction[1].status_for_sender_txn":"Completed",
    "payment_request_date":"Thu May 05 10:36:46 PDT 2016",
    "transaction[1].receiver":"dood@dood.com",
    "transaction[1].amount":"USD 9000.00",
    "ipn_notification_url":"https://tunneltome.ngrok.io/ipnlistener",
    "transaction[0].amount":"USD 9900.00",
    "transaction_type":"Adaptive Payment PAY",
    "cancel_url":"http://localhost:5000/dashboard/requests",
    "reverse_all_parallel_payments_on_error":"true",
    "action_type":"PAY",
    "transaction[1].is_primary_receiver":"false",
    "fees_payer":"PRIMARYRECEIVER",
    "return_url":"http://localhost:5000/dashboard/requests"
}
```

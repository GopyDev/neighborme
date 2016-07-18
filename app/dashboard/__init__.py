import json
import os

from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask.ext.login import current_user, login_required
from app import add_bootstrap_data, signup_required, get_bootstrap_data
from app.lib import PayPal
from app.models import Request
from app.models import User
from app.models import Offer

dashboard = Blueprint('dashboard', __name__,
        template_folder='templates')

@dashboard.route('/browse', methods=['GET'])
@login_required
@signup_required
def browse():
    requests = Request.query.order_by(Request.id.desc()).all()
    requests_json = json.dumps(map(lambda r: r.to_dict(), requests))
    add_bootstrap_data('requests', requests_json)
    return render_template('browse.html')

@dashboard.route('/requests', methods=['GET'])
@login_required
@signup_required
def requests():
    requests = (Request.query
            .filter_by(user_id=current_user.id)
            .order_by(Request.id.desc())
            .all())

    requests_json = json.dumps(map(lambda r: r.to_dict(), requests))
    add_bootstrap_data('requests', requests_json)
    return render_template('requests.html')

@dashboard.route('/complete', methods=['GET', 'POST'])
@login_required
@signup_required
def complete():
    if request.method == 'POST':
        paypal = PayPal()
        res = paypal.send_funds(
            request.form['receiver_id'],
            float(request.form['amount'])
        )
        payKey = res[u'payKey']
        #in production environment,
        #set PAYPAL_ENDPOINT to
        #https://www.paypal.com/cgi-bin/webscr
        url = os.environ.get('PAYPAL_ENDPOINT') or\
            'https://www.sandbox.paypal.com/cgi-bin/webscr'
        url += '?cmd=_ap-payment&paykey=%s'
        return redirect(url % payKey)
    return render_template('complete.html')

@dashboard.route('/offers', methods=['GET'])
@login_required
@signup_required
def offers():
    offer = Offer.query.filter_by(id=current_user.id).first()
    if offer is None:
        flash('Offer does not exist.')
        return render_template('offers.html')
        #return redirect(url_for('home.index'))
    request_id=offer.request_id
    request = Request.query.filter_by(id=request_id).first()
    reqdict=request.to_dict()
    offdict=offer.to_dict()
    offerdict = {key: value for (key, value) in (reqdict.items() + offdict.items())}
    offer_json = json.dumps(offerdict)

    #requests_json = json.dumps(map(lambda r: r.to_dict(), request))

    add_bootstrap_data('offers', offer_json)
    return render_template('offers.html')

@dashboard.route('/profile', methods=['GET'])
@login_required
@signup_required
def edit_profile():
    return render_template('edit_profile.html')

@dashboard.route('/offerhelp/<int:request_id>', methods=['GET'])
@login_required
@signup_required
def offerhelp(request_id):

    requestinfo = Request.query.filter_by(id=request_id).first()
    if requestinfo is None:
        flash('Request does not exist.')
        return redirect(url_for('home.index'))

    offer=Offer.query.filter_by(id=current_user.id).first()
    if offer is None:
        requestinfo.helpuser_id=1
    else:
        requestinfo.helpuser_id=0

    add_bootstrap_data('requestinfo', requestinfo.to_json())
    return render_template('offerhelp.html')

@dashboard.route('/chatroom/<int:request_id>', methods=['GET'])
@login_required
@signup_required
def chatroom(request_id):
    requestinfo = Request.query.filter_by(id=request_id).first()
    if requestinfo is None:
        flash('ChatRoom does not exist.')
        return redirect(url_for('home.index'))
    offers = (Offer.query
            .filter_by(request_id=request_id)
            .order_by(Offer.id.desc())
            .all())
    if offers is None:
        flash('Offer does not exist.')
        return redirect(url_for('home.index'))
    offers_json = json.dumps(map(lambda r: r.to_dict(), offers))

    add_bootstrap_data('chatroom', requestinfo.to_json())
    add_bootstrap_data('offerlists', offers_json)

    return render_template('chatroom.html')

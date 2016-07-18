import json
import os

from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask.ext.login import current_user, login_required
from app import add_bootstrap_data, signup_required, get_bootstrap_data
from app.lib import PayPal
from app.models import Request
from app.models import User
from app.models import Offer

settings = Blueprint('settings', __name__, template_folder='templates')


@settings.route('/', methods=['GET'])
@login_required
@signup_required
def settings_home():
    return render_template('edit_profile.html')

@settings.route('/profile', methods=['GET'])
@login_required
@signup_required
def edit_profile():
    return render_template('edit_profile.html')

@settings.route('/payment', methods=['GET'])
@login_required
@signup_required
def payment():
    return render_template('payment.html')


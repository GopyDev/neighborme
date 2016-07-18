import json, logging

from flask import (
    Blueprint,
    flash,
    jsonify,
    redirect,
    render_template,
    url_for
)
from flask.ext.login import (
    current_user,
    login_required,
    login_user,
    logout_user
)
from app import db, signup_required
from app.models import Request, User
from app.forms import LoginForm, SignupForm
from app.lib import FacebookAPI

auth = Blueprint('auth', __name__,
        template_folder='templates')

@auth.route('/signup', methods=('GET', 'POST'))
def signup():
    if not current_user.is_anonymous:
        return redirect(url_for('home.index'))

    form = SignupForm()
    if form.validate_on_submit():
        email = form.email.data.lower()
        user = User.query.filter_by(email=email).first()

        if user is not None:
            logging.error("User %s already exists" % (email))
            return render_template(
                        'signup.html',
                        signup_form=form,
                        error="Account already exists")

        user = User(email=email,
                    password=form.password.data)
        db.session.add(user)
        db.session.commit()

        login_user(user)

        return redirect(url_for('home.index'))
    return render_template('signup.html', signup_form=form)

@auth.route('/login', methods=('GET', 'POST'))
def login():
    if not current_user.is_anonymous:
        return redirect(url_for('home.index'))

    form = LoginForm()
    if form.validate_on_submit():
        email = form.email.data.lower()
        user = User.query.filter_by(email=email).first()
        if user is None:
            logging.error("User %s is not found" % (email))
            return render_template(
                    'login.html',
                    login_form=form,
                    error="Invalid email or password")

        if not user.verify_password(unicode(form.password.data)):
            logging.error("Invalid password")
            return render_template(
                    'login.html',
                    login_form=form,
                    error="Invalid email or password")

        login_user(user)

        flash('Logged in successfully.')

        return redirect(url_for('home.index'))
    return render_template('login.html', login_form=form)

@auth.route('/fb_login', methods=['POST'])
def fb_login():
    access_token = request.form['accessToken']
    api = FacebookAPI(access_token)
    me = api.get_me()
    facebook_id = int(me['id'])

    user = User.query.filter_by(facebook_id=facebook_id).first()
    if user is None:
        user = User(
                first_name=me['first_name'],
                last_name=me['last_name'],
                email=me.get('email', None),
                gender=me['gender'],
                facebook_id=facebook_id)
        db.session.add(user)
        db.session.commit()

    login_user(user)

    return redirect(url_for('home.index'))

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home.index'))

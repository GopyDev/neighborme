from flask import (
    Blueprint,
    redirect,
    render_template,
    url_for
)
from flask.ext.login import current_user
from app import add_bootstrap_data
from app.forms import SignupForm

home = Blueprint('home', __name__,
        template_folder='templates')

@home.route('/')
def index():
    if current_user.is_anonymous:
        signup_form = SignupForm()
        add_bootstrap_data('csrf_token', signup_form.csrf_token.current_token)
        return render_template('index.html')
    else:
        return redirect(url_for('dashboard.browse'))

@home.route('/privacy')
def privacy():
    return render_template('privacy-policy.html')

@home.route('/terms')
def terms():
    return render_template('terms-of-service.html')

@home.route('/examples')
def examples():
    return render_template('examples.html')

import os

from flask import (
    Flask,
    g,
    json,
    render_template,
    send_from_directory,
    request
)
from flask.ext.assets import Environment, Bundle
from flask.ext.sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask.ext.login import (
    current_user,
    LoginManager,
    login_required
)
from flask.ext.bcrypt import Bcrypt

from functools import wraps

app = Flask(__name__)
admin = Admin(app, name='NeighborMeAdmin', template_mode='bootstrap3')

# Config
config = app.config
config.from_object('config')

# Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Assets
assets = Environment(app)
assets.url = app.static_url_path
scss = Bundle('css/*.scss', filters='pyscss', output='all.css')
assets.register('scss_all', scss)

# DB
db = SQLAlchemy(app)

from flask_admin.contrib import sqla
from flask.ext.login import UserMixin
from datetime import datetime
from flask_admin.contrib.sqla import ModelView
"""
class Userinfo(db.Model, UserMixin):

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Unicode(80))
    last_name = db.Column(db.Unicode(80))
    gender = db.Column(db.String(20))
    birthday = db.Column(db.Date)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, onupdate=datetime.now)
    facebook_id = db.Column(db.Integer, unique=True)
    email = db.Column(db.String(254), unique=True)
    password_hash = db.Column(db.Unicode(60))

    zipcode = db.Column(db.String(10))
    phone_number = db.Column(db.String(40))
    signup_completed = db.Column(db.Boolean, default=False)

    skills_other = db.Column(db.Unicode(200))
    about_me = db.Column(db.Unicode(200))
    help_reason = db.Column(db.Unicode(200))


    def __init__(self, first_name=None, last_name=None,
            gender=None, birthday=None, facebook_id=None,
            email=None, password=None):
        self.first_name = first_name
        self.last_name = last_name
        self.gender = gender
        self.birthday = birthday
        self.facebook_id = facebook_id
        self.email = email
        if password is not None:
            self.password_hash = bcrypt.generate_password_hash(password)


#admin
class UserInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    key = db.Column(db.String(64), nullable=False)
    value = db.Column(db.String(64))

    user_id = db.Column(db.Integer(), db.ForeignKey(Userinfo.id))
    user = db.relationship(Userinfo, backref='info')

    def __unicode__(self):
        return '%s - %s' % (self.key, self.value)

# Customized User model admin
class UserAdmin(sqla.ModelView):
    inline_models = (UserInfo,)

admin.add_view(UserAdmin(Userinfo, db.session))
"""

# Bcrypt
bcrypt = Bcrypt(app)

from app.models import User, Skill

#admin
admin.add_view(ModelView(User, db.session))

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=user_id).first()

@app.before_request
def before_request():
    g.bootstrap_data = []

def add_bootstrap_data(name, value):
    g.bootstrap_data.append({'name': name, 'value': value})

def get_bootstrap_data():
    return g.bootstrap_data

def all_skills():
    return json.dumps(map(lambda s: s.name, Skill.query.all()))

def signup_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.finished_signup():
            add_bootstrap_data('skills', all_skills())
            return render_template('signup_flow.html')
        return f(*args, **kwargs)
    return decorated_function

@app.context_processor
def utility_processor():
    return dict(bootstrap_data=g.bootstrap_data)

# Routes
@app.route('/uploads/<path:resource_name>')
def uploads(resource_name):
    directory = os.path.join(config['UPLOAD_FOLDER'], os.path.dirname(resource_name))
    filename = os.path.basename(resource_name)
    return send_from_directory(directory, filename)


from lib import PayPal
from app.models import Ipn

@app.route('/ipnlistener', methods=['POST'])
def ipnlistener():
    """IPN listener for paypal payments"""
    ipn = request.form
    paypal = PayPal()
    if not paypal.verify_ipn(ipn):
        return 'Invalid IPN'

    #Save all IPNs
    this_ipn = Ipn(ipn)
    db.session.add(this_ipn)
    db.session.commit()

    return ''

from blueprints import api, auth, dashboard, home, users, settings
app.register_blueprint(api, url_prefix='/api/v1')
app.register_blueprint(auth)
app.register_blueprint(dashboard, url_prefix='/dashboard')
app.register_blueprint(settings, url_prefix='/settings')
app.register_blueprint(home)
app.register_blueprint(users, url_prefix='/users')

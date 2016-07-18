import os

from flask import (
    Flask,
    g,
    json,
    render_template,
    send_from_directory
)
from flask.ext.assets import Environment, Bundle
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import (
    current_user,
    LoginManager,
    login_required
)
from flask.ext.bcrypt import Bcrypt

from functools import wraps

app = Flask(__name__)

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

# Bcrypt
bcrypt = Bcrypt(app)

from app.models import User, Skill

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

from blueprints import api, auth, dashboard, home, users
app.register_blueprint(api, url_prefix='/api/v1')
app.register_blueprint(auth)
app.register_blueprint(dashboard, url_prefix='/dashboard')
app.register_blueprint(home)
app.register_blueprint(users, url_prefix='/users')

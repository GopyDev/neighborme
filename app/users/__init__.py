from flask import Blueprint, flash, redirect, render_template, url_for
from flask.ext.login import login_required
from app import add_bootstrap_data
from app.models import User

users = Blueprint('users', __name__,
        template_folder='templates')

@users.route('/<int:user_id>', methods=['GET'])
@login_required
def profile(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        flash('User does not exist.')
        return redirect(url_for('home.index'))

    add_bootstrap_data('profile', user.to_json())
    return render_template('profile.html')

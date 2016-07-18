from flask_wtf import Form
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Email, EqualTo

class LoginForm(Form):
    email = StringField(validators=[InputRequired(), Email()])
    password = PasswordField(validators=[InputRequired()])

class SignupForm(Form):
    email = StringField(validators=[InputRequired(), Email()])
    password = PasswordField(
            validators=[
                InputRequired(),
                EqualTo(u'password_confirmation', message='Passwords must match')])
    password_confirmation = PasswordField()

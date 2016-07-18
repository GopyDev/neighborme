import json, os
from app import db, bcrypt
from flask.ext.login import UserMixin
from datetime import datetime

users_skills = db.Table('users_skills',
        db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
        db.Column('skill_id', db.Integer, db.ForeignKey('skills.id')))

users_desired_skills = db.Table('users_desired_skills',
        db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
        db.Column('skill_id', db.Integer, db.ForeignKey('skills.id')))

class User(db.Model, UserMixin):
    __tablename__ = 'users'

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

    profile_picture_id = db.Column(db.Integer, db.ForeignKey('pictures.id'))
    profile_picture = db.relationship('Picture')

    zipcode = db.Column(db.String(10))
    phone_number = db.Column(db.String(40))
    skills = db.relationship('Skill', secondary=users_skills)
    desired_skills = db.relationship('Skill', secondary=users_desired_skills)
    signup_completed = db.Column(db.Boolean, default=False)

    skills_other = db.Column(db.Unicode(200))
    desired_skills_other = db.Column(db.Unicode(200))
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

    def finished_signup(self):
        return self.signup_completed

    def verify_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def profile_picture_url(self):
        if self.profile_picture_id is None:
            return None

        object_name = "users/%d/profile_pictures/%d.%s" % (self.id,
            self.profile_picture_id, self.profile_picture.extension)
        S3_BUCKET = 'neighborme-photos'

        if os.environ.get('FLASK_ENV') == 'production':
            return 'https://%s.s3.amazonaws.com/%s' % (S3_BUCKET, object_name)
        else:
            return '/uploads/' + object_name

    # TODO(phillippe): Create various representations of the user object
    def to_json(self):
        return json.dumps({
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'zipcode': self.zipcode,
            'gender': self.gender,
            'phone_number': self.phone_number,
            'skills': map(lambda s: s.name, self.skills),
            'skills_other': self.skills_other,
            'desired_skills': map(lambda s: s.name, self.desired_skills),
            'desired_skills_other': self.desired_skills_other,
            'profile_picture_url': self.profile_picture_url(),
            'about_me': self.about_me,
            'help_reason': self.help_reason
            })

    def __repr__(self):
        return '<User %r>' % self.id

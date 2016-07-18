from app import db
from sqlalchemy.dialects.postgresql import JSON
from datetime import datetime

class Ipn(db.Model):
    __tablename__ = 'ipns'

    id = db.Column(db.Integer, primary_key=True)
    ipn = db.Column(JSON)
    created_at = db.Column(db.DateTime, default=datetime.now)

    def __init__(self, ipn):
        self.ipn = ipn

    def __repr__(self):
        return '<IPN %r>' % self.id

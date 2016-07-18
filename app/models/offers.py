import json, decimal
from app import db
from datetime import datetime

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)

class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if hasattr(obj, 'isoformat'): #handles both date and datetime objects
            return obj.isoformat()
        else:
            return json.JSONEncoder.default(self, obj)

class Offer(db.Model):
    __tablename__ = 'offers'

    id = db.Column(db.Integer, primary_key=True)
    offer = db.Column(db.UnicodeText)
    offer_status = db.Column(db.Unicode(255))
    request_id = db.Column(db.Integer, db.ForeignKey('requests.id'))
    request = db.relationship('Request')
    lmessage_at = db.Column(db.DateTime, default=datetime.now)


    def __init__(self):
        pass

    def to_dict(self):
        if self.lmessage_at is None:
            lmessagetime = None
        else:
            lmessagetime = self.lmessage_at.strftime('%I:%M %p')
        return {
            'id': self.id,
            'myoffer': self.offer,
            'offerstatus': self.offer_status,
            'request_id': self.request_id,
            'lmessagetime': lmessagetime
        }

    def to_json(self):
        if self.lmessage_at is None:
            lmessagetime = None
        else:
            lmessagetime = self.lmessage_at.strftime('%I:%M %p')
        return json.dumps({
            'id': self.id,
            'myoffer': self.offer,
            'offerstatus': self.offer_status,
            'request_id': self.request_id,
            'lmessagetime': lmessagetime
            }, cls=DecimalEncoder)

    def __repr__(self):
        return '<Offer %r>' % self.id

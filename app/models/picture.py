from app import db

class Picture(db.Model):
    __tablename__ = 'pictures'

    id = db.Column(db.Integer, primary_key=True)
    extension = db.Column(db.String(25))

    def __init__(self):
        pass

    def __repr__(self):
        return '<Picture %r>' % self.id

from sqlalchemy import create_engine, Table, Column, MetaData, Integer, Unicode
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
PATH = os.environ['DATABASE_URL']
engine = create_engine(PATH)

conn = engine.connect()

metadata = MetaData()
skills = Table('skills', metadata,
        Column('id', Integer, primary_key=True),
        Column('name', Unicode(80)))

result = conn.execute(skills.insert(), [
        {'name': u'Other'},
        {'name': u'Childcare'},
        {'name': u'Senior care'},
        {'name': u'Pet care'},
        {'name': u'Cooking'},
        {'name': u'Health & Beauty'},
        {'name': u'Personal fitness'},
        {'name': u'Arts & Crafts'},
        {'name': u'Counseling'},
        {'name': u'Event planning'},
        {'name': u'Personal shopping'},
        {'name': u'Legal advice'},
        {'name': u'Finance'},
        {'name': u'Small business'},
    ])

conn.close()

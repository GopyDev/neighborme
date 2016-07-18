"""create Offer table

Revision ID: b57df5cf4b1
Revises: 15d14ef884cf
Create Date: 2016-04-07 12:59:12.524337

"""

# revision identifiers, used by Alembic.
revision = 'b57df5cf4b1'
down_revision = '15d14ef884cf'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa

def upgrade():
    op.create_table(
            'offers',
            sa.Column('id', sa.Integer, primary_key=True),
            sa.Column('request_id', sa.Integer, sa.ForeignKey('requests.id')),
            sa.Column('offer', sa.Unicode(512)),
            sa.Column('offer_status', sa.String(255)),
            sa.Column('lmessage_at', sa.DateTime))
def downgrade():
    op.drop_table('offers')

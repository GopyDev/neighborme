"""Add a column

Revision ID: 30ac3c8d8575
Revises: 50209ed56397
Create Date: 2016-03-19 06:15:04.612708

"""

# revision identifiers, used by Alembic.
revision = '30ac3c8d8575'
down_revision = '50209ed56397'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('requests', sa.Column('lmessage_at', sa.DateTime))
    op.add_column('requests', sa.Column('myoffer', sa.Unicode(300)))
    op.add_column('requests', sa.Column('offer_status', sa.Integer))

def downgrade():
    op.drop_column('requests', 'lmessage_at')
    op.drop_column('requests', 'myoffer')
    op.drop_column('requests', 'offer_status')

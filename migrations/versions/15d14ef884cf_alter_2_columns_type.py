"""alter 2 columns type

Revision ID: 15d14ef884cf
Revises: 185064e27b88
Create Date: 2016-03-19 14:08:20.659721

"""

# revision identifiers, used by Alembic.
revision = '15d14ef884cf'
down_revision = '531087b2d96'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa

def upgrade():
    op.alter_column('requests', 'offer_status', type_= sa.String(255))

def downgrade():
    op.alter_column('requests', 'offer_status', type_= sa.String(255))

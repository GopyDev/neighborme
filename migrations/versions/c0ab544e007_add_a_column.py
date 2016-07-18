"""Add a column

Revision ID: c0ab544e007
Revises: 30ac3c8d8575
Create Date: 2016-03-19 07:07:48.012669

"""

# revision identifiers, used by Alembic.
revision = 'c0ab544e007'
down_revision = '30ac3c8d8575'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('requests', sa.Column('helpuser_id', sa.Integer))

def downgrade():
    op.drop_column('requests', 'helpuser_id')
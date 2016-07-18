"""Increase length of details field

Revision ID: 50209ed56397
Revises: 315e44fbe839
Create Date: 2016-02-16 23:19:26.712246

"""

# revision identifiers, used by Alembic.
revision = '50209ed56397'
down_revision = '315e44fbe839'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.alter_column('requests', 'details', type_=sa.UnicodeText)

def downgrade():
    op.alter_column('requests', 'details', type_=sa.Unicode(300))

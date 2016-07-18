"""Add created_at and updated_at to requests

Revision ID: 315e44fbe839
Revises: 283303797cf9
Create Date: 2016-01-30 17:17:38.693631

"""

# revision identifiers, used by Alembic.
revision = '315e44fbe839'
down_revision = '283303797cf9'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('requests', sa.Column('created_at', sa.DateTime))
    op.add_column('requests', sa.Column('updated_at', sa.DateTime))


def downgrade():
    op.drop_column('requests', 'created_at')
    op.drop_column('requests', 'updated_at')

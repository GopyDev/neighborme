"""Add pictures table

Revision ID: 2e4523c41039
Revises: 3a0100d3f450
Create Date: 2015-12-09 21:29:10.246951

"""

# revision identifiers, used by Alembic.
revision = '2e4523c41039'
down_revision = '3a0100d3f450'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
            'pictures',
            sa.Column('id', sa.Integer, primary_key=True))


def downgrade():
    op.drop_table('pictures')

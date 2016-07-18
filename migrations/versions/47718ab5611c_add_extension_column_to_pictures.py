"""Add extension column to pictures

Revision ID: 47718ab5611c
Revises: 2e4523c41039
Create Date: 2015-12-10 19:03:03.741301

"""

# revision identifiers, used by Alembic.
revision = '47718ab5611c'
down_revision = '2e4523c41039'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('pictures', sa.Column('extension', sa.String(25)))


def downgrade():
    op.drop_column('pictures', 'extension')

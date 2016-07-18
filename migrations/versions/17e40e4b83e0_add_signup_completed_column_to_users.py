"""Add signup_completed column to users

Revision ID: 17e40e4b83e0
Revises: 47718ab5611c
Create Date: 2015-12-10 19:37:54.365119

"""

# revision identifiers, used by Alembic.
revision = '17e40e4b83e0'
down_revision = '47718ab5611c'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('users', sa.Column('signup_completed', sa.Boolean()))


def downgrade():
    op.drop_column('users', 'signup_completed')

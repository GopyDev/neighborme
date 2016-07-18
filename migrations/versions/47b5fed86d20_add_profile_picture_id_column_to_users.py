"""Add profile_picture_id column to users

Revision ID: 47b5fed86d20
Revises: 2614ce1d56bc
Create Date: 2015-10-25 16:39:45.930605

"""

# revision identifiers, used by Alembic.
revision = '47b5fed86d20'
down_revision = '2614ce1d56bc'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('users', sa.Column('profile_picture_id', sa.Integer))


def downgrade():
    op.drop_column('users', 'profile_picture_id')

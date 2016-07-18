"""Add password_hash column to users

Revision ID: 2614ce1d56bc
Revises: 1f33a22ee0aa
Create Date: 2015-10-17 15:47:01.609403

"""

# revision identifiers, used by Alembic.
revision = '2614ce1d56bc'
down_revision = '1f33a22ee0aa'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('users', sa.Column('password_hash', sa.Unicode(60)))


def downgrade():
    op.drop_column('users', 'password_hash')

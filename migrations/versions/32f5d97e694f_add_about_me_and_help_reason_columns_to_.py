"""Add about_me and help_reason columns to users table

Revision ID: 32f5d97e694f
Revises: 40bbcafc43d8
Create Date: 2015-12-22 17:28:08.838570

"""

# revision identifiers, used by Alembic.
revision = '32f5d97e694f'
down_revision = '40bbcafc43d8'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('users', sa.Column('about_me', sa.Unicode(200)))
    op.add_column('users', sa.Column('help_reason', sa.Unicode(200)))


def downgrade():
    op.drop_column('users', 'about_me')
    op.drop_column('users', 'help_reason')

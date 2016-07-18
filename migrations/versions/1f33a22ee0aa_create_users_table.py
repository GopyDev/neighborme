"""create users table

Revision ID: 1f33a22ee0aa
Revises:
Create Date: 2015-10-15 14:54:53.636510

"""

# revision identifiers, used by Alembic.
revision = '1f33a22ee0aa'
down_revision = None
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
            'users',
            sa.Column('id', sa.Integer, primary_key=True),
            sa.Column('first_name', sa.Unicode(80)),
            sa.Column('last_name', sa.Unicode(80)),
            sa.Column('gender', sa.String(20)),
            sa.Column('birthday', sa.Date),
            sa.Column('created_at', sa.DateTime),
            sa.Column('updated_at', sa.DateTime),
            sa.Column('facebook_id', sa.Integer, unique=True),
            sa.Column('email', sa.String(254), unique=True))

def downgrade():
    op.drop_table('users')

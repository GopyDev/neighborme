"""Add requests table

Revision ID: 283303797cf9
Revises: 32f5d97e694f
Create Date: 2016-01-30 16:23:47.077058

"""

# revision identifiers, used by Alembic.
revision = '283303797cf9'
down_revision = '32f5d97e694f'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
            'requests',
            sa.Column('id', sa.Integer, primary_key=True),
            sa.Column('amount', sa.Numeric(precision=8, scale=2)),
            sa.Column('city', sa.Unicode(80)),
            sa.Column('date', sa.Date),
            sa.Column('details', sa.Unicode(300)),
            sa.Column('street', sa.Unicode(100)),
            sa.Column('title', sa.Unicode(80)),
            sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id')),
            sa.Column('zipcode', sa.String(10)))


def downgrade():
    op.drop_table('requests')

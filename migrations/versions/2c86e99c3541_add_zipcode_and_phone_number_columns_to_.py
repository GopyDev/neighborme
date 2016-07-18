"""Add zipcode and phone_number columns to users

Revision ID: 2c86e99c3541
Revises: 47b5fed86d20
Create Date: 2015-11-08 18:13:27.309457

"""

# revision identifiers, used by Alembic.
revision = '2c86e99c3541'
down_revision = '47b5fed86d20'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('users', sa.Column('zipcode', sa.String(10)))
    op.add_column('users', sa.Column('phone_number', sa.String(40)))


def downgrade():
    op.drop_column('users', 'zipcode')
    op.drop_column('users', 'phone_number')

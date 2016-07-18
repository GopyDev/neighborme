"""add IPN table

Revision ID: 32e5e858e07d
Revises: b57df5cf4b1
Create Date: 2016-05-05 09:28:00.030983

"""

# revision identifiers, used by Alembic.
revision = '32e5e858e07d'
down_revision = 'b57df5cf4b1'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import JSON

def upgrade():
    op.create_table(
        'ipns',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('ipn', JSON, nullable=False),
        sa.Column('created_at', sa.DateTime, nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    op.drop_table('ipns')

"""alter a column type

Revision ID: 531087b2d96
Revises: c0ab544e007
Create Date: 2016-03-19 07:12:10.611834

"""

# revision identifiers, used by Alembic.
revision = '531087b2d96'
down_revision = 'c0ab544e007'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.alter_column('requests', 'myoffer', type_=sa.UnicodeText)


def downgrade():
    op.alter_column('requests', 'myoffer', type_=sa.Unicode(300))
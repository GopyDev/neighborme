"""Create users_desired_skills table

Revision ID: 3a0100d3f450
Revises: 4fb7c3043637
Create Date: 2015-11-18 17:37:02.581865

"""

# revision identifiers, used by Alembic.
revision = '3a0100d3f450'
down_revision = '4fb7c3043637'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
            'users_desired_skills',
            sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id')),
            sa.Column('skill_id', sa.Integer, sa.ForeignKey('skills.id')))


def downgrade():
    op.drop_table('users_desired_skills')

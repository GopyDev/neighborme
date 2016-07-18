"""Add skills table and users_skills table

Revision ID: 4fb7c3043637
Revises: 2c86e99c3541
Create Date: 2015-11-16 17:05:29.434500

"""

# revision identifiers, used by Alembic.
revision = '4fb7c3043637'
down_revision = '2c86e99c3541'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
            'skills',
            sa.Column('id', sa.Integer, primary_key=True),
            sa.Column('name', sa.Unicode(80)))

    op.create_table(
            'users_skills',
            sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id')),
            sa.Column('skill_id', sa.Integer, sa.ForeignKey('skills.id')))

def downgrade():
    op.drop_table('skills')
    op.drop_table('users_skills')

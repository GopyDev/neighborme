"""Add skills_other and desired_skills_other to users table

Revision ID: 40bbcafc43d8
Revises: 17e40e4b83e0
Create Date: 2015-12-22 13:39:10.532293

"""

# revision identifiers, used by Alembic.
revision = '40bbcafc43d8'
down_revision = '17e40e4b83e0'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('users', sa.Column('skills_other', sa.Unicode(200)))
    op.add_column('users', sa.Column('desired_skills_other', sa.Unicode(200)))


def downgrade():
    op.drop_column('users', 'skills_other')
    op.drop_column('users', 'desired_skills_other')

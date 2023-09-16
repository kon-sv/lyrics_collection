"""Add song lyrics synced flag column

Revision ID: 6809a90f3968
Revises: 0721a0c51f30
Create Date: 2023-09-16 18:47:12.222330

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6809a90f3968'
down_revision: Union[str, None] = '0721a0c51f30'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('songlyrics', sa.Column('is_synced', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('songlyrics', 'is_synced')
    # ### end Alembic commands ###
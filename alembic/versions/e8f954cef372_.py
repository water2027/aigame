"""empty message

Revision ID: e8f954cef372
Revises: 
Create Date: 2024-10-11 17:02:45.788866

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e8f954cef372'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('config',
    sa.Column('k', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('v', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.PrimaryKeyConstraint('k')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('config')
    # ### end Alembic commands ###

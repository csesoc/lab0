from .SQLMethod import SQLMethod
from .SQLQuery import SQLQuery
from .methods import createSession, getSession, updateSession, cleanup


def initDatabase():
    from .. import database
    database.create_table(SQLQuery.createTable)

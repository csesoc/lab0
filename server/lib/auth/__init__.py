from .SQLMethod import SQLMethod
from .SQLQuery import SQLQuery
from .UserSession import UserSession
from . import Tools

def initDatabase():
    from .. import database
    database.create_table(SQLQuery.createTable)


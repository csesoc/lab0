from .SQLMethod import SQLMethod
from .SQLQuery import SQLQuery


def initDatabase():
    from .. import database
    database.create_table(SQLQuery.categories.createTable)
    database.create_table(SQLQuery.questions.createTable)
    database.create_table(SQLQuery.solves.createTable)

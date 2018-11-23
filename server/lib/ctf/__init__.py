from .SQLQuery import SQLQuery
from .SQLMethod import SQLMethod

def initDatabase():
	from .. import database
	database.create_table(SQLQuery.questions.createTable)
	database.create_table(SQLQuery.solves.createTable)
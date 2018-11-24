from .SQLQuery import SQLQuery
from .. import database


class SQLMethod:
    @staticmethod
    def newSession(user: int, expiry: int, token: str):
        return database.insert(SQLQuery.add, (user, expiry, token))

    @staticmethod
    def deleteSession(*, user: int = None, expiry: int = None, token: str = None):
        if user:
            return database.update(SQLQuery.deleteByUser, (user,))
        elif expiry:
            return database.update(SQLQuery.deleteByExpiry, (expiry,))
        else:
            return database.update(SQLQuery.deleteByToken, (token,))

    @staticmethod
    def updateSession(token: str, expiry: int):
        return database.update(SQLQuery.updateByToken, (expiry, token))

    @staticmethod
    def getSession(token: str):
        return database.fetchOne(SQLQuery.getSessionByToken, (token,))

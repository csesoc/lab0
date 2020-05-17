from typing import Union

from .SQLQuery import SQLQuery
from .. import database


class SQLMethod:
    @staticmethod
    def createUser(username: str, _hash: str, salt: str):
        return database.insert(SQLQuery.add, (username, _hash, salt))

    @staticmethod
    def deleteUser(user: int):
        # Delete solves
        result = []
        result.append(database.update(
            SQLQuery.deleteUserSolves, (user,), commit=False))
        result.append(database.update(
            SQLQuery.deleteUser, (user,), commit=False))
        
        return database.assertSQLResult(result)

    @staticmethod
    def changeHashSalt(user: int, _hash: str, salt: str):
        return database.update(SQLQuery.changeHashSalt, (_hash, salt, user))

    @staticmethod
    def changeUsername(user: int, username: str):
        return database.update(SQLQuery.changeUsername, (username, user))

    @staticmethod
    def checkPassword(username: str, password: str):
        return database.fetchOne(SQLQuery.passwordCheck, (username, password))

    @staticmethod
    def getUser(user: Union[str, int]):
        if type(user) is str:
            return database.fetchOne(SQLQuery.getUserByUsername, (user,))
        else:
            return database.fetchOne(SQLQuery.getUserById, (user,))

    @staticmethod
    def getUsers():
        return database.fetchAll(SQLQuery.getUsers)

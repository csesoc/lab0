from typing import Union

from .SQLQuery import SQLQuery
from .. import database


class SQLMethod:
    @staticmethod
    def createUser(username: str, hash: str, salt: str):
        return database.insert(SQLQuery.add, (username, hash, salt))

    @staticmethod
    def deleteUser(user: int):
        return database.update(SQLQuery.delete, (user,))

    @staticmethod
    def changeHashSalt(user: int, hash: str, salt: str):
        return database.update(SQLQuery.changeHashSalt, (hash, salt, user))

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

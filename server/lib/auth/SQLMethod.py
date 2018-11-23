from .SQLQuery import SQLQuery
from .. import database
from typing import Union

userType = Union[int, str]

class SQLMethod:
    @staticmethod
    def createUser():
        pass

    @staticmethod
    def deleteUser(user: userType):
        pass

    @staticmethod
    def changePassword(user: userType, password: str):
        pass

    @staticmethod
    def changeName(user: userType, name: str):
        pass
    
    @staticmethod
    def checkPassword(user: userType, password: str):
        pass
    
    @staticmethod
    def getUserData(user: userType):
        pass

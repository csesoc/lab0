from hashlib import sha1
from time import time

from .SQLMethod import SQLMethod


def createSession(user: int):
    currentTime = int(time())
    token = sha1((str(user) + ":" + str(currentTime)).encode()).hexdigest()
    SQLMethod.newSession(user, currentTime + 30 * 60, token)
    return token


def updateSession(token: str):
    return not not SQLMethod.updateSession(token, int(time()) + 30 * 60)


def getSession(token: str):
    if not token:
        return False
    return SQLMethod.getSession(token)

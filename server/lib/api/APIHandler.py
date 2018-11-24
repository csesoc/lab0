import re
import tornado.web
from time import time
from tornado.escape import json_decode, json_encode

from ..auth import UserSession
from ..authSession import getSession, updateSession


class JSON:
    @staticmethod
    def error(error: str):
        return json_encode(dict(status = False, error = error))

    @staticmethod
    def data(data):
        return json_encode(dict(status = True, data = data))

    @staticmethod
    def TRUE():
        return json_encode(dict(status = True))

    YES = OK = TRUE

    @staticmethod
    def FALSE():
        return json_encode(dict(status = False))

    NO = FALSE


class routing:
    _routesPOST = {}
    _routesGET = {}

    @staticmethod
    def GET(urlRegex):
        def wrapper(func):
            if urlRegex in routing._routesGET:
                raise Exception("Duplicate routing pattern: " + urlRegex)
            routing._routesGET[urlRegex] = func
            return func

        return wrapper

    @staticmethod
    def POST(urlRegex):
        def wrapper(func):
            if urlRegex in routing._routesPOST:
                raise Exception("Duplicate routing pattern: " + urlRegex)
            routing._routesPOST[urlRegex] = func
            return func

        return wrapper


class APIHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        token = self.get_secure_cookie("session")
        session = getSession(token)
        if session:
            user, expiry = session
            if expiry < int(time()):
                updateSession(token)
                return UserSession
        self.finish(JSON.error("not authenticated"))
        # return False

    def get(self, path, **kwargs):
        try:
            args = json_decode(self.request.body or "{}")
        except:
            return self.finish(JSON.error("bad arguments"))
        for urlRegex, function in routing._routesGET.items():
            urlRoute = re.fullmatch(urlRegex, "/" + path)
            if urlRoute:
                return function(self, *urlRoute.groups(), args = args, **kwargs)
        return self.finish(JSON.error("no route here"))

    def post(self, path, **kwargs):
        try:
            args = json_decode(self.request.body or "{}")
        except:
            return self.finish(JSON.error("bad arguments"))

        for urlRegex, function in routing._routesPOST.items():
            urlRoute = re.fullmatch(urlRegex, "/" + path)
            if urlRoute:
                return function(self, *urlRoute.groups(), args = args, **kwargs)
        return self.finish(JSON.error("no route here"))

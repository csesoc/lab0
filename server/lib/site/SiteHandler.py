import re
import tornado.gen
import tornado.httputil
import tornado.web
from time import time

from .Jinja2 import BaseHandler
from ..config import config


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


from ..authSession import updateSession, getSession
from ..auth import UserSession


class SiteHandler(tornado.web.StaticFileHandler, BaseHandler):
    def initialize(self, **kwargs):
        super().initialize(config["SITE"].get("staticdir", "../site"), default_filename = "index.html")

    def get_current_user(self):
        try:
            token = self.get_secure_cookie("session").decode()
            user, expiry = getSession(token)
            if int(time()) < expiry:
                updateSession(token)
                return UserSession
        except Exception:
            return False


    @tornado.gen.coroutine
    def get(self, path, **kwargs):
        for urlRegex, function in routing._routesGET.items():
            urlRoute = re.fullmatch(urlRegex, "/" + path)
            if urlRoute:
                self.compute_etag = super(
                    tornado.web.StaticFileHandler, self).compute_etag
                function(self, path, *urlRoute.groups(), **kwargs)
                return
        yield super().get(path, **kwargs)

    def post(self, path, **kwargs):
        for urlRegex, function in routing._routesPOST.items():
            if re.match("^" + urlRegex.strip("^$") + "$", "/" + path):
                return function(self, path, **kwargs)

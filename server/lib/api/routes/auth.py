import tornado.httputil
import tornado.web

from .. import JSON, routing
from ...auth import SQLMethod as authSQLMethod, Tools as authTools
from ...authSession import createSession
from ...config import config


@routing.POST("/auth/login")
def login(self: tornado.web.RequestHandler, args: dict):
    self.request: tornado.httputil.HTTPServerRequest

    if "username" in args and "password" in args:
        uid = authTools.authenticate(args["username"], args["password"])
        if uid is not None:
            token = createSession(uid)
            self.set_secure_cookie('session', token)
            return self.finish(JSON.OK())
        return self.finish(JSON.error("no such user / password"))
    return self.finish(JSON.error("bad arguments"))


@routing.POST("/auth/register")
def register(self: tornado.web.RequestHandler, args: dict):
    self.request: tornado.httputil.HTTPServerRequest
    if "name" and "username" and "password" in args:
        uid = authTools.createUser(args["username"], args["password"], args["name"])
        if uid is not None:
            token = createSession(uid)
            self.set_secure_cookie('session', token)
            return self.finish(JSON.OK())
        return self.finish(JSON.error("something went wrong"))
    return self.finish(JSON.error("bad arguments"))


@routing.POST("/auth/usernameAvailable")
def register(self: tornado.web.RequestHandler, args: dict):
    self.request: tornado.httputil.HTTPServerRequest
    if "username" in args:
        if args["username"] != config["ADMIN"].get("username", "admin") and not authSQLMethod.getUser(args["username"]):
            return self.finish(JSON.OK())
        return self.finish(JSON.FALSE())
    return self.finish(JSON.error("bad arguments"))

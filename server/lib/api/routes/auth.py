import tornado.httputil
import tornado.web

from .. import JSON, routing
from ...auth import SQLMethod as authSQLMethod, Tools as authTools, User
from ...authSession import createSession
from ...config import config
from ...site import SSE_messages
from tornado.web import authenticated


@routing.POST("/auth/login")
def login(self: tornado.web.RequestHandler, args: dict):
    self.request: tornado.httputil.HTTPServerRequest

    if "username" in args and "password" in args:
        uid = authTools.authenticate(args["username"], args["password"])
        if uid is not None:
            token = createSession(uid[0])
            self.set_secure_cookie('session', token)
            return self.finish(JSON.OK())
        return self.finish(JSON.error("no such user / password"))
    return self.finish(JSON.error("bad arguments"))


@routing.POST("/auth/register")
def register(self: tornado.web.RequestHandler, args: dict):
    self.request: tornado.httputil.HTTPServerRequest
    if "name" and "username" and "password" in args:
        uid = authTools.createUser(
            args["username"], args["password"], args["name"])
        if uid is not None:
            token = createSession(uid)
            self.set_secure_cookie('session', token)
            SSE_messages.addMessage(User(uid).name + " has joined the game")

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


@routing.POST("/auth/me")
@authenticated
def login(self: tornado.web.RequestHandler, args: dict):
    self.request: tornado.httputil.HTTPServerRequest
    return self.finish(JSON.data(dict(
        id=self.current_user.id,
        name=self.current_user.name,
        username=self.current_user.username
    )))

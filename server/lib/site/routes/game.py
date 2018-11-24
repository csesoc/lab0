from ..SiteHandler import routing
from ..Jinja2 import BaseHandler
from tornado.web import authenticated

@routing.GET('/')
@authenticated
def gameHome(self: BaseHandler, args: dict):
    return self.render_jinja2("index.html")
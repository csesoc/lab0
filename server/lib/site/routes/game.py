from ..SiteHandler import routing
from ..Jinja2 import BaseHandler
from tornado.web import authenticated

@routing.GET('/')
@authenticated
def gameHome(self: BaseHandler):
    return self.render_jinja2("game/index.html")

@routing.GET('/admin/?')
@authenticated
def gameAdmin(self: BaseHandler):
    return self.render_jinja2("admin/index.html")


@routing.GET('/template.html')
@authenticated
def gameHome(self: BaseHandler):
    return self.finish("No.<br>(but yes, the template file is here)")


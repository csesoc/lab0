from ..SiteHandler import routing
from ..Jinja2 import BaseHandler
from tornado.web import authenticated


@routing.GET('/')
@authenticated
def gameHome(self: BaseHandler):
    if self.current_user.id == 0:
        # redirect super user to admin page
        return self.render_jinja2("admin/index.html")
    return self.render_jinja2("game/index.html")


@routing.GET('/admin/?')
@authenticated
def gameAdmin(self: BaseHandler):
    if not self.current_user.isAdmin:
        return self.finish("You don't have access to this page!<br><i>and i should really make an error page</i>")
    return self.render_jinja2("admin/index.html")


@routing.GET('/login/?')
def loginRedirect(self: BaseHandler):
    return self.redirect("/invite/#login", True)


@routing.GET('/register/?')
def register(self: BaseHandler):
    return self.redirect("/invite/#register", True)


@routing.GET('/template.html')
@authenticated
def gameTemplate(self: BaseHandler):
    return self.finish("No.<br>(but yes, the template file is here)")

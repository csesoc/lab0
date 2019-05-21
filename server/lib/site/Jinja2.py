from jinja2 import Environment, FileSystemLoader, TemplateNotFound
from tornado.web import RequestHandler

from ..config import config


# https://bibhasdn.com/blog/using-jinja2-as-the-template-engine-for-tornado-web-framework/
class BaseHandler(RequestHandler):
    def render_jinja2(self, template_name, **kwargs):
        kwargs.update({
            'name': self.current_user.name,
            # 'isAdmin': self.current_user.userHasPermission(PEM.SITE_ADMIN)
        })
        content = self.render_template(template_name, **kwargs)
        self.write(content)

    def render_template(self, template_name, **kwargs):
        env = Environment(loader=FileSystemLoader(
            config["SITE"].get("templatesdir", "../site")))

        try:
            template = env.get_template(template_name)
        except TemplateNotFound:
            raise TemplateNotFound(template_name)
        content = template.render(kwargs)
        return content

__VERSION = "1.0.0"

import tornado.ioloop
import tornado.web
import os
from lib import database
from lib.api import APIHandler
from lib.site import SSEHandler, SSE_messages, SiteHandler

app = tornado.web.Application([
        ("/api/(.*)", APIHandler),
        ("/orchestrator", SSEHandler),
        ("/(.*)", SiteHandler),
    ],
    cookie_secret="5206688",
    login_url="/invite"
)

if database.conn is not None:
    import lib

    lib.auth.initDatabase()

    lib.authSession.initDatabase()
    lib.authSession.cleanup()

    lib.questions.initDatabase()

else:
    raise Exception("Cannot create the database connection.")


def run(file: str = None, **kwargs):
    print("----------------------------------------")
    print("Server version:", __VERSION)

    if file:
        print("Loading config file:", file)
        import lib
        from lib.config import readConfig
        lib.config = config = readConfig(file)
    else:
        from lib.config import config

    if kwargs:
        print("Applying config overrides")
        config.update(kwargs)
    print("----------------------------------------")
    settings = dict(
        ssl_options = {
            "certfile": os.path.join("/etc/letsencrypt/live/lab0.tech/fullchain.pem"),
            "keyfile": os.path.join("/etc/letsencrypt/live/lab0.tech/privkey.pem"),
	 }
    )
    server = tornado.httpserver.HTTPServer(app, **settings)

    port = config["SERVER"].get("port", 443)
    try:
        server.bind(port)
    except OSError:
        print("Port", port, "is in use!\nAborting...")
        return

    try:
        from os import fork
        server.start(0)
    except:
        print(":: os.fork not present on system (Windows) - Defaulting to single process")
        server.start(1)

    print("Server running on port %s\n" % port)
    SSE_messages.addMessage("The game server is online!")
    SSE_messages.do.reloadSite()

    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    run()
else:
    import asyncio
    from tornado.platform.asyncio import AnyThreadEventLoopPolicy
    asyncio.set_event_loop_policy(AnyThreadEventLoopPolicy())

    import tornado.wsgi
    application = tornado.wsgi.WSGIAdapter(app)

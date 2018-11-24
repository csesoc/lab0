__VERSION = "0.0.1"
__DEBUG = True


###

# github.com/featherbear/UNSW-CompClub2019Summer-CTF

def run(file: str = None, **kwargs):
    print("UNSW CSE CompClub 2019 Summer CTF Server")
    print("                      [ by Andrew Wong ]")
    print("----------------------------------------")
    print("Server version:", __VERSION)

    from lib import database

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

    import tornado.web
    import tornado.ioloop

    from lib.site import SiteHandler

    app = tornado.web.Application([
        ("/(.*)", SiteHandler)
    ],
        cookie_secret = "5206677",
        login_url = "/login/"
    )

    if database.conn is not None:
        import lib.auth
        lib.auth.initDatabase()
        import lib.ctf
        lib.ctf.initDatabase()

    else:
        raise Exception("Cannot create the database connection.")

    port = config["SERVER"].get("port", 8000)
    app.listen(port)
    print("Server running on port", port)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    run()

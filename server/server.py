from lib import config, database

if __name__ == "__main__":

    import tornado.web
    import tornado.ioloop

    app = tornado.web.Application([
        # ("/(.*)", SiteHandler)
    ],
        cookie_secret = "ABC",
        # xsrf_cookies = True,
        login_url = "/login/"
    )

    if database.conn is not None:
        import lib.auth
        lib.auth.initDatabase()
        import lib.ctf
        lib.ctf.initDatabase()

    else:
        raise Exception("Cannot create the database connection.")

    app.listen(config["SERVER"].get("port", 8000))

    tornado.ioloop.IOLoop.current().start()

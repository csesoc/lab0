import sqlite3

def create_connection(db_file):
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except sqlite3.Error as e:
        print(e)
    return None


def create_table(create_table_sql):
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except sqlite3.Error as e:
        print("sqlite:", e)


def fetchOne(*args, **kwargs):
    c = conn.cursor()
    c.execute(*args, **kwargs)
    result = c.fetchone()
    return result


def fetchAll(*args, **kwargs):
    c = conn.cursor()
    c.execute(*args, **kwargs)
    result = c.fetchall()
    return result

def insert(*args, **kwargs):
    c = conn.cursor()
    c.execute(*args, **kwargs)
    if kwargs.get('commit'): conn.commit()
    return c.lastrowid

def update(*args, **kwargs):
    c = conn.cursor()
    c.execute(*args, **kwargs)
    if kwargs.get('commit'): conn.commit()
    return c.rowcount

from .config import config
conn = create_connection(config["SERVER"].get("database", "database.sqlite3"))

# TODO Concurrent cursors?
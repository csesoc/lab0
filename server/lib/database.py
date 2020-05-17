import re
import sqlite3

from .config import config


def assertSQLResult(result):
    outcome = result[-1]
    if outcome:
        conn.commit()
    else:
        conn.rollback()
    return outcome


def create_connection(db_file):
    try:
        conn = sqlite3.connect(db_file, check_same_thread=False)
        return conn
    except sqlite3.Error as e:
        print(e)
    return None


def create_table(create_table_sql):
    create_table_sql = re.sub("\n|\s{2,}", "", create_table_sql)
    create_table_sql = re.sub(",(?=\S)", ", ", create_table_sql)

    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except sqlite3.Error as e:
        print("sqlite:", e)


def fetchOne(*args, **kwargs):
    c = conn.cursor()
    c.execute(*args)
    result = c.fetchone()
    return result


def fetchAll(*args, **kwargs):
    c = conn.cursor()
    c.execute(*args)
    result = c.fetchall()
    return result


def insert(*args, commit=True, **kwargs):
    c = conn.cursor()
    c.execute(*args)
    if commit:
        conn.commit()
    return c.lastrowid


def update(*args, commit=True, **kwargs):
    c = conn.cursor()
    c.execute(*args)
    if commit:
        conn.commit()
    return c.rowcount


conn = create_connection(config["SERVER"].get("database", "database.sqlite3"))

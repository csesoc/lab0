class SQLQuery:
    class solves:
        createTable = """
            CREATE TABLE IF NOT EXISTS ctf_solves (
                user INTEGER NOT NULL,
                question INTEGER NOT NULL,
            
                FOREIGN KEY (user) REFERENCES users (id),
                FOREIGN KEY (question) REFERENCES ctf_questions (id),
                
                UNIQUE (user, question)
            )
            """

        add = """
            INSERT OR IGNORE
            INTO ctf_solves (user, question)
            VALUES (?, ?)
            """

        deleteQuestion = "DELETE FROM ctf_solves WHERE question = ?"
        deleteUser = "DELETE FROM ctf_solves WHERE user = ?"
        deleteSpecific = "DELETE FROM ctf_solves WHERE user = ? AND question = ?"

        getAll = "SELECT * FROM ctf_solves"
        getUser = "SELECT question FROM ctf_solves WHERE user = ?"
        getQuestion = "SELECT user FROM ctf_solves WHERE question = ?"

    class questions:
        createTable = """
            CREATE TABLE IF NOT EXISTS ctf_questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                flag TEXT NOT NULL,
                value INTEGER NOT NULL,
                category INTEGER,
            
                UNIQUE (title)
            )
            """

        add = """
            INSERT OR IGNORE
            INTO ctf_questions (title, description, flag, value, category)
            VALUES (?, ?, ?, ?, ?)
            """,

        delete = "DELETE FROM ctf_questions WHERE id = ?"
        edit = """
            UPDATE ctf_questions
            SET title = ?, description = ?, value = ?, category = ?
            WHERE id = ?
            """
        editFlag = """
            UPDATE ctf_qustions
            SET flag = ?
            WHERE id = ?
            """

        getAll = "SELECT id, title, description, value, category FROM ctf_questions"
        getOne = "SELECT id, title, description, value, category FROM ctf_questions WHERE id = ?"
        getAllWithFlag = "SELECT id, title, description, flag, value, category FROM ctf_questions"
        getOneWithFlag = "SELECT id, title, description, flag, value, category FROM ctf_questions WHERE id = ?"
        getFlag = "SELECT flag FROM ctf_questions WHERE id = ?"

    class categories:
        createTable = """
            CREATE TABLE IF NOT EXISTS ctf_question_categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                UNIQUE (name)
            )
            """
        add = """
              INSERT OR IGNORE
              INTO ctf_question_categories (name)
              VALUES (?)
              """,
        delete = "DELETE FROM ctf_question_categories WHERE id = ?"
        edit = """
            UPDATE ctf_question_categories
            SET name = ?
            WHERE id = ?
            """
        getAll = "SELECT id, name FROM ctf_question_categories"

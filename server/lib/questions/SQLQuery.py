class SQLQuery:
    class solves:
        createTable = """
            CREATE TABLE IF NOT EXISTS solves (
                user INTEGER NOT NULL,
                question INTEGER NOT NULL,
                FOREIGN KEY (user) REFERENCES users (id),
                FOREIGN KEY (question) REFERENCES questions (id),
                UNIQUE (user, question)
            )
            """

        add = """
            INSERT
            INTO solves (user, question)
            VALUES (?, ?)
            """

        deleteQuestion = """
            DELETE FROM solves
            WHERE question = ?
            """

        deleteUser = """
            DELETE FROM solves
            WHERE user = ?
            """

        deleteSpecific = """
            DELETE FROM solves
            WHERE user = ? AND question = ?
            """

        getAll = """
            SELECT *
            FROM solves
            """

        getUser = """
            SELECT question
            FROM solves
            WHERE user = ?
            """

        getQuestion = """
            SELECT user
            FROM solves
            WHERE question = ?
            """
    
    class questions:
        createTable = """
            CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                answer TEXT NOT NULL,
                value INTEGER NOT NULL,
                category INTEGER NOT NULL,
            
                UNIQUE (answer)
            )
            """

        add = """
            INSERT
            INTO questions (title, description, answer, value, category)
            VALUES (?, ?, ?, ?, ?)
            """

        delete = """
            DELETE FROM questions
            WHERE id = ?
            """

        edit = """
            UPDATE questions
            SET title = ?, description = ?, value = ?, category = ?
            WHERE id = ?
            """
        
        editAnswer = """
            UPDATE questions
            SET answer = ?
            WHERE id = ?
            """

        getAll = """
            SELECT id, title, description, value, category
            FROM questions
            """
        
        getOne = """
            SELECT id, title, description, value, category
            FROM questions
            WHERE id = ?
            """
        
        getAllWithAnswer = """
            SELECT id, title, description, answer, value, category
            FROM questions
            """
        
        getOneWithAnswer = """
            SELECT id, title, description, answer, value, category
            FROM questions
            WHERE id = ?
            """
        
        getAnswer = """
            SELECT answer
            FROM questions
            WHERE id = ?
            """

    class categories:
        createTable = """
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                UNIQUE (title)
            )
            """
        
        add = """
            INSERT
            INTO categories (title)
            VALUES (?)
            """
        
        delete = """
            DELETE FROM categories
            WHERE id = ?
            """

        edit = """
            UPDATE categories
            SET title = ?
            WHERE id = ?
            """
        
        getAll = """
            SELECT id, title
            FROM categories
            """

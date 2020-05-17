class SQLQuery:
    createTable = """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            _hash TEXT NOT NULL,
            _salt TEXT NOT NULL,
            _isAdmin INTEGER DEFAULT 0,
            UNIQUE (username)
        );
        """

    add = """
        INSERT
        INTO users (username, _hash, _salt)
        VALUES (?, ?, ?)
        ;
        """

    deleteUserSolves = """
        DELETE FROM solves
        where user = ?
        ;
        """
    deleteUser = """
        DELETE FROM users
        WHERE id = ?
        ;
        """

    changeUsername = """
        UPDATE users
        SET usernamename = ?
        WHERE id = ?
        ;
        """

    changeHashSalt = """
        UPDATE users
        SET _hash = ?, _salt = ?
        WHERE id = ?
        ;
        """
    
    passwordCheck = """
        SELECT id FROM users
        WHERE username = ? AND _hash = cHash(?, _salt)
        ;
        """

    getUserByUsername = """
        SELECT id, _isAdmin
        FROM users
        WHERE username = ?
        ;
        """
    
    getUserById = """
        SELECT username, _isAdmin
        FROM users
        WHERE id = ?
        ;
        """

    getUsers = """
        SELECT id, username, _isAdmin
        FROM users
        ;
        """

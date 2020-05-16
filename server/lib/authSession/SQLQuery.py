class SQLQuery:
    createTable = """
        CREATE TABLE IF NOT EXISTS user_sessions (
            user INTEGER NOT NULL,
            expiry INTEGER NOT NULL,
            token TEXT NOT NULL,
            UNIQUE (token)
        )
        """
    
    add = """
        INSERT
        INTO user_sessions (user, expiry, token)
        VALUES (?, ?, ?)
        """
    
    deleteByUser = """
        DELETE FROM user_sessions
        WHERE user = ?
        """

    deleteByExpiry = """
        DELETE FROM user_sessions
        WHERE expiry < ?
        """

    deleteByToken = """
        DELETE FROM user_sessions
        WHERE token = ?
        """

    updateByToken = """
        UPDATE user_sessions
        SET expiry = ?
        WHERE token = ?
        """

    getSessionByToken = """
        SELECT user, expiry
        FROM user_sessions
        WHERE token = ?
        """

from .SQLQuery import SQLQuery
from server.lib import database


def assertSQLResult(result):
    result = all(result)
    if result:
        database.conn.commit()
    else:
        database.conn.rollback()
    return result


class SQLMethod:
    class questions:
        # User Functions
        @staticmethod
        def solveQuestion(user: int, question: int):
            return database.insert(SQLQuery.solves.add, (user, question))

        # Admin functions
        @staticmethod
        def unsolveQuestion(user: int, question: int):
            return database.update(SQLQuery.solves.deleteSpecific, (user, question))

        @staticmethod
        def createQuestion(title: str, description: str, answer: str, value: int, category: int):
            return database.insert(SQLQuery.questions.add, (title, description, answer, value, category))

        @staticmethod
        def editQuestion(question: int, title: str, description: str, value: int, category: int):
            return database.update(SQLQuery.questions.edit, (title, description, value, category, question))

        @staticmethod
        def editQuestionAnswer(question: int, answer: str):
            return database.update(SQLQuery.questions.editAnswer, (answer, question))

        @staticmethod
        def deleteQuestion(question: int):
            result = []
            result.append(database.update(
                SQLQuery.questions.delete, (question,), commit=False))
            result.append(database.update(
                SQLQuery.solves.deleteQuestion, (question,), commit=False))

            return assertSQLResult(result)

        @staticmethod
        def deleteUser(user: int):
            return database.update(SQLQuery.solves.deleteUser, (user,))

        # Helper functions
        @staticmethod
        def getAnswer(question: int):
            return database.fetchOne(SQLQuery.questions.getAnswer, (question,))[0]

        @staticmethod
        def getSolves(*, user: int = None, question: int = None):
            if not any([user is not None, question is not None]):
                return database.fetchAll(SQLQuery.solves.getAll)
            elif user is not None:
                return list(map(lambda result: result[0], database.fetchAll(SQLQuery.solves.getUser, (user,))))
            else:  # question is not None
                return list(map(lambda result: result[0], database.fetchAll(SQLQuery.solves.getQuestion, (question,))))

        @staticmethod
        def getQuestions(*, question: int = None, answer: bool = False):
            if question:
                if answer:
                    return database.fetchOne(SQLQuery.questions.getOneWithAnswer, (question,))
                else:
                    return database.fetchOne(SQLQuery.questions.getOne, (question,))
            else:  # get all
                if answer:
                    return database.fetchAll(SQLQuery.questions.getAllWithAnswer)
                else:
                    return database.fetchAll(SQLQuery.questions.getAll)

        getQuestion = getQuestions

    class categories:
        @staticmethod
        def getCategories():
            return database.fetchAll(SQLQuery.categories.getAll)

        @staticmethod
        def createCategory(name: str):
            return database.insert(SQLQuery.categories.add, (name,))

        @staticmethod
        def editCategory(catId: int, name: str):
            return database.insert(SQLQuery.categories.edit, (name, catId))

        @staticmethod
        def deleteCategory(catId: int):
            return database.insert(SQLQuery.categories.delete, (catId,))

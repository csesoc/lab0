from .. import routing, JSON
from tornado.web import authenticated, RequestHandler
from sqlite3 import IntegrityError

from lib.questions import SQLMethod as questionsSQLMethod
from lib.auth import SQLMethod as authSQLMethod
from lib.site import SSE_messages


@routing.POST("/questions/questions.json")
@authenticated
def questions(self: RequestHandler, args: dict):
    self.finish(JSON.data(questionsSQLMethod.questions.getQuestions()))


@routing.POST("/questions/categories.json")
@authenticated
def categories(self: RequestHandler, args: dict):
    self.finish(JSON.data(questionsSQLMethod.categories.getCategories()))


@routing.POST("/questions/adminSolves.json")
@authenticated
def adminSolves(self: RequestHandler, args: dict):
    return self.finish(JSON.data(questionsSQLMethod.questions.getSolves()))


@routing.POST("/questions/userSolves.json")
@authenticated
def userSolves(self: RequestHandler, args: dict):
    return self.finish(JSON.data(questionsSQLMethod.questions.getSolves(user=self.current_user.id)))


@routing.POST("/questions/questionSolves.json")
@authenticated
def questionSolves(self: RequestHandler, args: dict):
    return self.finish(JSON.data(len(questionsSQLMethod.questions.getSolves(question=args["question"]))))


@routing.POST("/questions/solve")
@authenticated
def trySolve(self: RequestHandler, args: dict):
    if args["answer"].lower() == questionsSQLMethod.questions.getAnswer(args["question"]):
        try:
            questionsSQLMethod.questions.solveQuestion(self.current_user.id, args["question"])
            SSE_messages.addMessage(self.current_user.username + " has found an answer!")
        except IntegrityError:
            pass
        return self.finish(JSON.YES())
    return self.finish(JSON.NO())

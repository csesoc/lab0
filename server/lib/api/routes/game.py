from .. import routing, JSON
from tornado.web import authenticated, RequestHandler

from ...ctf import SQLMethod as ctfSQLMethod
from ...auth import SQLMethod as authSQLMethod

@routing.POST("/ctf/questions.json")
@authenticated
def questions(self: RequestHandler, args: dict):

    self.finish(JSON.data(ctfSQLMethod.questions.getQuestions()))

@routing.POST("/ctf/categories.json")
@authenticated
def categories(self: RequestHandler, args: dict):
    self.finish(JSON.data(ctfSQLMethod.categories.getCategories()))

@routing.POST("/ctf/leaderboard.json")
@authenticated
def leaderboard(self: RequestHandler, args: dict):
    solves = ctfSQLMethod.questions.getSolves()
    users = authSQLMethod.getUsers()

@routing.POST("/ctf/solves.json")
@authenticated
def solves(self: RequestHandler, args: dict):
    return self.finish(JSON.data(ctfSQLMethod.questions.getSolves(user=self.current_user.id)))

@routing.POST("/ctf/solve")
@authenticated
def trySolve(self: RequestHandler, args: dict):
    if args["flag"] == ctfSQLMethod.questions.getFlag(args["question"]):
        ctfSQLMethod.questions.solveQuestion(self.current_user.id, args["question"])
        return self.finish(JSON.YES())
    return self.finish(JSON.NO())


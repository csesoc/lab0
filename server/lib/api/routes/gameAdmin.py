from .. import routing, JSON
from tornado.web import authenticated, RequestHandler

from ...ctf import SQLMethod as ctfSQLMethod
from ...auth import SQLMethod as authSQLMethod


@routing.POST("/ctf/question/submit")
@authenticated
def questionSubmit(self: RequestHandler, args: dict):
    if self.current_user.id != 0:
        return self.finish(JSON.error("access denied"))

    result = ctfSQLMethod.questions.createQuestion(**args)
    if result:
        return self.finish(JSON.OK())
    return self.finish(JSON.FALSE())


@routing.POST("/ctf/question/edit")
@authenticated
def questionEdit(self: RequestHandler, args: dict):
    if self.current_user.id != 0:
        return self.finish(JSON.error("access denied"))

    result = ctfSQLMethod.questions.editQuestion(**args)
    if result:
        return self.finish(JSON.OK())
    return self.finish(JSON.FALSE())


@routing.POST("/ctf/question/editFlag")
@authenticated
def questionEditFlag(self: RequestHandler, args: dict):
    if self.current_user.id != 0:
        return self.finish(JSON.error("access denied"))

    result = ctfSQLMethod.questions.editQuestionFlag(**args)
    if result:
        return self.finish(JSON.OK())
    return self.finish(JSON.FALSE())


@routing.POST("/ctf/question/getFlag")
@authenticated
def questionGetFlag(self: RequestHandler, args: dict):
    if self.current_user.id != 0:
        return self.finish(JSON.error("access denied"))
    result = ctfSQLMethod.questions.getFlag(**args)
    if result:
        return self.finish(JSON.data(result))
    return self.finish(JSON.FALSE())


@routing.POST("/ctf/question/delete")
@authenticated
def questionDelete(self: RequestHandler, args: dict):
    if self.current_user.id != 0:
        return self.finish(JSON.error("access denied"))

    result = ctfSQLMethod.questions.deleteQuestion(**args)
    if result:
        return self.finish(JSON.OK())
    return self.finish(JSON.FALSE())


####

@routing.POST("/ctf/category/submit")
@authenticated
def categorySubmit(self: RequestHandler, args: dict):
    if self.current_user.id != 0:
        return self.finish(JSON.error("access denied"))

    result = ctfSQLMethod.categories.createCategory(**args)
    if result:
        return self.finish(JSON.OK())
    return self.finish(JSON.FALSE())


@routing.POST("/ctf/category/edit")
@authenticated
def categoryEdit(self: RequestHandler, args: dict):
    if self.current_user.id != 0:
        return self.finish(JSON.error("access denied"))

    result = ctfSQLMethod.categories.editCategory(**args)
    if result:
        return self.finish(JSON.OK())
    return self.finish(JSON.FALSE())


@routing.POST("/ctf/category/delete")
@authenticated
def categoryDelete(self: RequestHandler, args: dict):
    if self.current_user.id != 0:
        return self.finish(JSON.error("access denied"))

    result = ctfSQLMethod.categories.deleteCategory(**args)
    if result:
        return self.finish(JSON.OK())
    return self.finish(JSON.FALSE())

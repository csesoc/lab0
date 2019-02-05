# https://gist.github.com/SupermanScott/1658409
# https://medium.com/code-zen/python-generator-and-html-server-sent-events-3cdf14140e56
import uuid
from time import time


class SSE_messages:
    def __init__(self):
        self.messageQueue = []
        self.nextId = 0
        self.idPrefix = uuid.uuid4().hex[:4]

        self.__registerDo__()       

    def addMessage(self, data: str, event: str = None):
        print("Orchestrator:", data)
        cTime = time()
        self.messageQueue.append(dict(
            id = ":".join([self.idPrefix, str(self.nextId), str(cTime)]),
            data = data,
            event = event,
            added = cTime)
        )
        self.nextId += 1
        return self.nextId

    def get(self):
        minimumScope = time() - 10
        self.messageQueue = list(filter(lambda message: message["added"] > minimumScope, self.messageQueue))
        return self.messageQueue

    class do:
        pass
    def __registerDo__(self):
        self.do.reloadSite = lambda: self.addMessage("reload", "gm")


SSE_messages = SSE_messages()

import tornado.httpserver


class SSEHandler(tornado.web.RequestHandler):
    def initialize(self):
        self.set_header('Content-Type', 'text/event-stream')
        self.set_header('Cache-Control', 'no-cache')

    def get(self: tornado.web.RequestHandler):
        for data in SSE_messages.get():
            message = []
            if data["event"]: message.append("event: " + data["event"])
            message.append("id: " + data["id"])
            message.append("data: " + data["data"])
            self.write("{}\n\n".format("\n".join(message)))
        self.flush()

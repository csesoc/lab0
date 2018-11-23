from .SQLMethod import SQLMethod
from .. import database
from typing import Union

userType = Union[int, str]

class UserSession:
	id: int = None
	username: str = None
	name: str = None


	def __init__(self, user: userType):
		if user == 0:
			self.id = 0
			# self.username = ""
			self.name = "Admin"
		else:
			if type(user) is str:
				self.username = user
				# data = SQLMethod.getUserDataByUsername(id)	
			else:
				self.id = user
				# data = SQLMethod.getUserDataById(id)	
		
		# self.name
		# self.points

	def changePassword(self, password: str):
		return SQLMethod.changePassword(self.id, password)



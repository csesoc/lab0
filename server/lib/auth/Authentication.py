from ..config import config
from .SQLMethod import SQLMethod
from .UserSession import UserSession

def authenticate(username, password):
	if "ADMIN" in config:
		if config["ADMIN"]["username"] == username and config["ADMIN"]["password"] == password:
			return UserSession(0)
	else:
		if SQLMethod.checkPassword(username, password):
			return UserSession(username)

	return False
	# do db check
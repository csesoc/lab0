const ADDRESS = 'http://localhost:8000'
const API_VERSION = 'v1'

const craftURL = function (endpoint) {
  return `${ADDRESS}/api/${API_VERSION}/${endpoint}`
}

module.exports = {
  GET: {
    URL_GET_QUESTIONS: craftURL('ctf/questions.json'),
    URL_GET_CATEGORIES: craftURL('ctf/categories.json'),
    URL_GET_SOLVES: craftURL('ctf/solves.json'),
    URL_GET_ALL_SOLVES: craftURL('ctf/adminSolves.json'),
    URL_GET_QUESTION_SOLVES: craftURL('ctf/questionSolves.json'),
    URL_GET_MY_SOLVES: craftURL('ctf/userSolves.json'),
    URL_GET_LEADERBOARD: craftURL('ctf/leaderboard.json')
  },
  POST: {
    URL_GET_FLAG: craftURL('ctf/question/getFlag'),
    URL_EDIT_FLAG: craftURL('ctf/question/editFlag'),
    URL_SOLVE_QUESTION: craftURL('ctf/solve'),
    URL_AUTH_ME: craftURL('auth/me'),
    URL_AUTH_AVAILABLE: craftURL('auth/usernameAvailable'),
    URL_AUTH_REGISTER: craftURL('auth/register'),
    URL_AUTH_LOGIN: craftURL('auth/login')
  },

  // TODO: Uhm.
  URL_uhmmmiforgot: craftURL('ctf/question/{slug}')
}

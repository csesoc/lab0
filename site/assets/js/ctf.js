let questions = {};
let questionsByCategory = {};
let categories = {};
let solves = [];

let me = {};

fetch("/api/v1/auth/me", {
  method: "POST",
  credentials: "include"
})
  .then(response => response.json())
  .then(jsonData => {
    if (jsonData.status) {
      me = jsonData.data;
    }
  });

function getQuestions() {
  return fetch("/api/v1/questions/questions.json", {
    method: "post",
    credentials: "include"
  }).then(response => response.json());
}

function getCategories() {
  return fetch("/api/v1/questions/categories.json", {
    method: "post",
    credentials: "include"
  }).then(response => response.json());
}

function getSolvesAdmin() {
  return fetch("/api/v1/questions/adminSolves.json", {
    method: "post",
    credentials: "include"
  }).then(response => response.json());
}

function getSolves(questionId, getAll) {
  if (questionId !== undefined) {
    return fetch("/api/v1/questions/questionSolves.json", {
      method: "post",
      credentials: "include",
      body: JSON.stringify({
        question: questionId
      })
    }).then(response => response.json());
  }

  return fetch("/api/v1/questions/userSolves.json", {
    method: "post",
    credentials: "include"
  }).then(response => response.json());
}

function getLeaderboard() {
  return fetch("/api/v1/questions/leaderboard.json", {
    method: "post",
    credentials: "include"
  }).then(response => response.json());
}

function trySolve(questionId, answer) {
  return fetch("/api/v1/questions/solve", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({
      question: questionId,
      answer: answer
    })
  }).then(response => response.json());
}

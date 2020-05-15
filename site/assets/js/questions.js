let questions = {};
let questionsByCategory = {};
let categories = {};
let solves = [];

let me = {};

fetch("/api/auth/me", {
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
  return fetch("/api/questions/questions.json", {
    method: "post",
    credentials: "include"
  }).then(response => response.json());
}

function getCategories() {
  return fetch("/api/questions/categories.json", {
    method: "post",
    credentials: "include"
  }).then(response => response.json());
}

function getSolvesAdmin() {
  return fetch("/api/questions/adminSolves.json", {
    method: "post",
    credentials: "include"
  }).then(response => response.json());
}

function getSolves(questionId, getAll) {
  if (questionId !== undefined) {
    return fetch("/api/questions/questionSolves.json", {
      method: "post",
      credentials: "include",
      body: JSON.stringify({
        question: questionId
      })
    }).then(response => response.json());
  }

  return fetch("/api/questions/userSolves.json", {
    method: "post",
    credentials: "include"
  }).then(response => response.json());
}

function getLeaderboard() {
  return fetch("/api/questions/leaderboard.json", {
    method: "post",
    credentials: "include"
  }).then(response => response.json());
}

function trySolve(questionId, answer) {
  return fetch("/api/questions/solve", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({
      question: questionId,
      answer: answer
    })
  }).then(response => response.json());
}

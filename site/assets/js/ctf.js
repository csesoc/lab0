let questions = {};
let questionsByCategory = {};
let categories = {};
let solves = [];

let me = {};

fetch("/api/v1/auth/me", {
    method: "POST"
})
    .then(response => response.json())
    .then(jsonData => {
        if (jsonData.status) {
            me = jsonData.data;
        }
    });

function getQuestions() {
    return fetch('/api/v1/ctf/questions.json', {
        method: 'post',
    })
        .then(response => response.json())
}

function getCategories() {
    return fetch('/api/v1/ctf/categories.json', {
        method: 'post',
    })
        .then(response => response.json())
}


function getSolves(questionId) {
    if (questionId !== undefined) {
        return fetch('/api/v1/ctf/questionSolves.json', {
            method: 'post',
            body: JSON.stringify({
                question: questionId
            })
        })
            .then(response => response.json())
    }

    return fetch('/api/v1/ctf/solves.json', {
        method: 'post',
    })
        .then(response => response.json())
}

function getData() {
    return Promise.all([getQuestions(), getCategories(), getSolves()])
}

function getLeaderboard() {
    return fetch("/api/v1/ctf/leaderboard.json", {
        method: "POST"
    })
        .then(response => response.json())
}

function trySolve(questionId, flag) {
    return fetch('/api/v1/ctf/solve', {
        method: 'post',
        body: JSON.stringify({
            question: questionId,
            flag: flag
        })
    })
        .then(response => response.json())
}

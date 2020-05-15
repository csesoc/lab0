(function() {
  // Link number input to range input
  let modal = document.getElementById("editModal");
  modal
    .querySelector("input[type=range].slider")
    .addEventListener("input", evt => {
      modal.querySelector("[name=value]").value = evt.target.value;
    });
  modal.querySelector("[name=value]").addEventListener("input", evt => {
    modal.querySelector("input[type=range]").value = evt.target.value;
  });
})();

function openModalEdit(questionId, srcElem) {
  let modal = document.getElementById("editModal");
  let answerInput = modal.querySelector("[name=answer]");

  let isNew = questionId === undefined;
  modal.classList.toggle("editQuestion", !isNew);

  answerInput.value = "";
  answerInput.placeholder = "answer";
  answerInput.required = isNew;

  if (isNew) {
    modal.querySelector("[name=title]").value = "";
    modal.querySelector("[name=category]").value = "";
    modal.querySelector("[name=description]").value = "";
  } else {
    let question = questions[questionId];
    modal.querySelector("[name=title]").value = question.title;
    modal.querySelector("[name=category]").value = question.category;
    modal.querySelector("[name=description]").value = question.description;
    modal.querySelector("[name=value]").value = question.value;
    modal.querySelector("input[type=range]").value = question.value;
  }

  const updateAnswerEvent = function(evt) {
    answerInput.required = true;
    if (answerInput.reportValidity()) {
      answerInput.required = false;
      this.removeEventListener("click", updateAnswerEvent);
      this.classList.add("is-loading");
      fetch("/api/questions/question/editAnswer", {
        method: "post",
        credentials: "include",
        body: JSON.stringify({
          question: questionId,
          answer: answerInput.value.toLowerCase()
        })
      })
        .then(response => response.json())
        .then(jsonData => {
          this.addEventListener("click", updateAnswerEvent);
          this.classList.remove("is-loading");
          if (jsonData.status) {
            let answerColumn = srcElem.querySelector(".answer");
            if (!answerColumn.children.length) {
              answerColumn.innerText = answerInput.value.toLowerCase();
            }
            answerInput.value = "";
          } else if (parseInt(jsonData.error) === -1) {
            answerInput.placeholder = "Answer already used";
            answerInput.value = "";
          }
        });
    }
  };

  const confirmEvent = function(evt) {
    if (modal.querySelector("form").reportValidity()) {
      modal
        .querySelector("button.confirm")
        .removeEventListener("click", confirmEvent);
      this.classList.add("is-loading");

      let endpoint = isNew ? "submit" : "edit";
      let data = {
        title: modal.querySelector("[name=title]").value,
        category: modal.querySelector("[name=category]").value,
        description: modal.querySelector("[name=description]").value,
        value: modal.querySelector("[name=value]").value || 100
      };

      if (isNew) {
        data.answer = answerInput.value.toLowerCase();
      } else {
        data.question = questionId;
      }

      fetch("/api/questions/question/" + endpoint, {
        method: "post",
        credentials: "include",
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(jsonData => {
          this.classList.remove("is-loading");
          modal
            .querySelector("button.confirm")
            .addEventListener("click", confirmEvent);
          if (jsonData.status) {
            location.reload();
          } else if (parseInt(jsonData.error) === -1) {
            answerInput.placeholder = "Answer already used";
            answerInput.value = "";
          }
        });
    }
  };

  const closeModal = function() {
    modal
      .querySelector("button.confirm")
      .removeEventListener("click", confirmEvent);
    modal
      .querySelector("button.cancel")
      .removeEventListener("click", cancelEvent);
    modal
      .querySelector(".modal-background")
      .removeEventListener("click", cancelEvent);
    modal.classList.remove("is-active");
  };
  const cancelEvent = closeModal;

  modal
    .querySelector(".button[name=updateAnswer]")
    .addEventListener("click", updateAnswerEvent);
  modal.querySelector("button.confirm").addEventListener("click", confirmEvent);
  modal.querySelector("button.cancel").addEventListener("click", cancelEvent);
  modal
    .querySelector(".modal-background")
    .addEventListener("click", cancelEvent);

  modal.classList.add("is-active");
}

function dataToRow(data) {
  let row = document.createElement("tr");
  row.name = "question-" + data.id;

  let title = document.createElement("td");
  title.innerText = data.title;
  row.appendChild(title);

  let description = document.createElement("td");
  description.innerText = data.description.replace(/<(?:.|\n)*?>/gm, "");
  row.appendChild(description);

  let category = document.createElement("td");
  category.innerText = categories[data.category] || "";
  row.appendChild(category);

  let answer = document.createElement("td");
  answer.classList.add("answer");

  let answerReveal = document.createElement("button");
  answerReveal.classList.add("button", "is-outlined", "is-info");
  answerReveal.innerText = "click to reveal";
  answer.appendChild(answerReveal);
  row.appendChild(answer);

  let points = document.createElement("td");
  points.innerText = data.value;
  row.appendChild(points);

  let solveCount = document.createElement("td");
  solveCount.innerText = (solves[data.id] || []).length;
  row.appendChild(solveCount);

  let edit = document.createElement("td");
  let editBtn = document.createElement("button");
  editBtn.innerText = "edit";
  editBtn.classList.add("button", "is-outlined", "is-info");
  edit.appendChild(editBtn);
  row.appendChild(edit);

  const answerRevealClickEvent = function() {
    answerReveal.removeEventListener("click", answerRevealClickEvent);
    this.classList.add("is-loading");
    fetch("/api/questions/question/getAnswer", {
      method: "post",
      credentials: "include",
      body: JSON.stringify({
        question: data.id
      })
    })
      .then(response => response.json())
      .then(jsonData => {
        if (jsonData.status) {
          this.classList.remove("is-loading");
          this.innerText = jsonData.data;
        }
      });
  };

  answerReveal.addEventListener("click", answerRevealClickEvent);
  editBtn.addEventListener("click", function(evt) {
    openModalEdit(data.id, this.parentElement.parentElement);
  });

  return row;
}

Promise.all([getQuestions(), getCategories(), getSolvesAdmin()]).then(
  ([questionsData, categoriesData, solvesData]) => {
    let modal = document.getElementById("editModal");
    let categoryElem = modal.querySelector("select");

    if (categoriesData.status) {
      for (let data of categoriesData.data || []) {
        categories[data[0]] = data[1];

        let option = document.createElement("option");
        option.value = data[0];
        option.innerText = data[1];
        categoryElem.appendChild(option);
      }
    }

    if (solvesData.status && solvesData.data) {
      for ([user, question] of solvesData.data) {
        solves[question] = (solves[question] || []).concat(user);
      }
    }

    if (questionsData.status) {
      for (let data of questionsData.data || []) {
        questions[data[0]] = {
          id: data[0],
          title: data[1],
          description: data[2],
          value: data[3],
          category: data[4]
        };
        if (!questionsByCategory.hasOwnProperty(data[4])) {
          questionsByCategory[data[4]] = [];
          questionsByCategory[data[4]].push(data[0]);
        }
        document
          .querySelector("table tbody")
          .appendChild(dataToRow(questions[data[0]]));
      }
    }
  }
);

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
  let flagInput = modal.querySelector("[name=flag]");

  let isNew = questionId === undefined;
  modal.classList.toggle("editQuestion", !isNew);

  flagInput.value = "";
  flagInput.placeholder = "FLAG{...}";
  flagInput.required = isNew;

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

  const updateFlagEvent = function(evt) {
    flagInput.required = true;
    if (flagInput.reportValidity()) {
      flagInput.required = false;
      this.removeEventListener("click", updateFlagEvent);
      this.classList.add("is-loading");
      fetch("/api/v1/ctf/question/editFlag", {
        method: "post",
        credentials: "include",
        body: JSON.stringify({
          question: questionId,
          flag: flagInput.value
        })
      })
        .then(response => response.json())
        .then(jsonData => {
          this.addEventListener("click", updateFlagEvent);
          this.classList.remove("is-loading");
          if (jsonData.status) {
            let flagColumn = srcElem.querySelector(".flag");
            if (!flagColumn.children.length) {
              flagColumn.innerText = flagInput.value;
            }
            flagInput.value = "";
          } else if (parseInt(jsonData.error) === -1) {
            flagInput.placeholder = "Flag already used";
            flagInput.value = "";
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
        data.flag = flagInput.value;
      } else {
        data.question = questionId;
      }

      fetch("/api/v1/ctf/question/" + endpoint, {
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
            flagInput.placeholder = "Flag already used";
            flagInput.value = "";
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
    .querySelector(".button[name=updateFlag]")
    .addEventListener("click", updateFlagEvent);
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

  let flag = document.createElement("td");
  flag.classList.add("flag");

  let flagReveal = document.createElement("button");
  flagReveal.classList.add("button", "is-outlined", "is-info");
  flagReveal.innerText = "click to reveal";
  flag.appendChild(flagReveal);
  row.appendChild(flag);

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

  const flagRevealClickEvent = function() {
    flagReveal.removeEventListener("click", flagRevealClickEvent);
    this.classList.add("is-loading");
    fetch("/api/v1/ctf/question/getFlag", {
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
          this.outerText = jsonData.data;
        }
      });
  };

  flagReveal.addEventListener("click", flagRevealClickEvent);
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

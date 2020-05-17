(() => {

  fetch("/api/auth/me", {
    method: "POST",
    credentials: "include"
  })
  .then(response => response.json())
  .then(jsonData => {
    let me = {}
    if (jsonData.status) {
      me = jsonData.data;
    }
      
    const usernameElem = document.querySelector(
      ".navbar [name=username]"
    );

    const username = document.createTextNode("username: " +  me.username);
    usernameElem.appendChild(username);

    const scoreElem = document.querySelector(
      ".navbar [name=score]"
    );

    const score = document.createTextNode("points: " + me.points);
    scoreElem.appendChild(score);
  
    const solvesElem = document.querySelector(
      ".navbar [name=solves]"
    );

    const solves = document.createTextNode("solves: " + me.solves);
    solvesElem.appendChild(solves);
  });

  let x = document.querySelector(
    ".navbar [name=mouseCoordinates] [name=mouseX]"
  );
  let y = document.querySelector(
    ".navbar [name=mouseCoordinates] [name=mouseY]"
  );

  document.body.addEventListener("mousemove", evt => {
    x.innerText = evt.clientX;
    y.innerText = evt.clientY;
  });
})();

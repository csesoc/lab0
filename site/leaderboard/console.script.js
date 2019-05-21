var typed = new Typed("#leaderboard", {
  strings: [""],
  cursorChar: "&#9608;"
});

let oldState;

new Typed("#title", {
  strings: [
    "><span id='blinky'>_</span> CTF Leaderboard<br>========================="
  ],
  cursorChar: "",
  onComplete: function() {
    leaderboardProvider(undefined, async function(data, ready) {
      // Data received in an ordered state

      // Remove players with 0 points
      data = data.filter(entry => entry.points);

      // Only update the leaderboard if there is a change in points
      if (oldState == data) return;
      oldState = data;

      // Largest rank length is the length of the last item
      // But this doesn't work because typed.js does a `trim` AAAHH!
      // let rankLength = data[data.length - 1].rank.toString().length;

      typedText = data.map(
        entry =>
          `<span>#${entry.rank}</span> <span>${entry.name}</span> - <span>${
            entry.points
          }</span>`
      );
      typed.strings = [typedText.join("<br>")];

      let clearLoop = setInterval(function() {
        typed.el.innerText = typed.el.innerText.slice(0, -1);
        if (typed.el.innerText.length == 0) {
          clearInterval(clearLoop);
          typed.reset();
          typed.options.onComplete = () => {
            setTimeout(ready, 2 * 1000);
          };
        }
      }, 1);
    });
  }
});

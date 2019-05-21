(updateLeaderboard = (callbackTrue, callbackFalse) => {
  getLeaderboard().then(jsonData => {
    if (!jsonData.status) {
      callbackFalse && callbackFalse();
    } else {
      let scoreData = [];
      for (let dataId in jsonData.data) {
        let data = jsonData.data[dataId];
        scoreData.push({
          id: dataId,
          name: data.name,
          points: data.points
        });
      }
      scoreData.sort((next, prev) => prev.points - next.points);

      let myRank;
      let myScore;

      let leaderboard = [];

      let lastRank = 0;
      let lastScore = 0;
      for (let i = 0; i < scoreData.length; i++) {
        let rank;

        if (lastScore === scoreData[i].points) {
          rank = lastRank;
        } else {
          rank = lastRank = i + 1;
          lastScore = scoreData[i].points;
        }

        if (me.id === parseInt(scoreData[i].id)) {
          myScore = scoreData[i].points;
          myRank = rank;
        }

        if (rank != 0) leaderboard.push(rank + ". " + scoreData[i].name);
      }

      document.querySelector(
        "div.slideout [name=leaderboard]"
      ).innerText = leaderboard.join("\n");
      document.querySelector("div.slideout [name=rank]").innerText =
        myRank || "-";
      document.querySelector("div.slideout [name=places]").innerText =
        scoreData.length || "-";
      document.querySelector("div.slideout [name=score]").innerText =
        myScore || "-";

      callbackTrue && callbackTrue(jsonData);
    }
  });
})();

(() => {
  var updateReady = true;
  let leaderboardLoop = () => {
    if (updateReady) {
      updateReady = false;
      updateLeaderboard(() => {
        updateReady = true;
      });
    }
  };
  setInterval(leaderboardLoop, 10 * 1000);
})();

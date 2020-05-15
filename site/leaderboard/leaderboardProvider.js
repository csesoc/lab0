const __updateDelay = 3;

(fetchLeaderboard = (cb_object, cb_array) => {
  fetch("/api/questions/leaderboard.json", {
    method: "post",
    credentials: "include"
  })
    .then(response => response.json())
    .then(jsonData => {
      if (jsonData.status) {
        let scoreData = [];
        for (let dataId in jsonData.data) {
          // jsonData.data[dataId].points = Math.ceil(Math.random() * 1000);
          let data = jsonData.data[dataId];
          scoreData.push({
            id: dataId,
            name: data.name,
            points: data.points,
            rank: "?"
          });
        }
        scoreData.sort((next, prev) => prev.points - next.points);

        let lastRank = 0;
        let lastScore = 0;
        for (let i = 0; i < scoreData.length; i++) {
          if (lastScore === scoreData[i].points) {
            scoreData[i].rank = lastRank;
          } else {
            scoreData[i].rank = lastRank = i + 1;
            lastScore = scoreData[i].points;
          }

          jsonData.data[scoreData[i].id].rank = scoreData[i].rank;
        }

        cb_object && cb_object(jsonData.data);
        cb_array && cb_array(scoreData);
      }
    });
})();

function leaderboardProvider(cb_object, cb_array) {
  var updateReady = true;

  const cb_object_wrapper = cb_object
    ? data => {
        cb_object(data, () => (updateReady = true));
      }
    : undefined;

  const cb_array_wrapper = cb_array
    ? data => {
        cb_array(data, () => (updateReady = true));
      }
    : undefined;

  function leaderboardLoop() {
    if (!updateReady) return;
    updateReady = false;
    fetchLeaderboard(cb_object_wrapper, cb_array_wrapper);
  }

  leaderboardLoop();
  return setInterval(leaderboardLoop, __updateDelay * 1000);
}

const initialSeconds = 120;
let currentSeconds = initialSeconds;
let countdownInterval;
let teamAScore = 0;
let teamBScore = 0;
let teamAViolationScore = 0;
let teamBViolationScore = 0;
const violationLimit = 3;

const timerDisplay = document.getElementById("timer-display");
const teamAScoreDisplay = document.getElementById("teamA-score");
const teamBScoreDisplay = document.getElementById("teamB-score");
const teamAViolationProgress = document.getElementById(
  "teamA-violation-progress"
);
const teamBViolationProgress = document.getElementById(
  "teamB-violation-progress"
);

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

function updateTimer() {
  timerDisplay.textContent = formatTime(currentSeconds);
  if (currentSeconds <= 0) {
    clearInterval(countdownInterval);
    document.getElementById("extend-button").style.display = "inline";
    alert("タイムアップ！");
  } else {
    currentSeconds--;
  }
}

document.getElementById("start-button").addEventListener("click", function () {
  document.getElementById("extend-button").style.display = "none";
  if (!countdownInterval) {
    countdownInterval = setInterval(updateTimer, 1000);
  }
});

document.getElementById("stop-button").addEventListener("click", function () {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
});

document.getElementById("reset-button").addEventListener("click", function () {
  clearInterval(countdownInterval);
  countdownInterval = null;
  currentSeconds = initialSeconds;
  updateTimer();
});

document.getElementById("extend-button").addEventListener("click", function () {
  document.getElementById("extend-button").style.display = "none";
  clearInterval(countdownInterval);
  countdownInterval = null;
  currentSeconds = 60;
  updateTimer();
});

function updateScore(team, increment) {
  if (team === "A") {
    teamAScore += increment;
    if (teamAScore < 0) {
      teamAScore = 0;
    }
    teamAScoreDisplay.textContent = teamAScore;
  } else if (team === "B") {
    teamBScore += increment;
    if (teamBScore < 0) {
      teamBScore = 0;
    }
    teamBScoreDisplay.textContent = teamBScore;
  }
}

function updateViolationScore(team, increment) {
  if (team === "A") {
    teamAViolationScore += increment;
    if (teamAViolationScore >= 3) {
      teamAViolationScore = 0;
      updateScore("B", 1);
    }
    teamBViolationProgress.style.width = `${Math.floor(
      (teamAViolationScore / violationLimit) * 100
    )}%`;
  } else if (team === "B") {
    teamBViolationScore += increment;
    if (teamBViolationScore >= 3) {
      teamBViolationScore = 0;
      updateScore("A", 1);
    }
    teamAViolationProgress.style.width = `${Math.floor(
      (teamBViolationScore / violationLimit) * 100
    )}%`;
  }
}

document.getElementById("teamA-up").addEventListener("click", function () {
  updateScore("A", 1);
});

document.getElementById("teamA-down").addEventListener("click", function () {
  updateScore("A", -1);
});

document.getElementById("teamB-up").addEventListener("click", function () {
  updateScore("B", 1);
});

document.getElementById("teamB-down").addEventListener("click", function () {
  updateScore("B", -1);
});

document.getElementById("teamA-violate").addEventListener("click", function () {
  updateViolationScore("A", 1);
});
document.getElementById("teamB-violate").addEventListener("click", function () {
  updateViolationScore("B", 1);
});

updateTimer();

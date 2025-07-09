// JavaScript for Rock Paper Scissors game
// 5 rounds only, update score and round count
// Use event listeners for buttons
// Determine winner each round, display choices
// At end of 5 rounds, show final result and disable input
// Reset button resets all game state
// Add sound effect when user wins, loses, or draws

const winSound = new Audio('Assets/sounds/win.mp3');
const loseSound = new Audio('Assets/sounds/lose.mp3');
const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let round = 1;

const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const roundEl = document.getElementById("round");
const playerChoiceEl = document.getElementById("player-choice");
const computerChoiceEl = document.getElementById("computer-choice");
const messageEl = document.getElementById("message");
const choiceButtons = document.querySelectorAll(".choice");
const resetBtn = document.getElementById("reset");

choiceButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (round > 5) return;

    const playerChoice = button.dataset.choice;
    playerChoiceEl.textContent = playerChoice;
    computerChoiceEl.textContent = "Thinking...";

    animateComputerChoice((computerChoice) => {
      computerChoiceEl.textContent = computerChoice;

      const result = getWinner(playerChoice, computerChoice);
      if (result === "player") {
        playerScore++;
        messageEl.textContent = "You won this round!";
      } else if (result === "computer") {
        computerScore++;
        messageEl.textContent = "Computer won this round!";
      } else {
        messageEl.textContent = "It's a tie!";
      }

      playerScoreEl.textContent = playerScore;
      computerScoreEl.textContent = computerScore;

      if (round === 5) {
        showFinalResult();
        disableButtons();
      }

      round++;
      roundEl.textContent = round <= 5 ? round : 5;
    });
  });
});

resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  round = 1;

  playerScoreEl.textContent = "0";
  computerScoreEl.textContent = "0";
  roundEl.textContent = "1";
  playerChoiceEl.textContent = "?";
  computerChoiceEl.textContent = "?";
  messageEl.textContent = "Make your choice!";

  choiceButtons.forEach(btn => btn.disabled = false);
});
// Animate computer's choice with a 'thinking' delay
function animateComputerChoice(callback) {
  setTimeout(() => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    callback(computerChoice);
  }, 1000); // 1 second delay
}
function getWinner(player, computer) {
  if (player === computer) {
    return "tie";
  }
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    winSound.play();
    return "player";
  } else {
    loseSound.play();
    return "computer";
  }
}


function showFinalResult() {
  if (playerScore > computerScore) {
    messageEl.textContent = "🎉 Congratulations! You Won The Game!";
    highlightResult("player");
    storeHistory();
  } else if (computerScore > playerScore) {
    messageEl.textContent = "💀 Game Over! Computer Wins The Game!";
    highlightResult("computer");
    storeHistory();
  } else {
    highlightResult("tie");
    messageEl.textContent = "🤝 It's a Tie Game! Try Again!";
  }
}
// Store and retrieve win/loss history from localStorage
function storeHistory() {
  const history = {
    playerScore: playerScore,
    computerScore: computerScore,
    rounds: round - 1
  };
  localStorage.setItem("rpsHistory", JSON.stringify(history));
}

function retrieveHistory() {
  const history = localStorage.getItem("rpsHistory");
  if (history) {
    const { playerScore, computerScore, rounds } = JSON.parse(history);
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    roundEl.textContent = rounds + 1;
  }
}
// Color highlight for result feedback
function highlightResult(winner) {
  if (winner === "player") {
    messageEl.style.color = "#4CAF50"; // Green for player win
  } else if (winner === "computer") {
    messageEl.style.color = "#F44336"; // Red for computer win
  } else {
    messageEl.style.color = "#FFC107"; // Yellow for tie
  }
}

function disableButtons() {
  choiceButtons.forEach(btn => btn.disabled = true);
}

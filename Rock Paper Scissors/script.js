// JavaScript for Rock Paper Scissors game
// 5 rounds only, update score and round count
// Use event listeners for buttons
// Determine winner each round, display choices
// At end of 5 rounds, show final result and disable input
// Reset button resets all game state
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
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    playerChoiceEl.textContent = playerChoice;
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

function getWinner(player, computer) {
  if (player === computer) return "tie";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "player";
  } else {
    return "computer";
  }
}

function showFinalResult() {
  if (playerScore > computerScore) {
    messageEl.textContent = "🎉 Congratulations! You Won The Game!";
  } else if (computerScore > playerScore) {
    messageEl.textContent = "💀 Game Over! Computer Wins The Game!";
  } else {
    messageEl.textContent = "🤝 It's a Tie Game! Try Again!";
  }
}

function disableButtons() {
  choiceButtons.forEach(btn => btn.disabled = true);
}

"use strict";

/* ########################### var declarations ########################### */

// Selecting elements
const totalScore = {
  1: document.getElementById("score--0"),
  2: document.getElementById("score--1"),
};

const currentScore = {
  1: document.getElementById("current--0"),
  2: document.getElementById("current--1"),
};

const diceEl = document.getElementById("dice");

const btnNewGame = document.querySelector(".btn--new");
const btnRollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const sectionPlayer1 = document.querySelector(".player--0");
const sectionPlayer2 = document.querySelector(".player--1");
let activePlayer = 1;

// Reseting game to initial state
resetGame();

/* ########################### functions declarations ########################### */

// generate random integer number
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// reset game to initial state
function resetGame() {
  // Resetig elements texts
  totalScore[1].textContent = 0;
  totalScore[2].textContent = 0;
  currentScore[1].textContent = 0;
  currentScore[2].textContent = 0;

  // hiding dice
  if (!diceEl.classList.contains("hidden")) diceEl.classList.add("hidden");

  // Resetig active player to player 1
  if (!sectionPlayer1.classList.contains("player--active"))
    sectionPlayer1.classList.add("player--active");
  if (sectionPlayer2.classList.contains("player--active"))
    sectionPlayer2.classList.remove("player--active");

  activePlayer = 1;
}

// change current score of active player
function changeCurrentScore(sum, player) {
  sum === 0
    ? (currentScore[player].textContent = 0)
    : (currentScore[player].textContent =
        Number(currentScore[player].textContent) + sum);
}

function holdScore(player) {
  const acumulatedScore = Number(currentScore[player].textContent);

  totalScore[player].textContent =
    Number(totalScore[player].textContent) + acumulatedScore;
  changeCurrentScore(0, player);
  changeActivePlayer();
}

// toggle active player
function changeActivePlayer() {
  if (sectionPlayer1.classList.contains("player--active")) {
    sectionPlayer1.classList.remove("player--active");
    sectionPlayer2.classList.add("player--active");
    activePlayer = 2;
  } else {
    sectionPlayer2.classList.remove("player--active");
    sectionPlayer1.classList.add("player--active");
    activePlayer = 1;
  }
}

/* ########################### code ########################### */
// "New Game" button pressed
btnNewGame.addEventListener("click", resetGame);

// "Roll Dice" button pressed
btnRollDice.addEventListener("click", () => {
  // generate dice
  const currentDice = getRandomIntInclusive(1, 6);
  diceEl.src = `dice-${currentDice}.png`;
  if (diceEl.classList.contains("hidden")) diceEl.classList.remove("hidden");

  if (currentDice === 1) {
    // player loses
    changeCurrentScore(0, activePlayer);
    changeActivePlayer();
  } else {
    // player continues on game
    changeCurrentScore(currentDice, activePlayer);
  }
});

// "Hold" button pressed
btnHold.addEventListener("click", () => {
  holdScore(activePlayer);
});

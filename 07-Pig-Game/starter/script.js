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

const sectionPlayer = {
  1: document.querySelector(".player--0"),
  2: document.querySelector(".player--1"),
};
let activePlayer = 1;

// Reseting game to initial state
resetGame();

/* ########################### functions declarations ########################### */

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetGame() {
  // Resetig elements texts
  totalScore[1].textContent = 0;
  totalScore[2].textContent = 0;
  currentScore[1].textContent = 0;
  currentScore[2].textContent = 0;

  // hiding dice
  if (!diceEl.classList.contains("hidden")) diceEl.classList.add("hidden");

  // Resetig active player to player 1
  if (!sectionPlayer[1].classList.contains("player--active"))
    sectionPlayer[1].classList.add("player--active");
  if (sectionPlayer[2].classList.contains("player--active"))
    sectionPlayer[2].classList.remove("player--active");

  // activating buttons
  btnRollDice.disabled = false;
  btnHold.disabled = false;

  //
  if (sectionPlayer[1].classList.contains("player--winner"))
    sectionPlayer[1].classList.remove("player--winner");
  if (sectionPlayer[2].classList.contains("player--winner"))
    sectionPlayer[2].classList.remove("player--winner");

  activePlayer = 1;
}

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

  if (Number(totalScore[player].textContent) >= 100) {
    setWin(player);
    return;
  }

  changeActivePlayer();
}

function setWin(player) {
  btnRollDice.disabled = true;
  btnHold.disabled = true;

  sectionPlayer[player].classList.add("player--winner");
}

// toogle active player
function changeActivePlayer() {
  if (sectionPlayer[1].classList.contains("player--active")) {
    sectionPlayer[1].classList.remove("player--active");
    sectionPlayer[2].classList.add("player--active");
    activePlayer = 2;
  } else {
    sectionPlayer[2].classList.remove("player--active");
    sectionPlayer[1].classList.add("player--active");
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

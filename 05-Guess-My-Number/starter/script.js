"use strict";

// Initial state of game
let secretNumber = generateSecretNumber();
const maxScore = 20;
const areaNumero = document.querySelector(".number");
const formulario = document.querySelector(".guess");
const mensagem = document.querySelector(".message");
const score = document.querySelector(".score");
score.textContent = maxScore;
let currentScore = Number(score.textContent);
const highScore = document.querySelector(".highscore");
let won = false;

const paginaInteira = document.querySelector("body");


//Function declarations
function generateSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}
const resetGame = () => {
  won = false;
  secretNumber = generateSecretNumber();

  // Reseting score
  currentScore = maxScore;
  score.textContent = currentScore;

  // Resetig style
  paginaInteira.style.backgroundColor = "#222";
  areaNumero.textContent = "?";
  areaNumero.style.color = "#222";
  mensagem.textContent = "Start guessing...";
  formulario.value = "";
};
const setWinStyle = () => {
  areaNumero.style.color = "green";
  mensagem.textContent = "🎉 Correct number";
  paginaInteira.style.backgroundColor = "#2ea739";

  // Sets highscore
  if (Number(highScore.textContent) < currentScore)
    highScore.textContent = currentScore;
};
const setLoseStyle = (guess) => {
  areaNumero.style.color = "red";
  score.textContent = currentScore;

  // Changes the message text
  if (currentScore === 0) {
    mensagem.textContent = "💣 You have lost the game";
    paginaInteira.style.backgroundColor = "#cd0707";
  } else {
    console.log(guess, secretNumber)
    mensagem.textContent = guess < secretNumber ? `The secret number is GREATER than ${guess}` : `The secret number is SMALLER than ${guess}`;
  }
};

// Buttons listeners
document.querySelector(".check").addEventListener("click", function () {
  const guess = Math.trunc(Number(formulario.value));

  if (currentScore !== 0 && !won) {
    // When there is no input
    if (!guess) {
      mensagem.textContent = "⛔ No Number!";
      return;

      // When player wins
    } else if (guess === secretNumber) {
      won = true;
      setWinStyle();

      // When player loses
    } else {
      currentScore--;
      setLoseStyle(guess);
    }

    areaNumero.textContent = guess;
  }
  formulario.value = "";
});

document.querySelector(".again").addEventListener("click", resetGame);

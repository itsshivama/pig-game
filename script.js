"use strict";

// Element Selector
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
const dice = document.querySelector(".dice");
const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const holdScore = document.querySelector(".btn--hold");

// variable declaration for scope
let score, currentScore, activePlayer, playing;

// Initialise the variables for the start of the game when both the page is loaded and when new game is clicked
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  dice.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

// Initialize variables and start the game
init();

// Switch player logic
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// Dice Roll Functionality
rollDice.addEventListener("click", function () {
  if (playing) {
    // Random Dice Roll
    const randomDice = Math.trunc(Math.random() * 6) + 1;

    //   show dice
    dice.classList.remove("hidden");
    dice.src = `dice-${randomDice}.png`;

    //   if random dice is not 1
    if (randomDice !== 1) {
      currentScore += randomDice;
      // currentScore0.textContent = currentScore;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// When clicked on hold score btn
holdScore.addEventListener("click", function () {
  if (playing) {
    // Add current Score to players total score
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    // if player score is above what is defined player wins and game stops until new game
    if (score[activePlayer] >= 40) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player-active");
      playing = false;
      dice.classList.add("hidden");
    } else {
      // Switch players when clicked on hold
      switchPlayer();
    }
  }
});

// new game implement to reset all the scores and conditions to initial values
newGame.addEventListener("click", init);

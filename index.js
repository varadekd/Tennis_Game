let canvas;
let convasContext;
let score = {
  player: 0,
  computer: 0,
};

// Game theme
let fieldColor = "#424242",
  playerColor = "#F5F5F5",
  computerColor = "#F5F5F5",
  ballColor = "#FF7043";

// Game setting
let difficulty = "easy";

// bots setting
let playerPosition,
  computerPosition = 0,
  botHeight = 100,
  playerSpeed = 30;
computerSpeed = 15;

// Ball setting
ballPosition = {
  x: 0,
  y: 0,
};
ballSpeed = 5;
ballY = 10;

let interval;

window.onload = function () {
  initializePlayArea();
  startGame();
  //   setTimeout(() => {
  setInterval(checkComputerMovement, 500);
  //   }, 5000);
};

function startGame() {
  let framePersecond = 10;
  interval = setInterval(checkBallMovement, 1000 / framePersecond);
}

// This function will help us to steup our game play enviroment
function initializePlayArea() {
  canvas = document.getElementById("game-area");
  canvasContext = canvas.getContext("2d");
  createField();
  setupGameComponents();
}

function createField() {
  //   Creating field where player will play
  canvasContext.fillStyle = fieldColor;
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  //   Creating mid line
  canvasContext.fillStyle = "#FAFAFA";
  canvasContext.fillRect(canvas.width / 2, 10, 2, canvas.height - 20);
}

function drawField() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  createField();
  setUpBallPosition();
  setUpPlayerPosition();
  setUpComputerPosition();
}

// Function is responsible for setting up the game components like player, computer and ball position
function setupGameComponents() {
  // Intializing position for the bots and ball before starting the game
  playerPosition = computerPosition = canvas.height / 2 - botHeight;
  ballPosition = {
    x: canvas.width / 2,
    y: canvas.height / 2 - 40,
  };
  setUpPlayerPosition();
  setUpComputerPosition();
  setUpBallPosition();
}

// Will help us setting position of the player in the game
function setUpPlayerPosition() {
  canvasContext.fillStyle = playerColor;
  canvasContext.fillRect(10, playerPosition, 10, botHeight);
}

// Will help us setting position of the computer in the game
function setUpComputerPosition() {
  canvasContext.fillStyle = computerColor;
  canvasContext.fillRect(canvas.width - 20, computerPosition, 10, botHeight);
}

function setUpBallPosition() {
  canvasContext.fillStyle = ballColor;
  canvasContext.beginPath();
  canvasContext.arc(ballPosition.x, ballPosition.y, 10, 0, 2 * Math.PI);
  canvasContext.fill();
}

// Moves the ball in left or write direction
function checkBallMovement() {
  ballPosition.x += ballSpeed;
  ballPosition.y += ballY;
  if (ballPosition.x >= canvas.width - 30) {
    if (
      ballPosition.y > computerPosition &&
      ballPosition.y < computerPosition + botHeight
    ) {
      ballSpeed = -ballSpeed;
      steepBall(computerPosition);
    } else {
      resetBallPosition();
    }
  } else if (ballPosition.x <= 30) {
    if (
      ballPosition.y > playerPosition &&
      ballPosition.y < playerPosition + botHeight
    ) {
      ballSpeed = -ballSpeed;
      steepBall(playerPosition);
    } else {
      resetBallPosition();
    }
  }

  if (ballPosition.y > canvas.height - 30) {
    ballY = -ballY;
  } else if (ballPosition.y < 20) {
    ballY = -ballY;
  }
  drawField();
}

function steepBall(position) {
  let deltaY = ballPosition.y - (position + botHeight / 2);
  ballY = deltaY * 0.35;
}

// Moves the player in up and down direction on its own axis
function checkPlayerMovement(event) {
  if (
    event &&
    (event.keyCode === 30 || event.key === "ArrowUp") &&
    playerPosition > 20
  ) {
    playerPosition = playerPosition - playerSpeed;
  } else if (
    event &&
    (event.keyCode === 40 || event.key === "ArrowDown") &&
    playerPosition <= canvas.height - (botHeight + 20)
  ) {
    playerPosition = playerPosition + playerSpeed;
  }
  drawField();
}

function checkComputerMovement() {
  let center = computerPosition + botHeight / 2;
  if (center < ballPosition.y) {
    computerPosition = computerPosition + computerSpeed;
  } else {
    computerPosition = computerPosition - computerSpeed;
  }
  drawField();
}

function resetBallPosition() {
  ballSpeed = -ballSpeed;
  ballPosition = {
    x: canvas.width / 2,
    y: canvas.height / 2 - 40,
  };
  setUpBallPosition();
  clearInterval(interval);
  setTimeout(startGame, 2000);
}

// Moving player
window.addEventListener("keydown", checkPlayerMovement);

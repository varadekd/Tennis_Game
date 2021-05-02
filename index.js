let canvas;
let convasContext;
let sam = 1;

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
  botHeight = 80,
  playerSpeed = 15;
computerSpeed = 15;

// Ball setting
ballPosition = {
  x: 0,
  y: 0,
};
ballSpeed = 20;
ballY = 10;

window.onload = function () {
  initializePlayArea();
  setupGameComponents();

  let framePerSecond = 10;
  setInterval(checkBallMovement, 1000 / framePerSecond);

  //   setTimeout(() => {
  //     setInterval(checkComputerMovement, 1000 / framePerSecond);
  //   }, 5000);
};

// This function will help us to steup our game play enviroment
function initializePlayArea() {
  canvas = document.getElementById("game-area");
  canvasContext = canvas.getContext("2d");

  drawField();
}

function drawField() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  //   Creating field where player will play
  canvasContext.fillStyle = fieldColor;
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  //   Creating mid line
  canvasContext.fillStyle = "#FAFAFA";
  canvasContext.fillRect(canvas.width / 2, 10, 2, canvas.height - 20);

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
  canvasContext.fillRect(10, playerPosition, 20, botHeight);
}

// Will help us setting position of the computer in the game
function setUpComputerPosition() {
  canvasContext.fillStyle = computerColor;
  canvasContext.fillRect(canvas.width - 30, computerPosition, 20, botHeight);
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
  if (ballPosition.x > canvas.width - 60) {
    ballSpeed = -ballSpeed;
  } else if (ballPosition.x <= 40) {
    ballSpeed = -ballSpeed;
  }

  if (ballPosition.y > canvas.height) {
    ballY = -ballY;
  } else if (ballPosition.y < 0) {
    ballY = -ballY;
  }
  drawField();
}

// Moves the player in up and down direction on its own axis
function checkPlayerMovement(event) {
  if (
    event &&
    (event.keyCode === 30 || event.key === "ArrowUp") &&
    playerPosition > 10
  ) {
    playerPosition = playerPosition - playerSpeed;
  } else if (
    event &&
    (event.keyCode === 40 || event.key === "ArrowDown") &&
    playerPosition <= canvas.height - botHeight * 2 + 50
  ) {
    playerPosition = playerPosition + playerSpeed;
  }
  drawField();
}

function checkComputerMovement() {
  computerPosition += computerSpeed;
  if (computerPosition > 10) {
    computerSpeed = -computerSpeed;
  } else if (computerPosition <= canvas.height - botHeight * 2 + 50) {
    computerSpeed = -computerSpeed;
  }
  drawField();
}

// Moving player
window.addEventListener("keydown", checkPlayerMovement);

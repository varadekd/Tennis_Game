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
  computerPosition = 0;
let botHeight = 80;

// Ball setting
ballPosition = {
  x: 0,
  y: 0,
};
ballSpeed = 20;

window.onload = function () {
  initializePlayArea();
  setupGameComponents();

  //   let framePerSecond = 10;
  //   setInterval(checkBallMovement, 1000 / framePerSecond);
};

// This function will help us to steup our game play enviroment
function initializePlayArea() {
  canvas = document.getElementById("game-area");
  canvasContext = canvas.getContext("2d");

  //   Creating field where player will play
  canvasContext.fillStyle = fieldColor;
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  //   Creating mid line
  canvasContext.fillStyle = "#FAFAFA";
  canvasContext.fillRect(canvas.width / 2, 10, 2, canvas.height - 20);
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
  ballPosition.x = ballPosition.x + ballSpeed;
  if (ballPosition.x > canvas.width - 60) {
    ballSpeed = -ballSpeed;
    canvasContext.fillStyle = "pink";
  } else if (ballPosition.x <= 40) {
    ballSpeed = Math.abs(ballSpeed);
    canvasContext.fillStyle = "white";
  }
  canvasContext.beginPath();
  canvasContext.arc(ballPosition.x, canvas.height / 2 - 20, 10, 0, 2 * Math.PI);
  canvasContext.fill();
}

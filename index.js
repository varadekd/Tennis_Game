let gameCourt, gameCourtContext;

let score = {
  playerOne: 0,
  playerTwo: 0,
  winningScore: 10,
};

// intialising data for player one (As Paddle one)
let paddleOne = {
  position: 0,
  speed: 30,
  color: "#F5F5F5",
};

// intialising data for computer / player two (As Paddle two)
let paddleTwo = {
  position: 0,
  speed: 30,
  color: "#F5F5F5",
};

// Common entities to be used by paddle
let paddle = {
  height: 100,
  width: 10,
};

// intialising data for ball
let ball = {
  posX: 0,
  posY: 0,
  speedX: 10,
  speedY: 5,
  color: "#FF7043",
  radius: 10,
};

// Game theme
let fieldColor = "#424242";

// Game setting
let difficulty = "easy";

let interval;

// Intializing game as soon as page is loaded
window.onload = function () {
  intializegameCourt();
  updateGameScore();
};

// Clearning all the past data and making sure the game area is compltly new
function intializegameCourt() {
  gameCourt = document.getElementById("game-area");
  gameCourtContext = gameCourt.getContext("2d");
  creategameCourt();
  settingUpGameComponents();
}

// U[dates the game score every time the player wins, Intially both players are alloted with zero
function updateGameScore() {
  document.getElementById("play1Score").innerHTML = score.playerOne;
  document.getElementById("play2Score").innerHTML = score.playerTwo;
}

// Clears all previously created drawing on the fields and re-creates everything.
// This function will be re used everytime we are doing some action on game area
function creategameCourt() {
  //  clearing the drawing
  gameCourtContext.clearRect(0, 0, gameCourt.width, gameCourt.height);

  //   Re drawing field on canvas
  gameCourtContext.fillStyle = fieldColor;
  gameCourtContext.fillRect(0, 0, gameCourt.width, gameCourt.height);

  createNetForCourt();
}

// This is a net which will be short of a middle line for the court
function createNetForCourt() {
  gameCourtContext.fillStyle = "#FAFAFA";
  gameCourtContext.fillRect(gameCourt.width / 2, 10, 2, gameCourt.height - 20);
}

// Setting up all the basic components like player paddles and ball for the game to be played
function settingUpGameComponents() {
  paddleOne.position = paddleTwo.position =
    gameCourt.height / 2 - paddle.height;
  ball.posX = gameCourt.width / 2;
  ball.posY = gameCourt.height / 2 - 50;
  console.log(ball.posX, ball.pos);
  ballPosition();
  paddleOnePosition();
  paddleTwoPosition();
  startGame();
  4;
}

// Starts the game play
function startGame() {
  let framePersecond = 30;
  interval = setInterval(controlBallMovement, 1000 / framePersecond);
  checkPaddleTwoControlSetting();
}

// Checks wether the setting is two player or single player
function checkPaddleTwoControlSetting() {
  setInterval(() => {
    paddleTwoControlAuto();
  }, 200);
}

// Re draws the court
function reDrawGameCourt() {
  creategameCourt();
  ballPosition();
  paddleOnePosition();
  paddleTwoPosition();
}

// Setting up position for the ball at the center of the screen
// The same function will be used to update the ball movement
function ballPosition() {
  try {
    gameCourtContext.fillStyle = ball.color;
    gameCourtContext.beginPath();
    gameCourtContext.arc(ball.posX, ball.posY, ball.radius, 0, 2 * Math.PI);
    gameCourtContext.fill();
  } catch (err) {
    console.error("Error in handling ball position", err);
  }
}

// Setting up position for the paddle one on the left side of the screen
// The same function will be used to update the paddle one movement
function paddleOnePosition() {
  try {
    gameCourtContext.fillStyle = paddleOne.color;
    gameCourtContext.fillRect(10, paddleOne.position, 10, paddle.height);
  } catch (err) {
    console.error("Error ocuured in paddle one position", err);
  }
}

// Setting up position for the paddle two on the right side of the screen
// The same function will be used to update the paddle two movement
function paddleTwoPosition() {
  try {
    gameCourtContext.fillStyle = paddleTwo.color;
    gameCourtContext.fillRect(
      gameCourt.width - 20,
      paddleTwo.position,
      10,
      paddle.height
    );
  } catch (err) {
    console.error("Error ocuured in paddle two position", err);
  }
}

// Moves the ball in left or write direction
function controlBallMovement() {
  ball.posX += ball.speedX;
  ball.posY += ball.speedY;

  // Checking if the ball striked to the left side of the screen or to the right side and calculating x axis speed for ball
  // Checking with 30 is because there the width of paddle is 10, margin from the left is 10 and ball radius is 10.
  // Thus will give proper effect of touching the paddle
  if (ball.posX <= 30) {
    //   Checking if the ball touched the paddle
    if (
      ball.posY > paddleOne.position &&
      ball.posY < paddleOne.position + paddle.height
    ) {
      ball.speedX = -ball.speedX;
      changeBallVerticalSpeed(paddleOne.position);
    } else {
      awardPointToPlayer("two");
    }
  } else if (ball.posX >= gameCourt.width - 30) {
    //   Checking if the ball touched the paddle
    if (
      ball.posY > paddleTwo.position &&
      ball.posY < paddleTwo.position + paddle.height
    ) {
      ball.speedX = -ball.speedX;
      changeBallVerticalSpeed(paddleTwo.position);
    } else {
      awardPointToPlayer("one");
    }
  }

  // Checking if the ball striked to the left side of the screen or to the right side and calculating y axis speed for ball
  if (ball.posY > gameCourt.height - 30) {
    ball.speedY = -ball.speedY;
  } else if (ball.posY < 20) {
    ball.speedY = -ball.speedY;
  }
  reDrawGameCourt();
}

// Changes the speed of the ball in vertical direction according to the impact on the paddle
function changeBallVerticalSpeed(position) {
  let deltaSpeedY = ball.posY - (position + paddle.height / 2);
  ball.speedY = deltaSpeedY * 0.35;
}

// Moves the player in up and down direction on its own axis
function paddleOneControl(event) {
  if (
    event &&
    (event.keyCode === 30 || event.key === "ArrowUp") &&
    paddleOne.position > 20
  ) {
    paddleOne.position = paddleOne.position - paddleOne.speed;
  } else if (
    event &&
    (event.keyCode === 40 || event.key === "ArrowDown") &&
    paddleOne.position <= gameCourt.height - (paddle.height + 35)
  ) {
    paddleOne.position = paddleOne.position + paddleOne.speed;
  }
  reDrawGameCourt();
}

function paddleTwoControlAuto() {
  let paddletwoCenter = paddleTwo.position + paddle.height / 2;
  if (
    paddletwoCenter < ball.posY &&
    paddleTwo.position <= gameCourt.height - (paddle.height + 35)
  ) {
    paddleTwo.position = paddleTwo.position + paddleTwo.speed;
  } else if (paddletwoCenter > ball.posY && paddleOne.position > 20) {
    paddleTwo.position = paddleTwo.position - paddleTwo.speed;
    console.log("else If");
  }
  reDrawGameCourt();
}

// Award points to opponent whenever the player loses.
function awardPointToPlayer(player) {
  switch (player) {
    case "two":
      score.playerTwo++;
      break;
    case "one":
      score.playerOne++;
      break;
    default:
      console.warn(
        "Player can't be awarded point the condition is not matched"
      );
  }
  updateGameScore();
  if (
    score.playerOne >= score.winningScore ||
    score.playerTwo >= score.winningScore
  ) {
    clearInterval(interval);
    alert("Some one won");
  } else {
    resetBallPosition();
  }
}

// When player looses the ball is reset and kept at the middle of the court
function resetBallPosition() {
  try {
    ball.speedX = -ball.speedX;
    ball.posX = gameCourt.width / 2;
    ball.posY = gameCourt.height / 2 - 40;
    ballPosition();
    clearInterval(interval);
    setTimeout(startGame, 2000);
  } catch (err) {
    console.log("error in resetting the ball position", err);
  }
}

// Moving player
window.addEventListener("keydown", paddleOneControl);

let canvas;
let convasContext;
let playerHeight = 80;
let sam = 1;

window.onload = function () {
  canvas = document.getElementById("game-area");
  canvasContext = canvas.getContext("2d");

  canvasContext.fillStyle = "#424242";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  // Setting player position
  canvasContext.fillStyle = "#F5F5F5";
  canvasContext.fillRect(
    10,
    canvas.height / 2 - playerHeight,
    20,
    playerHeight
  );

  //  Mid line
  canvasContext.fillStyle = "#FAFAFA";
  canvasContext.fillRect(canvas.width / 2, 10, 2, canvas.height - 20);

  // Setting computer position
  canvasContext.fillStyle = "#F5F5F5";
  canvasContext.fillRect(
    canvas.width - 30,
    canvas.height / 2 - playerHeight,
    20,
    playerHeight
  );

  intialBallPosition();
  //   setInterval(() => {
  //     moveBall();
  //   }, 1000);
};

function intialBallPosition() {
  canvasContext.fillStyle = "#FF7043";
  canvasContext.beginPath();
  canvasContext.arc(
    canvas.width / 2,
    canvas.height / 2 - 40,
    10,
    0,
    2 * Math.PI
  );
  canvasContext.fill();
}

function moveBall() {
  canvasContext.fillStyle = "#FF7043";
  canvasContext.beginPath();
  canvasContext.arc(
    canvas.width / 2 - 30 * sam,
    canvas.height / 2 - 20,
    10,
    0,
    2 * Math.PI
  );
  canvasContext.fill();
  sam += 1;
}

// cache the canvas
const canvas = document.getElementById("myCanvas");
// initialize the context
let ctx = canvas.getContext("2d");

const CW = canvas.width;
const CH = canvas.height;
const halfCW = CW / 2;
const halfCH = CH / 2;

let ballIconSrc = "https://cdn-icons-png.flaticon.com/512/53/53283.png";
let ballImage = new Image();
ballImage.crossOrigin = "anonymous";
ballImage.src = ballIconSrc;

let ballX = halfCW;
let ballY = halfCH;
let ballW = 30;
let ballH = 30;

function drawRect(x, y, w, h) {
  ctx.fillRect(x, y, w, h);
}
function drawBall() {
  ctx.drawImage(ballImage, ballX, ballY, ballW, ballH);
}
drawBall();
function drawHUD() {
  ctx.font = "15px Arial";
  ctx.fillText("Bounces: " + bounces, 20, 50);
  ctx.fillText("Falls: " + falls, 20, 70);
  ctx.fillText("Goals: " + goals, 20, 90);
}
let paddleW = 80;
let paddleH = 20;
let paddleX = halfCW - paddleW / 2;
let paddleY = CH - paddleH - 30;
function drawPaddle() {
  drawRect(paddleX, paddleY, paddleW, paddleH);
}
drawPaddle();

let netW = 200;
let netH = 50;
let netX = CW / 2 - netW / 2;
let netY = CH / 2 - 300;

function drawNet() {
  drawRect(netX, netY, netW, netH);
}
drawNet();

let ballSpeedX = 10;
let ballSpeedY = 3;

function paddleCollision() {
  if (
    ballX < paddleX + paddleW &&
    ballX + ballW > paddleX &&
    ballY < paddleY + paddleH &&
    ballY + ballH > paddleY
  ) {
    return true;
  }
}
function netCollision() {
  if (
    ballX < netX + netW &&
    ballX + ballW > netX &&
    ballY < netY + netH &&
    ballY + netH > netY
  ) {
    return true;
  }
}

//event listener
let moveRight = false;
let moveLeft = false;
let moveUp = false;
let moveDown = false;
document.addEventListener("keydown", function (event) {
  if (event.key === "d") {
    // paddleX += 20;
    moveRight = true;
  }
  if (event.key === "a") {
    // paddleX += -20;
    moveLeft = true;
  }
});
document.addEventListener("keyup", function (event) {
  if (event.key === "d") {
    // paddleX -= 20;
    moveRight = false;
  }
  if (event.key === "a") {
    // paddleX -= -20;
    moveLeft = false;
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "w") {
    moveUp = true;
  }
  if (event.key === "s") {
    moveDown = true;
  }
});
document.addEventListener("keyup", function (event) {
  if (event.key === "w") {
    moveUp = false;
  }
  if (event.key === "s") {
    moveDown = false;
  }
});
let bounces = 0;
let falls = 0;
let goals = 0;
const highScore = document.getElementById("Points");
function playGame() {
  // console.log("Im playing");

  ctx.clearRect(0, 0, CW, CH);
  ballY += ballSpeedY;
  ballX += ballSpeedX;
  console.log(bounces);
  //canvas to be cleared
  if (ballX + ballW > CW || ballX < 0) {
    // ballX = halfCW;
    ballSpeedX *= -1;
  }
  if (ballY < 0) {
    // ballY = halfCH;
    ballSpeedY *= -1;
  }
  if (ballY + ballH > CH) {
    falls++;
    console.log("Number of Falls= " + falls);
    ballX = CW / 2;
    ballY = CH / 2;
  }

  if (paddleCollision()) {
    console.log("collision");
    ballSpeedX = Math.floor(Math.random() * 3) + 6;
    ballSpeedY = Math.floor(Math.random() * 3) + 6;
    ballSpeedY *= -1;
    let ranNum = Math.floor(Math.random() * 3) + 1;
    if (ranNum == 0) {
      ballSpeedX *= 1;
    } else {
      ballSpeedX *= -1;
    }
    bounces++;
    console.log("bounces: " + bounces);
    // Points.textContent = "HighScore: " + bounces;
  }
  if (moveRight && paddleX + paddleW < CW) {
    paddleX += 5;
  }
  if (moveLeft && paddleX > 0) {
    paddleX += -5;
  }
  if (moveUp && paddleY > 0) {
    paddleY += -4;
  }
  if (moveDown && paddleY + paddleH < CH) {
    paddleY += 4;
  }
  if (netCollision()) {
    goals++;
    console.log("goals");
    ballSpeedX *= -1;
    ballSpeedY *= -1;
    console.log("goals: " + goals);
  }
  if (moveRight && paddleX + paddleW < CW) {
    paddleX += 5;
  }
  if (moveLeft && paddleX > 0) {
    paddleX -= 5;
  }
  // draw ball
  drawBall();
  //recursively call the playGame function
  drawPaddle();
  drawNet();
  drawHUD();
  requestAnimationFrame(playGame);
}
// playGame();

drawBall();

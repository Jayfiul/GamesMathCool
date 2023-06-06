const canvas = document.getElementById('snakeCanvas');
const context = canvas.getContext('2d');

const snakeSize = 20;
const canvasSize = 400;
const initialSnakeLength = 3;
let snake = [];
let dx = 10;
let dy = 0;
let apple = { x: 0, y: 0 };

canvas.width = canvasSize;
canvas.height = canvasSize;

function getRandomPosition() {
  return Math.floor(Math.random() * (canvasSize / snakeSize)) * snakeSize;
}

function createApple() {
  apple.x = getRandomPosition();
  apple.y = getRandomPosition();
}

function drawSnakePart(snakePart) {
  context.fillStyle = 'green';
  context.strokeStyle = 'darkgreen';
  context.fillRect(snakePart.x, snakePart.y, snakeSize, snakeSize);
  context.strokeRect(snakePart.x, snakePart.y, snakeSize, snakeSize);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  
    // Check if the snake hits the canvas boundaries
    if (
      head.x < 0 ||
      head.x >= canvasSize ||
      head.y < 0 ||
      head.y >= canvasSize
    ) {
      // End the game or perform the necessary action
      // For now, we simply reset the game by calling the startGame function
      startGame();
      return;
    }
  
    snake.unshift(head);
    
    //eat apple part
    if (head.x === apple.x && head.y === apple.y) {
      createApple();
      currentSpeed += speedIncreaseAmount
    } else {
      snake.pop();
    }
  }
  

function drawApple() {
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, snakeSize, snakeSize);
}

function clearCanvas() {
  context.clearRect(0, 0, canvasSize, canvasSize);
}

function gameLoop() {
    clearCanvas();
    drawApple();
    moveSnake();
    drawSnake();
  }
  
  
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;

  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

let gameInterval;
const initialSpeed = 100;
let currentSpeed = initialSpeed;
const speedIncreaseAmount = 10; // Amount to increase the speed

function startGame() {
    clearInterval(gameInterval);
  
    snake = [];
    for (let i = initialSnakeLength - 1; i >= 0; i--) {
      snake.push({ x: i * snakeSize, y: 0 });
    }
    createApple();
  
    dx = 10;
    dy = 0;
    currentSpeed = initialSpeed; // Reset the current speed to the initial speed
  
    gameInterval = setInterval(gameLoop, currentSpeed);
  }
  
  
startGame();

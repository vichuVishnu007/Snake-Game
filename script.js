const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const box = 20;
const canvasSize = 20;
const scoreElement = document.querySelector('.score');

let score = 0;

const snake = [];
snake[0] = { x: canvasSize / 2 * box, y: canvasSize / 2 * box };

let d;

document.addEventListener('keydown', direction);

function direction(event) {
  if (event.keyCode == 37 && d != 'RIGHT') {
    d = 'LEFT';
  } else if (event.keyCode == 38 && d != 'DOWN') {
    d = 'UP';
  } else if (event.keyCode == 39 && d != 'LEFT') {
    d = 'RIGHT';
  } else if (event.keyCode == 40 && d != 'UP') {
    d = 'DOWN';
  }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = (i == 0) ? 'green' : 'white';
    context.fillRect(snake[i].x, snake[i].y, box, box);

    context.strokeStyle = 'red';
    context.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d == 'LEFT') snakeX -= box;
  if (d == 'UP') snakeY -= box;
  if (d == 'RIGHT') snakeX += box;
  if (d == 'DOWN') snakeY += box;

  if (snakeX == canvasSize * box || snakeY == canvasSize * box || snakeX < 0 || snakeY < 0) {
    clearInterval(game);
  }

  if (snakeX == apple.x && snakeY == apple.y) {
    score++;
    scoreElement.textContent = 'Score: ' + score;
    apple.x = Math.floor(Math.random() * canvasSize) * box;
    apple.y = Math.floor(Math.random() * canvasSize) * box;
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  if (snakeX != apple.x || snakeY != apple.y) {
    for (let i = 1; i < snake.length; i++) {
      if (snakeX == snake[i].x && snakeY == snake[i].y) {
        clearInterval(game);
      }
    }
  }

  snake.unshift(newHead);

  context.fillStyle = 'white';
  context.fillRect(apple.x, apple.y, box, box);
}

const apple = {
  x: Math.floor(Math.random() * canvasSize) * box,
  y: Math.floor(Math.random() * canvasSize) * box
};

let game = setInterval(draw, 100);
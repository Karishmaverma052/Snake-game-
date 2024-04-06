let inputDir = {x:0 , y:0} ;
const gameContainer = document.querySelector('.game-container');
const snakeElement = document.getElementById('snake');
const foodElement = document.getElementById('food');
const scoreElement = document.getElementById('score');
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameOver.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let snake = [{x: 200, y: 200}];
let food = {x: 0, y: 0};
let direction = 'right';
let score = 0;

function updateSnake() {
  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] };
  }
  if (direction === 'up') {
    snake[0].y -= 10;
  } else if (direction === 'down') {
    snake[0].y += 10;
  } else if (direction === 'left') {
    snake[0].x -= 10;
  } else if (direction === 'right') {
    snake[0].x += 10;
  }
}

function checkCollision() {
  if (snake[0].x < 0 || snake[0].x >= 400 || snake[0].y < 0 || snake[0].y >= 400) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function generateFood() {
  food.x = Math.floor(Math.random() * 40) * 10;
  food.y = Math.floor(Math.random() * 40) * 10;
}

function updateGame() {
  updateSnake();
  if (snake[0].x === food.x && snake[0].y === food.y) {
    snake.push({ ...snake[snake.length - 1] });
    score += 10;
    scoreElement.textContent = `Score: ${score}`;
    generateFood();
  }
  if (checkCollision()) {
    gameOverSound.play();
    alert(`Game Over! Your score is ${score}`);
    snake = [{x: 200, y: 200}];
    musicSound.play();
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    direction = 'right';
    generateFood();
  }
  
  render();
}

function render() {
  snakeElement.style.left = `${snake[0].x}px`;
  snakeElement.style.top = `${snake[0].y}px`;
  for (let i = 1; i < snake.length; i++) {
    const segment = document.createElement('div');
    segment.className = 'snake';
    segment.style.left = `${snake[i].x}px`;
    segment.style.top = `${snake[i].y}px`;
    gameContainer.appendChild(segment);
  }
  foodElement.style.left = `${food.x}px`;
  foodElement.style.top = `${food.y}px`;
}

document.addEventListener('keydown', (e) => {
    moveSound.play();
    
        if (e.key === 'ArrowUp' && direction !== 'down') {
            direction = 'up';
          } else if (e.key === 'ArrowDown' && direction !== 'up') {
            direction = 'down';
          } else if (e.key === 'ArrowLeft' && direction !== 'right') {
            direction = 'left';
          } else if (e.key === 'ArrowRight' && direction !== 'left') {
            direction = 'right';
          }

});

setInterval(updateGame, 100);

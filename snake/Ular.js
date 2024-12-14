const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

const boxSize = 20; // Size of a grid box
const canvasSize = 400; // Canvas dimensions
const gridCount = canvasSize / boxSize;

let snake = [{ x: 10, y: 10 }]; // Initial snake position
let food = { x: Math.floor(Math.random() * gridCount), y: Math.floor(Math.random() * gridCount) };
let direction = 'RIGHT';
let score = 0;
let speed = 150;

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Draw the game grid
function drawGrid() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
}

// Draw the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

// Draw the snake
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
    });
}

// Move the snake
function moveSnake() {
    const head = { ...snake[0] };

    if (direction === 'UP') head.y -= 1;
    if (direction === 'DOWN') head.y += 1;
    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'RIGHT') head.x += 1;

    // Check for wall collisions
    if (head.x < 0 || head.x >= gridCount || head.y < 0 || head.y >= gridCount) {
        gameOver();
        return;
    }

    // Check for self-collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        food = { x: Math.floor(Math.random() * gridCount), y: Math.floor(Math.random() * gridCount) };
    } else {
        snake.pop();
    }
}

// Game over logic
function gameOver() {
    clearInterval(gameInterval);
    alert(`Game Over! Final Score: ${score}`);
    window.location.reload();
}

// Main game loop
function gameLoop() {
    drawGrid();
    drawFood();
    moveSnake();
    drawSnake();
}

// Start the game
const gameInterval = setInterval(gameLoop, speed);

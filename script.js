document.body.style.overflowY = ('hidden');
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/game_window.png";
const foodImg = new Image();
foodImg.src = "img/food.png";

let square = 32;
let score = 0;

let food = {
	x: Math.floor((Math.random() * 17 + 1)) * square,
	y: Math.floor((Math.random() * 15 + 3)) * square,
};

let snake = [];
snake[0] = {
	x: 9 * square,
	y: 10 * square
};

document.addEventListener("keydown", direction);
let dir;

function direction(event) {
	if ((event.keyCode == 37 || event.keyCode == 65) && dir != "right")
		dir = "left";
	else if ((event.keyCode == 38 || event.keyCode == 87) && dir != "down")
		dir = "up";
	else if ((event.keyCode == 39 || event.keyCode == 68) && dir != "left")
		dir = "right";
	else if ((event.keyCode == 40 || event.keyCode == 83) && dir != "up")
		dir = "down";
	else if (event.keyCode == 13) {
		window.location.reload();
	}
}

function eatTail(head, arr) {
	for (let i = 0; i < arr.length; i++) {
		if (head.x == arr[i].x && head.y == arr[i].y) {
			endGame();
		}
	}
}

function drawGame() {
	ctx.drawImage(ground, 0, 0);
	ctx.drawImage(foodImg, food.x, food.y);

	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = "black";
		ctx.fillRect(snake[i].x + 2, snake[i].y + 2, square - 4, square - 4);
		ctx.strokeStyle = "fuchsia";
		ctx.strokeRect(snake[i].x + 6, snake[i].y + 6, square - 12, square - 12);
	}

	ctx.fillStyle = "black";
	ctx.font = "50px Arial";
	ctx.fillText(`Score: ${score}`, square * 6.6, square * 2);
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (snakeX == food.x && snakeY == food.y) {
		score++;
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * square,
			y: Math.floor((Math.random() * 15 + 3)) * square,
		};
	} else {
		snake.pop();
	}

	if (snakeX < square || snakeX > square * 17 ||
		snakeY < 3 * square || snakeY > square * 17)
		endGame();

	if (dir == "left") snakeX -= square;
	if (dir == "right") snakeX += square;
	if (dir == "up") snakeY -= square;
	if (dir == "down") snakeY += square;

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);
	snake.unshift(newHead);
}

function endGame() {
	ctx.fillStyle = "black";
	ctx.font = "60px Arial";
	ctx.fillText('GAME OVER', square * 3.8, square * 10);
	ctx.font = "30px Arial";
	ctx.fillText('Press "Enter" to restart', square * 4.7, square * 11);
	clearInterval(game);
}

let game = setInterval(drawGame, 150);
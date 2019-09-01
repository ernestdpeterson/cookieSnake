var snake = new Snake;
var food = new Food;
var canvasElement = document.getElementById("mySnakeCanvas");
var ctx = canvasElement.getContext("2d");
// var sideHight = canvasElement.clientHeight;
// var sideWidth = canvasElement.clientWidth;

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 38 && snake.yDirection !== 1) {
        snake.move(0, -1);
    } else if (event.keyCode === 39 && snake.xDirection !== -1) {
        snake.move(1, 0);
    } else if (event.keyCode === 40 && snake.yDirection !== -1) {
        snake.move(0, 1);
    } else if (event.keyCode === 37 && snake.xDirection !== 1) {
        snake.move(-1, 0);
    }
});

function draw() {
    food.createFood();
    snake.update();
    snake.show();
    requestAnimationFrame(draw);
}

draw();
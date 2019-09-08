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

function borderLine() {
    ctx.beginPath();
    ctx.moveTo(1, 1);
    ctx.lineTo(1, 599);
    ctx.lineTo(599, 599);
    ctx.lineTo(599, 1);
    ctx.lineTo(1, 1);
    ctx.strokeStyle = "orange";
    ctx.stroke();
}

$(".gameButton").click(function() {
    snake.reset();
});

if (window.innerWidth < 600) {
    window.alert("Window is too small to play this game. Minimum width is 600 pixels.");
}

if (window.innerHeight < 831) {
    window.alert("Window is too small to play this game. Minimum height is 830 pixels.");
}

if (typeof window.orientation != "undefined" || navigator.userAgent.indexOf('IEMobile') != -1) {
    window.aler("Mobile devices not supported for this game.")
}

function draw() {
    borderLine();
    food.createFood();
    snake.update();
    snake.show();
    snake.collision();
    requestAnimationFrame(draw);
}

draw();
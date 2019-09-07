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
    var itterator = [];

$("#testButton").click(function() {
    if(itterator.length == 0){
        $(".offscreen").css("right", "14em");
        itterator.push("1");
    } else if(itterator.length ==1){
        $(".offscreen").css("right", "400em");
        itterator.shift();
    }
});

$(".gameButton").click(function() {
    snake.reset();
});

function draw() {
    food.createFood();
    snake.update();
    snake.show();
    requestAnimationFrame(draw);
}

draw();
// browser-sync start --server --files "css/*.css, index.html, js/main.js, js/obj.js"

var x = 0;
var y = 0;
var segments = [1];

function randSpot() {
    var randomSpot = Math.floor(Math.random()*600);
    if (randomSpot < 5) {
        return (randomSpot + 5);
    } else if (randomSpot > 595) {
        return (randomSpot - 5);
    } else {
        return randomSpot;
    }
}

function Food() {
    this.x = randSpot();
    this.y = randSpot();
    this.createFood = function() {
        if (
            (snake.x + 10) > (food.x - 5) &&
            (snake.y + 10) > (food.y - 5) &&
            (snake.x) < (food.x + 5) &&
            (snake.y) < (food.y + 5)
           )  {
            food.clearFood();
            segments.push("1");
            this.x = randSpot();
            this.y = randSpot();
        }
        // work on keeping the food from manifesting inside the snake's tail
        // for (var i = snake.tail.length - 1; i >= 0; i--) {
        //     if(snake.tail[i] == randomSpot){
        //         randSpot();
        //     }
        // }

        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0*Math.PI, 2*Math.PI);
        ctx.fillStyle = "tan";
        ctx.fill();
    }

    this.clearFood = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0*Math.PI, 2*Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }

}

function Snake() {
    this.x = x;
    this.y = y;
    this.xDirection = this.x;
    this.yDirection = this.y;
    this.segments = segments;
    this.tail = [];

    this.clear = function(theX, theY) {
        ctx.beginPath();
        ctx.rect(theX, theY, 10, 10);
        ctx.fillStyle = "black";
        ctx.fill();
    }

    this.update = function() {
        if (this.x == -1) {
            this.x = 0;
        }
        if (this.x >= (590)) {
            this.x = 590;
        }
        if (this.y == -1) {
            this.y = 0;
        }
        if (this.y >= (590)) {
            this.y = 590;
        }

        this.x = this.x + (this.xDirection);
        this.y = this.y + (this.yDirection);
    }

    this.show = function() {
        this.tail.push([this.x, this.y]);
        if (this.tail.length > (this.segments.length*10)) {
            this.clear(this.tail[0][0], this.tail[0][1])
            this.tail.shift();
        }

        ctx.beginPath();
        ctx.rect(this.x, this.y, 10, 10);
        ctx.fillStyle = "white";
        ctx.fill();
        $("#theScore").html((this.tail.length/10));
    }

    this.move = function(xdir, ydir) {
        this.xDirection = xdir;
        this.yDirection = ydir;
    }
}
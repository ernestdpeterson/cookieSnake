var x = 0;
var y = 0;
function randSpot() {
    return Math.floor(Math.random()*600);
}

function Food() {
    this.x = randSpot();
    this.y = randSpot();

    this.createFood = function() {
        if (
            (snake.x + 6) > (food.x - 5) &&
            (snake.y + 6) > (food.y - 5) &&
            (snake.x - 6) < (food.x + 3) &&
            (snake.y - 6) < (food.y + 3)
           )  {
            food.clearFood();
            this.x = randSpot();
            this.y = randSpot();
        }

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

    this.clear = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 10, 10);
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

        this.x = this.x + this.xDirection;
        this.y = this.y + this.yDirection;
    }

    this.show = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 10, 10);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    this.move = function(xdir, ydir) {
        this.xDirection = xdir;
        this.yDirection = ydir;
    }
}
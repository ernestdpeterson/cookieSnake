// browser-sync start --server --files "css/*.css, index.html, js/main.js, js/obj.js"

var x = 0;
var y = 0;
var segments = [1];
var maxScore;

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
            for (var a = snake.tail.length - 1; a >= 0; a--) {
                if (this.x >= (snake.tail[a][0] - 5) &&
                    this.x <= (snake.tail[a][0] + 5) &&
                    this.y >= (snake.tail[a][1] - 5) &&
                    this.y <= (snake.tail[a][1] +5)) {
                    a = snake.tail.length;
                    this.x=randSpot();
                    this.y=randSpot();
                }
            }
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
    this.segments = segments;
    this.tail = [];

    this.collision = function() {

        for (var i = this.tail.length - 20; i >= 0; i--) {
            if (this.tail[i] == undefined) {
                return;
            } else if (this.tail[i][0] == this.x &&
                this.tail[i][1] == this.y) {

                this.x = randSpot();
                this.y = randSpot();
                this.xDirection =0;
                this.yDirection =0;
                this.reset();
                $(".offscreen").css("right", "14em");
            }
        }
    }

    this.reset = function() {
        segments = [1];
        this.segments = segments;
        for (var o = this.tail.length - 1; o >= 0; o--) {
            this.clear(this.tail[0][0], this.tail[0][1])
            this.tail.shift();
        }
        $(".offscreen").css("right", "400em");
    }

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
        var theScore = this.tail.length/10;

        //color the sanke
        var theGradient = ctx.createLinearGradient(this.x, this.y, this.x+10, this.y+10);
        theGradient.addColorStop(0, "green");
        theGradient.addColorStop(1, "lightgreen");

        this.tail.push([this.x, this.y]);

        //manage the tails length
        if (this.tail.length > (this.segments.length*10)) {
            this.clear(this.tail[0][0], this.tail[0][1])
            this.tail.shift();
        }

        ctx.beginPath();
        ctx.rect(this.x, this.y, 10, 10);
        ctx.fillStyle = theGradient;
        ctx.fill();

        $("#theScore").html(theScore);

        if (maxScore >= theScore) {
            $("#maxScore").html(maxScore);
        } else {
            maxScore = theScore;
            $("#maxScore").html(maxScore);
        }
        

    }

    this.move = function(xdir, ydir) {
        this.xDirection = xdir;
        this.yDirection = ydir;
    }
}
var ballsArray = [];

function Game(ballsNumber, width, height) {

    this.ballsNumber = ballsNumber;
    this.width = width;
    this.height = height;
    var boundary = {
        width: this.width,
        height: this.height
    };

    var box = document.getElementById('box');
    box.style.width = boundary.width + 'px';
    box.style.height = boundary.height + 'px';
    box.style.backgroundColor = '#ccc';
    box.style.position = 'realative';

    this.init = function () {
        for (var i = 0; i < this.ballsNumber; i++) {
            do {
                if (ballsArray[i] != null) {
                    ballsArray[i].removeBall();
                }
                var circle = {
                    x: randomGenerator(25, boundary.width - 20),
                    y: randomGenerator(25, boundary.height - 20),
                    radius: randomGenerator(8, 20),
                    color: "rgb(" + randomGenerator(20, 256) + "," + randomGenerator(20, 256) + "," + randomGenerator(20, 256) + ")"
                }

                var player = new Ball(circle, boundary, box);
                player.drawBall();
                ballsArray.push(player);

            } while (player.collison());
        }
        setInterval(this.startGame, 10);
    }

    this.startGame = function () {

        for (var i = 0; i < ballsArray.length; i++) {
            ballsArray[i].moveBall();
            ballsArray[i].collison();
        }
    }
}

var game = new Game(10, 600, 600).init();

function Ball(circle, boundary, box) {

    this.x = circle.x;
    this.y = circle.y;
    this.width = circle.radius * 2;
    this.height = circle.radius * 2;
    this.box = box;
    this.boundary = boundary;
    this.col = circle.color;
    this.radius = circle.radius;

    this.SPEED = 1;
    this.vel = 1;
    var dir = [-1, 1];
    this.Xdirection = dir[randomGenerator(0, 1)];
    this.Ydirection = dir[randomGenerator(0, 1)];

    var ball = document.createElement('div');

    this.drawBall = function () {

        this.box.appendChild(ball);
        ball.style.width = this.width + 'px';
        ball.style.height = this.height + 'px';
        ball.style.borderRadius = '50%';
        ball.style.backgroundColor = this.col;
        ball.style.position = 'absolute';
        ball.style.left = (this.x - this.radius) + 'px';
        ball.style.top = (this.y - this.radius) + 'px';
    }


    this.moveBall = function () {

        ball.style.left = this.x + 'px';
        ball.style.top = this.y + 'px';

        this.y += this.Ydirection * this.SPEED;
        this.x += this.Xdirection;

        if (this.x + this.height < 20 + this.height || this.x + this.height > boundary.height) {
            this.Xdirection = -this.Xdirection;

        } else if (this.y + this.width < 20 + this.width || this.y + this.width > boundary.width) {
            this.Ydirection = -this.Ydirection;
        }
    }

    this.collison = function () {

        for (var i = 0; i < ballsArray.length; i++) {
            if (this == ballsArray[i]) {
                continue;
            }

            var other = ballsArray[i];
            var distance = calculateDistance(other.x, other.y, this.x, this.y);
            if (this.radius + other.radius > distance) {
                this.Xdirection = -this.Xdirection;
                this.Ydirection = -this.Ydirection;
                other.Xdirection = -other.Xdirection;
                other.Ydirection = -other.Ydirection;
                return true;
            }
        }
        return false;
    }

    this.removeBall = function () {
        this.box.removeChild(ball);
    }
}


function calculateDistance(otherX, otherY, thisX, thisY) {
    var dX = otherX - thisX;
    var dY = otherY - thisY;
    var dist = Math.sqrt((dX * dX) + (dY * dY));
    return dist;
}

function randomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

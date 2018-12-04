var pipes = [];
var score = 0;
var gameOverMenu;
var startGameMenu;
var constant = 100;
/*
*======================================================================================================================
*bird class
*generates bird
*move bird 
* ======================================================================================================================
*/

class Bird {
    constructor(context, birdImage, birdX, birdY) {
        this.context = context;
        this.birdX = birdX;
        this.birdY = birdY;
        this.birdImage = birdImage;
    }

    draw() {
        this.context.drawImage(this.birdImage, this.birdX, this.birdY);
    }

    update() {
        var gravity = 1;
        this.birdY += gravity;
        var that = this;
        document.body.onkeyup = function (e) {
            if (e.keyCode == 32) {
                that.birdY -= 40;
            }
        }
    }

}

/*
*======================================================================================================================
*pipe class
*generates pipe
*move pipe
generate pipes infinitely 
* ======================================================================================================================
*/

class Pipe {

    constructor(context, pipeNorth, pipeSouth, pipesPos, canvas) {
        this.pipeSouth = pipeSouth;
        this.pipeNorth = pipeNorth;
        this.context = context;
        this.pipesPos = pipesPos;
        this.interval = 50;
        this.canvas = canvas;
    }

    draw() {
        for (let i = 0; i < pipes.length; i++) {
            this.context.drawImage(this.pipeNorth, pipes[i].x, pipes[i].y);
            this.context.drawImage(this.pipeSouth, pipes[i].x, pipes[i].y + (this.pipeNorth.height + constant));
            this.update(i);
        }
    }

    update(i) {

        pipes[i].x--;
        if (pipes[i].x == this.interval) {
            pipes.push({
                x: this.canvas.clientWidth,
                y: Math.floor((Math.random() * this.pipeNorth.height) - this.pipeNorth.height)
            });
        } else if (pipes[i].x + pipes[i].width < 0) {
            pipes.splice(0, 1);
        }
    }
}

/*
*======================================================================================================================
*main game class
*start game
*draw images on the canvas
*detect collison between bird and pipe
*count score
*display start and gameover menu
* ======================================================================================================================
*/

class Game {

    constructor() {
        this.canvas = document.getElementById('game-screen');
        this.context = this.canvas.getContext('2d');
        this.birdX = 25;
        this.birdY = randomGenerator(125, 275);
        this.background;
        this.birdImage;
        this.pipeNorthImage;
        this.pipeSouthImage;
        this.ground;
        this.gameOver = false;
        this.gameOn;
        this.bird;
    }

    startGame() {
        this.gameOver = false;
        this.drawImages();

    }

    async drawImages() {
        this.background = await this.loadImages('./images/background.png');
        this.ground = await this.loadImages('./images/ground.png');
        this.birdImage = await this.loadImages('./images/flappy.png');
        this.pipeNorthImage = await this.loadImages('./images/pipeNorth.png');
        this.pipeSouthImage = await this.loadImages('./images/pipeSouth.png');

        this.bird = new Bird(this.context, this.birdImage, this.birdX, this.birdY);

        pipes[0] = {
            x: this.canvas.clientWidth,
            y: 0
        }

        let pipe = new Pipe(this.context, this.pipeNorthImage, this.pipeSouthImage, pipes[0], this.canvas);
        this.update(pipe, this.bird);
    }

    update(pipe, bird) {
        this.gameOn = setInterval(() => {
            this.context.drawImage(this.background, 0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
            pipe.draw();
            this.context.drawImage(this.ground, 0, this.canvas.clientHeight - this.ground.height);
            bird.draw();
            bird.update();
            this.detectCollison();
        }, 10);
    }

    loadImages(url) {
        return new Promise(resolve => {
            const image = new Image();
            image.addEventListener('load', () => {
                resolve(image);
            });
            image.src = url;
        });
    }

    detectCollison() {
        var y = this.bird.birdY;
        pipes.forEach(pipe => {
            if (this.birdX + this.birdImage.width >= pipe.x && this.birdX <= pipe.x + this.pipeNorthImage.width) {
                if ((y <= pipe.y + this.pipeNorthImage.height ||
                    y >= pipe.y + this.pipeNorthImage.height + constant) ||
                    (y + this.birdImage.height > this.canvas.clientHeight - this.ground.height)) {
                    clearInterval(this.gameOn);
                    this.gameOver = true;
                    this.gameOverMenuDisplay();
                }
            } else if (y + this.birdImage.height > this.canvas.clientHeight - this.ground.height) {
                clearInterval(this.gameOn);
                this.gameOver = true;
                this.gameOverMenuDisplay();
            }
            if (pipe.x + this.pipeNorthImage.width == this.birdX) {
                score++;
            }

        });
        this.context.fillStyle = "#000";
        this.context.font = "20px Arial";
        this.context.fillText("Score:" + score, 100, this.canvas.clientHeight - 20);

    }

    startGameMenu() {
        // startGameMenu = document.getElementById('gameStart');
        // var playGameButton = document.getElementById('play-game');
        // var that = this;
        // playGameButton.addEventListener('click', function () {
        //     console.log('a')
        //     startGameMenu.style.visibility = "hidden";

        // });
    }

    gameOverMenuDisplay() {
        gameOverMenu = document.getElementById('gameOver');
        gameOverMenu.style.visibility = "visible";
        var restart = document.getElementById('restart');
        var scoreDisplay = document.getElementById('score');
        scoreDisplay.innerHTML = 'Score: ' + score;

        restart.addEventListener('click', function () {
            location.reload();
        });
    }
}

let game = new Game().startGame();

function randomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

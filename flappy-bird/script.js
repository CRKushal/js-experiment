let pipes = [];
let score = 0;
let gameOverMenu;
let startGameMenu;
const GAP = 100;
let gravity = 0.1;
const GRAVITYINCREMENT = 0.05;
const SPACEBAR = 32;

/*
*======================================================================================================================
*bird class
*generates bird
*move bird 
* ======================================================================================================================
*/

class Bird {
    constructor(CONTEXT, BIRDIMAGE, birdX, birdY) {
        this.CONTEXT = CONTEXT;
        this.birdX = birdX;
        this.birdY = birdY;
        this.BIRDIMAGE = BIRDIMAGE;
    }

    draw() {
        this.CONTEXT.drawImage(this.BIRDIMAGE, this.birdX, this.birdY);
    }

    update() {
        gravity += GRAVITYINCREMENT;
        this.birdY += gravity;
        let that = this;
        document.body.onkeyup = e => {
            if (e.keyCode == SPACEBAR) {
                (!(gravity > -2)) ? gravity -= 2 : gravity = -2;
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

    constructor(CONTEXT, pipeNorth, pipeSouth, pipesPos, CANVAS) {
        this.pipeSouth = pipeSouth;
        this.pipeNorth = pipeNorth;
        this.CONTEXT = CONTEXT;
        this.pipesPos = pipesPos;
        this.INTERVAL = 50;
        this.CANVAS = CANVAS;
    }

    draw() {
        for (let i = 0; i < pipes.length; i++) {
            this.CONTEXT.drawImage(this.pipeNorth, pipes[i].x, pipes[i].y);
            this.CONTEXT.drawImage(this.pipeSouth, pipes[i].x, pipes[i].y + (this.pipeNorth.height + GAP));
            this.update(i);
        }
    }

    update(i) {

        pipes[i].x--;
        if (pipes[i].x == this.INTERVAL) {
            pipes.push({
                x: this.CANVAS.clientWidth,
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
*draw images on the CANVAS
*detect collison between bird and pipe
*count score
*display start and gameover menu
* ======================================================================================================================
*/

class Game {

    constructor() {
        this.CANVAS = document.getElementById('game-screen');
        this.CONTEXT = this.CANVAS.getContext('2d');
        this.birdX = 25;
        this.birdY = randomGenerator(125, 275);
        this.BACKGROUND;
        this.BIRDIMAGE;
        this.SOUND;
        this.PIPENORTHIMAGE;
        this.PIPESOUTHIMAGE;
        this.GROUND;
        this.gameOver = false;
        this.gameOn;
        this.bird;
    }

    startGame() {
        this.gameOver = false;
        this.drawImages();
    }

    async drawImages() {
        this.BACKGROUND = await this.loadImages('./images/background.png');
        this.GROUND = await this.loadImages('./images/ground.png');
        this.BIRDIMAGE = await this.loadImages('./images/flappy.png');
        this.PIPENORTHIMAGE = await this.loadImages('./images/pipeNorth.png');
        this.PIPESOUTHIMAGE = await this.loadImages('./images/pipeSouth.png');
        this.SOUND = await document.getElementById('myAudio');

        this.bird = new Bird(this.CONTEXT, this.BIRDIMAGE, this.birdX, this.birdY);

        pipes[0] = {
            x: this.CANVAS.clientWidth,
            y: 0
        }

        let pipe = new Pipe(this.CONTEXT, this.PIPENORTHIMAGE, this.PIPESOUTHIMAGE, pipes[0], this.CANVAS);
        this.update(pipe, this.bird);
    }

    update(pipe, bird) {
        this.gameOn = setInterval(() => {
            this.CONTEXT.drawImage(this.BACKGROUND, 0, 0, this.CANVAS.clientWidth, this.CANVAS.clientHeight);
            pipe.draw();
            this.CONTEXT.drawImage(this.GROUND, 0, this.CANVAS.clientHeight - this.GROUND.height);
            bird.draw();
            bird.update();
            this.detectCollison();
        }, 10);
    }

    loadImages(url) {
        return new Promise(resolve => {
            const IMAGE = new Image();
            IMAGE.addEventListener('load', () => {
                resolve(IMAGE);
            });
            IMAGE.src = url;
        });
    }

    detectCollison() {
        let y = this.bird.birdY;
        pipes.forEach(pipe => {

            if (this.birdX + this.BIRDIMAGE.width >= pipe.x && this.birdX <= pipe.x + this.PIPENORTHIMAGE.width) {

                if ((y <= pipe.y + this.PIPENORTHIMAGE.height ||
                    y + this.BIRDIMAGE.height >= pipe.y + this.PIPENORTHIMAGE.height + GAP) ||
                    (y + this.BIRDIMAGE.height > this.CANVAS.clientHeight - this.GROUND.height)) {
                    clearInterval(this.gameOn);
                    this.gameOver = true;
                    this.gameOverMenuDisplay();
                }

            } else if (y + this.BIRDIMAGE.height > this.CANVAS.clientHeight - this.GROUND.height) {
                clearInterval(this.gameOn);
                this.gameOver = true;
                this.gameOverMenuDisplay();
            }

            if (pipe.x + this.PIPENORTHIMAGE.width == this.birdX) {
                score++;
                this.SOUND.play();
            }

        });
        this.CONTEXT.fillStyle = "#000";
        this.CONTEXT.font = "20px Arial";
        this.CONTEXT.fillText("Score:" + score, 100, this.CANVAS.clientHeight - 20);

    }

    gameOverMenuDisplay() {

        gameOverMenu = document.getElementById('gameOver');
        gameOverMenu.style.visibility = "visible";

        const RESTART = document.getElementById('restart');
        const SCOREDISPLAY = document.getElementById('score');
        SCOREDISPLAY.innerHTML = 'Score: ' + score;

        RESTART.addEventListener('click', function () {
            location.reload();
        });
    }
}

let game = new Game().startGame();

function randomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

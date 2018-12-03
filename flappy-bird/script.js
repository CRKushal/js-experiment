var pipes = [];

class Bird {
    constructor(context, birdImage, birdX, birdY, canvas) {
        this.context = context;
        this.birdX = birdX;
        this.birdY = birdY;
        this.birdImage = birdImage;
        this.canvas = canvas;
        this.gravity = 1;
    }

    draw() {
        this.context.drawImage(this.birdImage, this.birdX, this.birdY);
    }

    update() {
        this.birdY += this.gravity;
        var that = this;
        document.body.onkeyup = function (e) {
            if (e.keyCode == 32) {
                console.log(that.birdY)
                that.birdY -= 40;
            }
        }
    }

    detectCollison() {
        if (this.birdY == this.canvas.clientHeight - 118) {
            console.log('collison')
        } else if (this.birdY == 0) {
            console.log('collided');
        }

        pipes.forEach(pipe => {
            if (this.birdX == pipe.x) {
                console.log('collison')
            } else if (this.birdY == pipe.height) {
                console.log('a');
            }
        });
    }
}


class Pipe {

    constructor(context, pipeNorth, pipeSouth, pipesPos, canvas) {
        this.pipeSouth = pipeSouth;
        this.pipeNorth = pipeNorth;
        this.context = context;
        this.pipesPos = pipesPos;
        this.interval = 50;
        this.canvas = canvas;
        console.log(this.canvas.clientWidth);
    }

    draw() {
        for (let i = 0; i < pipes.length; i++) {
            this.context.drawImage(this.pipeNorth, pipes[i].x, pipes[i].y);
            this.context.drawImage(this.pipeSouth, pipes[i].x, pipes[i].y + (this.pipeNorth.height + 85));
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

    update() {

    }
}


class Game {
    constructor() {
        this.canvas = document.getElementById('game-screen');
        this.context = this.canvas.getContext('2d');
        this.birdX = 25;
        this.birdY = 125;
        this.background;
        this.birdImage;
        this.pipeNorthImage;
        this.pipeSouthImage;
        this.ground;
        this.startGame();
    }

    startGame() { this.drawImages(); }

    async drawImages() {
        this.background = await this.loadImages('./images/background.png');
        this.ground = await this.loadImages('./images/ground.png');
        this.birdImage = await this.loadImages('./images/flappy.png');
        this.pipeNorthImage = await this.loadImages('./images/pipeNorth.png');
        this.pipeSouthImage = await this.loadImages('./images/pipeSouth.png');

        let bird = new Bird(this.context, this.birdImage, this.birdX, this.birdY, this.canvas);

        pipes[0] = {
            x: this.canvas.clientWidth,
            y: 0
        }

        let pipe = new Pipe(this.context, this.pipeNorthImage, this.pipeSouthImage, pipes[0], this.canvas);
        this.update(pipe, bird);
    }

    update(pipe, bird) {
        setInterval(() => {
            this.context.drawImage(this.background, 0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
            pipe.draw();
            this.context.drawImage(this.ground, 0, this.canvas.clientHeight - this.ground.height);
            bird.draw();
            bird.update();
            pipe.update();
            bird.detectCollison();
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
}

let game = new Game();
console.log(game);

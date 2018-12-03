const canvas = document.getElementById('game-screen');
const context = canvas.getContext('2d');

//load images

const bird = new Image();
const background = new Image();
const ground = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

//images source
background.src = '/images/background.png';
ground.src = './images/ground.png';
bird.src = './images/flappy.png';
pipeNorth.src = '/images/pipeNorth.png';
pipeSouth.src = '/images/pipeSouth.png';

var gap = 85;
var birdX = 40;
var birdY = 150;
var gravity = 0.5;
var pipeSouthPos = pipeNorth.height + gap;
var interval = 100;

// document.addEventListener("keydown", moveUp);

// function moveUp() {
//     birdY -= 20;
// }

var pipes = [];

pipes[0] = {
    x: canvas.clientWidth,
    y: 0
}

function draw() {

    context.drawImage(background, 0, 0, canvas.clientWidth, canvas.clientHeight);

    for (let i = 0; i < pipes.length; i++) {
        context.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
        context.drawImage(pipeSouth, pipes[i].x, pipes[i].y + (pipeNorth.height + gap));
        pipes[i].x--;

        if (pipes[i].x == interval) {
            console.log();
            pipes.push({
                x: canvas.clientWidth,
                y: Math.floor((Math.random() * pipeNorth.height) - pipeNorth.height)
            });
        } else if (pipes[i].x < 0) {
            pipes.splice(0, 1)
        }
    }
    context.drawImage(ground, 0, canvas.clientHeight - ground.height);
    context.drawImage(bird, birdX, birdY);
    // birdY += gravity;

    // collison detection


}
setInterval(draw, 10);
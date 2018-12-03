var slide = document.getElementById('slider-container');
var next = document.getElementById('next');
var previous = document.getElementById('previous');
var dots = document.getElementsByTagName('li');

var x = 0;
var speed = 2;
var flag = false;
var newSpeed = 5;

var running;
var eachInterval;
var timeOut;

function run() {
    running = setInterval(update, 10);
}
function update() {
    slide.style.left = -x + 'px';
    x += speed;
    if (x == 0 || x == 800) {
        if (x == 0) {
            speed = 2;
        }
        clearInterval(running);
        timeOut = setTimeout(run, 2000);
    } else if (x == 1600) {
        speed = -2;
        clearInterval(running);
        timeOut = setTimeout(run, 2000);
    }
}

next.addEventListener('click', function () {
    clearInterval(running);
    clearInterval(nextInterval);
    clearInterval(timeOut);
    if ((x >= 0 && x <= 800) || (x >= 800 && x < 1600)) {
        console.log(x);
        var nextInterval = setInterval(function () {
            slide.style.left = -x + 'px';
            x += speed;
            if (x == 800 || x == 1600) {
                clearInterval(nextInterval);
                setTimeout(run, 2000);
                if (x == 1600) speed = -2;
            }
        });
    } else {
        console.log('hello world');
    }
});


previous.addEventListener('click', function () {
    previousSlide();
});


// function nextSlide() {
//     clearInterval(running);
//     eachInterval = setInterval(function () {
//         slide.style.left = -x + 'px';
//         x += newSpeed;
//     });
//     while (x === 800) {
//         clearInterval(eachInterval);
//         setTimeout(run, 2000);
//     }

// }
function previousSlide() {
    speed = -2;
    // if (x <= 2400 && x >= 1600) {
    //     x = 800 + speed;
    //     slide.style.left = -x + 'px';
    // } else if (x <= 1600 && x >= 800) {
    //     x = 0;
    //     slide.style.left = -x + 'px';
    // }
}

run();

// function Slider() {
//     var slide = document.getElementById('slider-container');
//     var next = document.getElementById('next');

//     var x = 0;
//     var speed = 2;
//     var flag = false;

//     function run() {
//         running = setInterval(show, 10);
//     }
//     function show() {
//         slide.style.left = -x + 'px';
//         x += speed;
//         if (x == 0 || x == 800) {
//             if (x == 0) {
//                 speed = 2;
//             }
//             clearInterval(running);
//             setTimeout(run, 2000);
//         } else if (x == 1600) {
//             clearInterval(running);
//             speed = -2;
//             setTimeout(run, 2000);
//         }
//     }
//     next.addEventListener('click', function () {
//         changeSlide();
//     });

//     function changeSlide() {
//         if (x >= 0 && x < 800) {
//             x = 800;
//         } else if (x >= 800 && x < 1600) {
//             x = 1600;
//         } else if (x == 1600) {
//             x = 0;
//         }


//     }
// }
// let slider = new Slider();
// slider.run();
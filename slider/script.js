function Wrapper(containerId, timer) {
    var container = document.getElementById(containerId);
    var slider = document.getElementById('image-container');
    var images = document.getElementsByTagName('img');
    var next = document.getElementById('next');
    var previous = document.getElementById('previous');
    var dots = document.getElementsByClassName('dots');

    var width = container.clientWidth;
    var height = container.clientHeight;

    slider.style.width = width * images.length + 'px';
    slider.style.height = height;

    var mainInterval;
    var initialPos = 0;
    var speed = 1;
    var direction = -1;
    var index = 0;
    var way = 1;
    var pause;
    var clickedSpeed = 3;
    var nextInterval;
    var previousInterval;

    start();

    function start() {
        mainInterval = setInterval(slide, timer);
    }

    function slide() {
        changeDotsColor();
        slider.style.left = initialPos + 'px';
        if (initialPos == 0) {
            direction = -1;
            way = 1;
        } else if (initialPos == ((images.length - 1) * width * direction)) {
            direction = 1;
            way = -1;
        }
        if ((initialPos == index * width * direction) || (initialPos == -(index * width * direction))) {
            //(initialPos == 0 || initialPos == 800 || initialPos == 1600) || (initialPos == 0 || initialPos == -800 || initialPos == -1600)
            clearInterval(mainInterval);
            clearInterval(nextInterval);
            clearInterval(previousInterval);
            pause = setTimeout(start, 2000);
            if (direction == -1) {
                index++
            } else {
                index--;
            }
        }
        initialPos += speed * direction;
    }

    next.addEventListener('click', function () {
        if (way == -1) {
            way = 1;
            direction = -1;
            index++;
        }
        clearInterval(mainInterval);
        clearTimeout(pause);
        clearInterval(nextInterval);
        nextInterval = setInterval(slide)
    });

    previous.addEventListener('click', function () {
        if (way == 1) {
            way = -1;
            direction = 1;
            index--;
        }
        clearInterval(mainInterval);
        clearTimeout(pause);
        clearInterval(previousInterval);
        previousInterval = setInterval(slide)
    });


    function changeDotsColor() {
        for (let i = 0; i < dots.length; i++) {
            if ((initialPos == i * width * direction * way)) {
                dots[i].classList.add('active');
            }
            dots[i].classList.remove('acitve');
        }
    }
}
let wrapper = new Wrapper('container', 10);
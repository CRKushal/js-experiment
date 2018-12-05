class Word {

    constructor() {
        this.x = randomGenerator(25, 550);
        this.y = 10;
        this.letters;
        this.generateRandomWords();
        this.mainSpan = document.createElement('span');
        this.span;
        this.container = document.getElementById('container');
        this.matchedLen = 0;
        this.childs = [];
    }

    generateRandomWords() {
        let words = this.requiresWords();
        let index = randomGenerator(0, 11);
        let randomWords = words[index];
        this.letters = randomWords.split('');
    }

    drawWords() {
        for (let i = 0; i < this.letters.length; i++) {
            this.span = document.createElement('span');
            this.span.innerHTML = this.letters[i];
            this.span.style.fontSize = '20px';
            this.childs.push(this.span);
            this.mainSpan.appendChild(this.span);
            this.mainSpan.style.position = "absolute";
            this.mainSpan.style.top = `${this.y}px`;
            this.mainSpan.style.left = `${this.x}px`;
        }
        this.container.appendChild(this.mainSpan);
    }

    moveWords() {
        this.y++;
        this.mainSpan.style.top = this.y + 'px';
    }

    requiresWords() {
        let words = [
            'hello',
            'hi',
            'abc',
            'name',
            'age',
            'kushal',
            'asim',
            'football',
            'basketball',
            'volleyball',
            'futshal',
            'kathmandu',
            'pokhara'
        ];
        return words;
    }

    match(charToBeMatched) {
        var c = charToBeMatched;
        if (this.letters[this.matchedLen] == c) {
            this.childs[this.matchedLen].classList.add('highlight');
            this.matchedLen++;
            for (let i = 0; i < this.matchedLen; i++) {
                if (!this.childs[i].classList.contains('highlight')) {
                    this.childs[i].classList.add('highlight');
                }
                else {
                    break;
                }
            }
            return true;
        } else {
            for (let i = 0; i < this.matchedLen; i++) {
                this.childs[i].classList.remove('highlight');
            }
            return false;
        }
    }
    matchAll() {
        for (let i = 0; i < this.matchedLen; i++) {
            this.childs[i].classList.add('highlight');
        }
    }
    remove() {
        this.container.removeChild(this.mainSpan);
    }
    eraseLastMatch() {
        if (this.matchedLen == 0) {
            return;
        }
        this.matchedLen--;
        this.childs[this.matchedLen].classList.remove('highlight');
    }
}

var that;
class Game {
    constructor() {
        this.words = [];
        this.matchedWords = [];
        this.input = document.getElementById('input-text');
        this.inputText = '';
        this.input.value = this.inputText;
        this.matchedletters = false;
        that = this;
        this.gameLoop;

    }

    startGame() {
        let counter = 0;

        document.addEventListener('keydown', this.inputController);
        this.gameLoop = setInterval(() => {
            counter++;

            if (counter % 200 == 0) {
                let word = new Word();
                word.drawWords();
                this.words.push(word);
                if (this.inputText == '') {
                    this.matchedWords.push(word);
                } else {
                    for (let i = 0; i < this.inputText.length; i++) {
                        let letterToBeMatched = this.inputText.charAt(i);
                        if (word.match(letterToBeMatched)) {
                            continue;
                        } else {
                            break;
                        }
                    }
                }
            }

            this.words.forEach(value => {
                value.moveWords()
            });
            if (this.words.length > 0 && this.words[0].y >= 600) {
                this.gameOver();
            }
        }, 10);
    }

    gameOver() {
        clearInterval(this.gameLoop);
    }

    inputController(e) {
        let char = e.key;
        console.log(e);
        let matched = false;

        if (char) {
            that.inputText += char;
            that.input.value = that.inputText;

            that.matchedWords = that.matchedWords.filter((val) => {
                console.log(val);
                let match = val.match(char);
                if (val.matchedLen >= val.letters.length) {
                    let index = that.words.indexOf(val);
                    val.remove();
                    matched = true;
                    that.inputText = '';
                }
                return match;
                if (matched) {
                    that.resetInput();
                }
            });
        } else if (e.keyCode == 8) {
            return false;
        }
    }

    resetInput() {
        that.inputText = '';
        that.input.value = that.inputText;
        that.matchedWords = [];
        for (let i = 0; i < that.words.length; i++) {
            if (that.words[i].matchedLen > 0) {
                that.word[i].eraseLastMatch();
            }
            that.matchedWords.push(that.words[i]);
        }
    }
}

let game = new Game().startGame();


function randomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


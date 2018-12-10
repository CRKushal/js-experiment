class Word {

    constructor() {
        this.x = randomGenerator(300, 800);
        this.y = 10;
        this.letters;
        this.generateRandomWords();
        this.mainSpan = document.createElement('span');
        this.span;
        this.container = document.getElementById('container');
        this.matchedLength = 0;
        this.childs = [];
    }

    generateRandomWords() {
        let words = this.requiredWords();
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

    requiredWords() {
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

        if (this.letters[this.matchedLength] == charToBeMatched) {
            this.childs[this.matchedLength].classList.add('active');
            this.matchedLength++;
            for (let i = 0; i < this.matchedLength; i++) {
                if (!this.childs[i].classList.contains('active')) {
                    this.childs[i].classList.add('active');
                }
                else {
                    break;
                }
            }
            return true;
        } else {
            for (let i = 0; i < this.matchedLength; i++) {
                this.childs[i].classList.remove('active');
            }
            return false;
        }
    }

    matchAll() {
        for (let i = 0; i < this.matchedLength; i++) {
            this.childs[i].classList.add('active');
        }
    }

    erase() {
        if (this.matchedLength == 0) { return; }
        this.matchedLength--;
        this.childs[this.matchedLength].classList.remove('active');
    }

    removeItem() {
        document.getElementById('container').removeChild(this.mainSpan);
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
        this.characters = [];
        this.keySpan;
        this.keyMap = {};
    }

    startGame() {
        let counter = 0;

        this.drawKeyboard();

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

            if (this.words.length > 0 && this.words[0].y >= 300) {
                console.log(this.words[0]);
                this.gameOver();
            }
        }, 10);
    }

    drawKeyboard() {
        let keyboard = document.getElementById('keyboard');
        let character = "qwertyuiopasdfghjklzxcvbnm";
        let charArray = character.split("");
        let container = document.getElementById('container');
        for (let i = 0; i < charArray.length; i++) {
            this.keySpan = document.createElement('span');
            this.keySpan.innerHTML = charArray[i];
            this.characters.push(charArray[i]);
            this.keyMap[charArray[i]] = i;
            keyboard.appendChild(this.keySpan);
        }
        container.appendChild(keyboard);
    }

    gameOver() {
        clearInterval(this.gameLoop);

    }

    inputController(event) {
        let matched = false;
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            var key = String.fromCharCode(97 + (event.keyCode - 65));
            that.keyBoardHandler(key);
            if (key) {
                that.inputText += key;
                that.input.value = that.inputText;

                that.matchedWords = that.matchedWords.filter((val) => {

                    let match = val.match(key);
                    if (val.matchedLength >= val.letters.length) {
                        let index = that.words.indexOf(val);
                        val.removeItem();

                        var temp = that.words.indexOf(val);
                        that.words.splice(temp, 1);

                        matched = true;
                        that.inputText = '';
                    }
                    return match;

                });

                if (matched) {
                    that.resetInput();
                }
            }
        } else if (event.keyCode == 8) {
            that.inputText = that.inputText.slice(0, -1);
            that.input.value = that.inputText;
            that.matchedWords.forEach(function (item, index) {
                item.erase();
            });
        } else {
            console.log('not allowed');
        }
    }

    keyBoardHandler(key) {
        var index = that.keyMap[key];
        document.getElementById('keyboard').children[index].style.background = 'lightgreen';
        setTimeout(function () {
            document.getElementById('keyboard').children[index].style.background = 'none';
        }, 100);
    }

    resetInput() {
        that.inputText = '';
        that.input.value = that.inputText;
        that.matchedWords = [];
        for (let i = 0; i < that.words.length; i++) {
            while (that.words[i].matchedLength > 0) {
                that.words[i].erase();
            }
            that.matchedWords.push(that.words[i]);
        }
    }
}

let game = new Game().startGame();


function randomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


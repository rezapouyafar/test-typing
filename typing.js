const text = document.querySelector('#text');
const textarea = document.querySelector('#textarea');
const countWord = document.querySelector('#count_word input');
const hoursElement = document.querySelector('#hours');
const minutesElement = document.querySelector('#minutes');
const secondsElement = document.querySelector('#seconds');
const fixedWrapper = document.querySelector('#fixed_wrapper');
const again = document.querySelector('#again');
const finalTime = document.querySelector('#finalTime');
const finalCurrect = document.querySelector('#finalCurrect');
const finalWrong = document.querySelector('#finalWrong');

let defualText;
let setTime;
let hours = 0;
let minutes = 0;
let seconds = 0;
let currectAnswer = 0;
let wrongAnswer = 0;

// choosing text for type...
function createText(muchWord) {
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let words = muchWord;
    let text = '';
    for (let i = 0; i < words; i++) {
        let word = '';
        let lengthWord = Math.floor(Math.random() * 5) + 3;
        for (let j = 0; j < lengthWord; j++) {
            let takenWord = Math.floor(Math.random() * 26);
            word += `<span>${letters[takenWord]}</span>`;
        }
        text += word + "<span> </span>";
    }
    return text;
}

function setWord(count = 5) {
    defualText = createText(count);
    text.innerHTML = defualText;
    text.lastElementChild.remove();

    clearInterval(setTime);
    hours = 0;
    minutes = 0;
    seconds = 0;
    formatingTime(hours, minutes, seconds);
}

setWord();

countWord.addEventListener('change', function () {
    textarea.value = '';
    setWord(this.value);
});


// validation text...
textarea.addEventListener('keyup', validateText);
validateText();
function validateText() {
    let childrenText = text.children;
    let textareaValue = textarea.value;

    for (let j = 0; j < childrenText.length; j++) {
        childrenText[j].classList.remove('green');
        childrenText[j].classList.remove('red');
        childrenText[j].classList.remove('pointer');
    }

    if (textareaValue.length == 0) {
        childrenText[0].classList.add('pointer');
    } else if (textareaValue.length < childrenText.length) {
        childrenText[textareaValue.length].classList.add('pointer');
    } else {
        textarea.value = textareaValue.substring(0, childrenText.length);
        textareaValue = textarea.value;

        clearInterval(setTime);
        setTimeout(showResult, 10);
    }

    // console.log(textarea.value.length, childrenText.length);

    for (let i = 0; i < textareaValue.length; i++) {
        if (textareaValue.length <= childrenText.length) {
            if (textareaValue[i] === childrenText[i].innerHTML) {
                childrenText[i].classList.add('green');
            } else {
                childrenText[i].classList.add('red');
            }
        }
    }

}

textarea.addEventListener('focus', function () {
    if (!(hours > 0 || minutes > 0 || seconds > 0)) {
        setTimer();
    }
});

function setTimer() {
    setTime = setInterval(startTimer, 1000);
}

function startTimer() {
    seconds++;

    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes == 60) {
        minutes = 0;
        hours++;
    }
    formatingTime(hours, minutes, seconds);
}

function formatingTime(hours = 0, minutes = 0, seconds = 0) {
    hoursElement.innerHTML = (hours < 10) ? `0${hours}` : hours;
    minutesElement.innerHTML = (minutes < 10) ? `0${minutes}` : minutes;
    secondsElement.innerHTML = (seconds < 10) ? `0${seconds}` : seconds;
}

function showResult() {
    fixedWrapper.style.display = 'block';
    let hoursPlace = (hours < 10) ? `0${hours}` : hours;
    let minutesPlace = (minutes < 10) ? `0${minutes}` : minutes;
    let secondsPlace = (seconds < 10) ? `0${seconds}` : seconds;
    finalTime.innerHTML = `${hoursPlace}:${minutesPlace}:${secondsPlace}`;

    let childrenText = text.children;
    for (let i = 0; i < childrenText.length; i++) {
        if (childrenText[i].classList.contains('green')) {
            currectAnswer++;
        } else {
            wrongAnswer++;
        }
    }

    finalCurrect.innerHTML = currectAnswer;
    finalWrong.innerHTML = wrongAnswer;
}


/*  again  */
again.addEventListener('click', () => window.location.reload());
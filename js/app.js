document.addEventListener("DOMContentLoaded", function() {
    require('../css/reset.css');
    require('../css/style.css');

    const app = document.getElementById('app'),
        increaseMinBtn = app.querySelector('#increaseMinBtn'),
        decreaseMinBtn = app.querySelector('#decreaseMinBtn'),
        increaseSecBtn = app.querySelector('#increaseSecBtn'),
        decreaseSecBtn = app.querySelector('#decreaseSecBtn'),
        startBtn = app.querySelector('#startBtn'),
        resetBtn = app.querySelector('#resetBtn'),
        defaultBtn = app.querySelector('#defaultBtn'),
        workBtn = app.querySelector('#workBtn'),
        breakBtn = app.querySelector('#breakBtn'),
        timer = app.querySelector('#timer'),
        timerMin = app.querySelector('#timerMin'),
        timerSec = app.querySelector('#timerSec'),
        timerTitle = app.querySelector('#timerTitle'),
        buttons = app.querySelectorAll('.jsButton'),
        alarmSound = new Audio('sounds/alarm.mp3');
    let userMinBreak = '05',
        userSecBreak = '00',
        userMinWork = '20',
        userSecWork = '00',
        counting = '';

    function toSeconds() {
        let minutesToSeconds = parseInt(timerMin.innerText) * 60;
        return minutesToSeconds + parseInt(timerSec.innerText);
    }

    function toMinutes(sec) {
        let seconds = sec % 60;
        let minutes = (sec - seconds) / 60;
        return [minutes, seconds];
    }

    function showTime(min, sec) {
        if (min.toString().length < 2) {
            timerMin.innerText = '0' + min;
        } else {
            timerMin.innerText = min;
        }
        timerSec.innerText = ('0' + sec).substr(-2, 2);
    }

    function increaseMin() {
        let secondsCount = toSeconds() + 60;
        let time = toMinutes(secondsCount);
        showTime(time[0], time[1]);
    }

    function decreaseMin() {
        let secondsCount = toSeconds();
        if (secondsCount >= 60) {
            secondsCount -= 60;
            let time = toMinutes(secondsCount);
            showTime(time[0], time[1]);
        }
    }

    function increaseSec() {
        let secondsCount = toSeconds() + 5;
        let time = toMinutes(secondsCount);
        showTime(time[0], time[1]);
    }

    function decreaseSec() {
        let secondsCount = toSeconds();
        if (secondsCount > 0) {
            secondsCount -= 5;
            let time = toMinutes(secondsCount);
            showTime(time[0], time[1]);
        }
    }

    function removeEvents() {
        increaseMinBtn.removeEventListener('click', increaseMin);
        decreaseMinBtn.removeEventListener('click', decreaseMin);
        increaseSecBtn.removeEventListener('click', increaseSec);
        decreaseSecBtn.removeEventListener('click', decreaseSec);
        workBtn.removeEventListener('click', workMode);
        breakBtn.removeEventListener('click', breakMode);
        startBtn.removeEventListener('click', startTimer);
    }

    function countdownLayout() {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.add("inactive");
        }
        timer.classList.add("active");
        timerTitle.classList.add("active");
    }

    function startCountdown() {
        counting = setInterval(() => {
            let secondsCount = toSeconds() - 1;
            let time = toMinutes(secondsCount);
            showTime(time[0], time[1]);
            if (secondsCount === 0) {
                clearInterval(counting);
                alarmSound.play();
            }
        }, 1000);
    }

    function isWorkMode() {
        return timerTitle.dataset.id === "work";
    }

    function saveUserSettings() {
        if (isWorkMode()) {
            userMinWork = timerMin.innerText;
            userSecWork = timerSec.innerText;
        } else {
            userMinBreak = timerMin.innerText;
            userSecBreak = timerSec.innerText;
        }
    }

    function startTimer() {
        if (toSeconds() > 0) {
            countdownLayout();
            removeEvents();
            saveUserSettings();
            startCountdown();
        }
    }

    function settingsLayout() {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("inactive");
        }
        timer.classList.remove("active");
        timerTitle.classList.remove("active");
    }

    function resetTimer() {
        settingsLayout();
        addEvents();
        clearInterval(counting);
        alarmSound.pause();

        if (isWorkMode()) {
            showTime(userMinWork, userSecWork);
        } else {
            showTime(userMinBreak, userSecBreak);
        }
    }

    function defaultTimer() {
        settingsLayout();
        addEvents();
        clearInterval(counting);
        alarmSound.pause();

        if (isWorkMode()) {
            showTime(20, 0);
        } else {
            showTime(5, 0);
        }
    }

    function workModeLayout() {
        timerTitle.dataset.id = 'work';
        timerTitle.innerText = 'Work';
        timerMin.innerText = userMinWork;
        timerSec.innerText = userSecWork;
    }

    function breakModeLayout() {
        timerTitle.dataset.id = 'break';
        timerTitle.innerText = 'Break';
        timerMin.innerText = userMinBreak;
        timerSec.innerText = userSecBreak;
    }

    function workMode() {
        saveUserSettings();
        workModeLayout();
    }

    function breakMode() {
        saveUserSettings();
        breakModeLayout();
    }

    function addEvents() {
        increaseMinBtn.addEventListener('click', increaseMin);
        decreaseMinBtn.addEventListener('click', decreaseMin);
        increaseSecBtn.addEventListener('click', increaseSec);
        decreaseSecBtn.addEventListener('click', decreaseSec);
        startBtn.addEventListener('click', startTimer);
        workBtn.addEventListener('click', workMode);
        breakBtn.addEventListener('click', breakMode);
    }

    addEvents();
    resetBtn.addEventListener('click', resetTimer);
    defaultBtn.addEventListener('click', defaultTimer);

});

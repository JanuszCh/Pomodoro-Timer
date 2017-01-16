document.addEventListener("DOMContentLoaded", function() {
    require('../css/reset.css');
    require('../css/style.css');

    const app = document.getElementById('app');
    const increaseMinBtn = app.querySelector('#increaseMinBtn');
    const decreaseMinBtn = app.querySelector('#decreaseMinBtn');
    const increaseSecBtn = app.querySelector('#increaseSecBtn');
    const decreaseSecBtn = app.querySelector('#decreaseSecBtn');
    const startBtn = app.querySelector('#startBtn');
    const resetBtn = app.querySelector('#resetBtn');
    const defaultBtn = app.querySelector('#defaultBtn');
    const workBtn = app.querySelector('#workBtn');
    const breakBtn = app.querySelector('#breakBtn');
    const timer = app.querySelector('#timer');
    const timerMin = app.querySelector('#timerMin');
    const timerSec = app.querySelector('#timerSec');
    const timerTitle = app.querySelector('#timerTitle');
    const buttons = app.querySelectorAll('.jsButton');
    const alarmSound = new Audio('sounds/alarm.mp3');
    let userMinBreak = '05';
    let userSecBreak = '00';
    let userMinWork = '20';
    let userSecWork = '00';
    let counting = '';

    function toSeconds() {
        let minutesToSeconds = parseInt(timerMin.innerText) * 60;
        let secondsCount = minutesToSeconds + parseInt(timerSec.innerText);
        return secondsCount;
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

    function startTimer() {
        if (toSeconds() > 0) {
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.add("inactive");
            }
            timer.classList.add("active");
            timerTitle.classList.add("active");

            increaseMinBtn.removeEventListener('click', increaseMin);
            decreaseMinBtn.removeEventListener('click', decreaseMin);
            increaseSecBtn.removeEventListener('click', increaseSec);
            decreaseSecBtn.removeEventListener('click', decreaseSec);
            workBtn.removeEventListener('click', workMode);
            breakBtn.removeEventListener('click', breakMode);
            startBtn.removeEventListener('click', startTimer);

            if (timerTitle.dataset.id === "work") {
                userMinWork = timerMin.innerText;
                userSecWork = timerSec.innerText;
            } else {
                userMinBreak = timerMin.innerText;
                userSecBreak = timerSec.innerText;
            }

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
    }

    resetBtn.addEventListener('click', () => {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("inactive");
        }

        timer.classList.remove("active");
        timerTitle.classList.remove("active");

        activateButtons();
        clearInterval(counting);
        alarmSound.pause();

        if (timerTitle.dataset.id === "work") {
            showTime(userMinWork, userSecWork);
        } else {
            showTime(userMinBreak, userSecBreak);
        }
    });

    defaultBtn.addEventListener('click', () => {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("inactive");
        }

        timer.classList.remove("active");
        timerTitle.classList.remove("active");

        activateButtons();
        clearInterval(counting);
        alarmSound.pause();

        if (timerTitle.dataset.id === "work") {
            showTime(20, 0);
        } else {
            showTime(5, 0);
        }
    });

    function workMode() {
        if (timerTitle.dataset.id === "break") {
            timerTitle.dataset.id = 'work';
            timerTitle.innerText = "Work";
            userMinBreak = timerMin.innerText;
            userSecBreak = timerSec.innerText;
            timerMin.innerText = userMinWork;
            timerSec.innerText = userSecWork;
        }
    }

    function breakMode() {
        if (timerTitle.dataset.id === "work") {
            timerTitle.dataset.id = 'break';
            timerTitle.innerText = "Break";
            userMinWork = timerMin.innerText;
            userSecWork = timerSec.innerText;
            timerMin.innerText = userMinBreak;
            timerSec.innerText = userSecBreak;
        }
    }

    function activateButtons() {
        increaseMinBtn.addEventListener('click', increaseMin);
        decreaseMinBtn.addEventListener('click', decreaseMin);
        increaseSecBtn.addEventListener('click', increaseSec);
        decreaseSecBtn.addEventListener('click', decreaseSec);
        startBtn.addEventListener('click', startTimer);
        workBtn.addEventListener('click', workMode);
        breakBtn.addEventListener('click', breakMode);
    }
    activateButtons();
});

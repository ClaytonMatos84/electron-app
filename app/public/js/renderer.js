const inputHours = document.getElementById('hours');
const inputMinutes = document.getElementById('minutes');
const inputSeconds = document.getElementById('seconds');
let secondsInterval;
let hasStarted = false;

function init() {
    initInputHours();
    initInputMinutes();
    initInputSeconds();
}

function initInputHours() {
    inputHours.addEventListener('input', (event) => {
        if (event.target.value < 10) {
            inputHours.value = '0' + event.target.value;
        } else if (event.target.value > 23) {
            inputHours.value = '23';
        }
    });
}

function initInputMinutes() {
    inputMinutes.addEventListener('input', (event) => {
        if (event.target.value < 10) {
            inputMinutes.value = '0' + event.target.value;
        } else if (event.target.value > 59) {
            inputMinutes.value = '59';
        }
    });
}

function initInputSeconds() {
    inputSeconds.addEventListener('input', (event) => {
        if (event.target.value < 10) {
            inputSeconds.value = '0' + event.target.value;
        } else if (event.target.value > 59) {
            inputSeconds.value = '59';
        }
    });
}

async function onClickStart() {
    if (inputSeconds.value === '00' && inputMinutes.value === '00' && inputHours.value === '00') return;

    hasStarted = true;
    while (hasStarted && (parseInt(inputSeconds.value) > 0 ||
            parseInt(inputMinutes.value) > 0 ||
            parseInt(inputHours.value) > 0)) {
        await _decreaseSeconds();
        await _decreaseMinutes();
        await _decreaseHours();
    }
}

function _decreaseSeconds() {
    return new Promise((resolve, reject) => {
        if (parseInt(inputSeconds.value) === 0) {
            return resolve();
        }

        let seconds = parseInt(inputSeconds.value);
        secondsInterval = setInterval(() => {
            if (!hasStarted) {
                clearInterval(secondsInterval);
                return resolve();
            }

            seconds--;
            inputSeconds.value = seconds < 10 ? '0' + seconds : seconds;
            if (seconds === 0) {
                clearInterval(secondsInterval);
                resolve();
            }
        }, 1000);
    });
}

function _decreaseMinutes() {
    return new Promise(async (resolve, reject) => {
        if (parseInt(inputSeconds.value) > 0) {
            return resolve();
        }

        let minutes = parseInt(inputMinutes.value);
        if (minutes > 0) {
            setTimeout(() => {
                if (!hasStarted) {
                    return resolve();
                }

                minutes--;
                inputMinutes.value = minutes < 10 ? '0' + minutes : minutes;
                inputSeconds.value = '59';
                resolve();
            }, 1000);
        } else {
            resolve();
        }

    });
}

function _decreaseHours() {
    return new Promise((resolve, reject) => {
        if (parseInt(inputMinutes.value) > 0 || parseInt(inputSeconds.value) > 0) {
            return resolve();
        }

        let hours = parseInt(inputHours.value);
        if (hours > 0) {
            setTimeout(() => {
                if (!hasStarted) {
                    return resolve();
                }

                hours--;
                inputHours.value = hours < 10 ? '0' + hours : hours;
                inputMinutes.value = '59';
                inputSeconds.value = '59';
                resolve();
            }, 1000);
        } else {
            resolve();
        }
    });
}

function onClickPause() {
    hasStarted = false;
}

function onClickReset() {
    hasStarted = false;
    inputHours.value = '00';
    inputMinutes.value = '00';
    inputSeconds.value = '00';
}

init();

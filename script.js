let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const lapList = document.getElementById('lap-list');

function timeToString(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function print(txt) {
    display.innerHTML = txt;
}

function startTimer() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            print(timeToString(elapsedTime));
        }, 10);
        running = true;

        document.getElementById("resetBtn").disabled = false;
        document.getElementById("lapBtn").disabled = false;
        document.getElementById("stopBtn").disabled = false;
    }
}

function stopTimer() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    print(timeToString(elapsedTime));
    lapList.innerHTML = '';
    running = false;

    document.getElementById("resetBtn").disabled = true;
    document.getElementById("lapBtn").disabled = true;
    document.getElementById("stopBtn").disabled = true;
}

function lapTimer() {
    if (running) {
        const li = document.createElement("li");
    li.textContent = timeToString(elapsedTime);
    document.getElementById("laps").appendChild(li);
    }
}

function toggleStartStop() {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    if (running) {
        stopBtn.style.display = 'none';
        startBtn.style.display = 'block';
    } else {
        startBtn.style.display = 'none';
        stopBtn.style.display = 'block';
    }
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('stopBtn').addEventListener('click', stopTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer); 
document.getElementById('lapBtn').addEventListener('click', lapTimer);
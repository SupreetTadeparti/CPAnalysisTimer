const thinkSection = document.getElementById("think-sw");
const codeSection = document.getElementById("code-sw");
const thinkTimeEl = document.querySelector("#think-sw > .sw__time");
const codeTimeEl = document.querySelector("#code-sw > .sw__time");
const startPauseBtn = document.getElementById("start-pause-btn");
const resetBtn = document.getElementById("reset-btn");
const startBtn = startPauseBtn.querySelector("#start-btn");
const pauseBtn = startPauseBtn.querySelector("#pause-btn");

// 0 - Paused
// 1 - Think
// 2 - Code
let timeState = 0;

let thinkTimeStart = 0;
let codeTimeStart = 0;

let thinkTimePauseStart = 0;
let codeTimePauseStart = 0;

let thinkTimeInterval = null;
let codeTimeInterval = null;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const updateStartTime = (startTime, timeEl) => {
  let ms = Date.now() - startTime;
  let sec = Math.floor(ms / 1000);
  let min = Math.floor(sec / 60);
  let hrs = Math.floor(min / 60);

  sec = sec % 60;
  min = min % 60;

  sec = sec.toString().padStart(2, "0");
  min = min.toString().padStart(2, "0");
  hrs = hrs.toString().padStart(2, "0");

  timeEl.textContent = `${hrs}:${min}:${sec}`;
};

const startTime = () => {
  if (timeState === 1) {
    thinkTimeStart += Date.now() - thinkTimePauseStart;

    thinkTimeStart = thinkTimeStart || Date.now();

    thinkTimePauseStart = 0;

    thinkTimeInterval = setInterval(() => {
      updateStartTime(thinkTimeStart, thinkTimeEl);
    }, 10);
  } else if (timeState === 2) {
    codeTimeStart += Date.now() - codeTimePauseStart;

    codeTimeStart = codeTimeStart || Date.now();

    codeTimePauseStart = 0;

    codeTimeInterval = setInterval(() => {
      updateStartTime(codeTimeStart, codeTimeEl);
    });
  }
};

const pauseTime = () => {
  if (timeState === 1) {
    clearInterval(thinkTimeInterval);
    thinkTimePauseStart = Date.now();
  } else if (timeState === 2) {
    clearInterval(codeTimeInterval);
    codeTimePauseStart = Date.now();
  }
};

const startPauseBtnClickHandle = () => {
  startBtn.classList.toggle("hidden");
  pauseBtn.classList.toggle("hidden");

  if (timeState !== 0) pauseTime();

  timeState = +(timeState === 0);

  if (timeState !== 0) startTime();
};

const resetBtnClickHandle = () => {
  if (timeState !== 0) {
    startBtn.classList.toggle("hidden");
    pauseBtn.classList.toggle("hidden");
  }

  pauseTime();

  timeState = 0;

  thinkTimeStart = 0;
  codeTimeStart = 0;

  thinkTimePauseStart = 0;
  codeTimePauseStart = 0;

  thinkTimeInterval = null;
  codeTimeInterval = null;

  thinkTimeEl.textContent = "00:00:00";
  codeTimeEl.textContent = "00:00:00";
};

const thinkSectionClickHandle = () => {
  if (timeState === 2) {
    pauseTime();
    timeState = 1;
    startTime();
  }
};

const codeSectionClickHandle = () => {
  if (timeState === 1) {
    pauseTime();
    timeState = 2;
    startTime();
  }
};

startPauseBtn.addEventListener("click", startPauseBtnClickHandle);
resetBtn.addEventListener("click", resetBtnClickHandle);
thinkSection.addEventListener("click", thinkSectionClickHandle);
codeSection.addEventListener("click", codeSectionClickHandle);

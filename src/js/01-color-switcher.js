const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let intervalId = null;

stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
  intervalId = setInterval(changeColor, 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);

  startBtn.disabled = false;
  stopBtn.disabled = true;
});

function changeColor() {
  const color = getRandomHexColor();
  body.setAttribute('style', `background: ${color}`);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

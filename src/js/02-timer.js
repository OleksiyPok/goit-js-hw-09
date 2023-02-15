const datetime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

const dateEnd = new Date('2022-02-11 12:00:00.000');
const timerID = setInterval(onTimerTick, 1000);

function onTimerTick() {
  const datetime = new Date();
  const diffTime = calculateDiffTime(datetime);
  showDiffTime(diffTime);
}

function calculateDiffTime(datetime) {
  const dMsFull = Math.abs(dateEnd - datetime);
  //   const dMseconds = Math.floor(dMsFull % 1000);
  const dSeconds = Math.floor((dMsFull / 1000) % 60);
  const dMinutes = Math.floor((dMsFull / (1000 * 60)) % 60);
  const dHours = Math.floor((dMsFull / (1000 * 60 * 60)) % 24);
  const dDays = Math.floor(dMsFull / (1000 * 60 * 60 * 24));

  return {
    days: dDays,
    hours: dHours,
    minutes: dMinutes,
    seconds: dSeconds,
  };
}

function showDiffTime({ days, hours, minutes, seconds }) {
  daysSpan.textContent = days;
  hoursSpan.textContent = hours;
  minutesSpan.textContent = minutes;
  secondsSpan.textContent = seconds;
}

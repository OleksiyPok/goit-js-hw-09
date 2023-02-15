const datetime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

const dateEnd = new Date('2023-02-15 15:02:00.000');
const timerID = setInterval(onTimerTick, 1000);

function onTimerTick() {
  const diffTime = calculateDTime(dateEnd - Date.now());
  // const diffTime = convertMs(dateEnd - Date.now());
  showTime(diffTime);
}

function calculateDTime(dms) {
  const dSeconds = Math.floor((dms / 1000) % 60);
  const dMinutes = Math.floor((dms / (1000 * 60)) % 60);
  const dHours = Math.floor((dms / (1000 * 60 * 60)) % 24);
  const dDays = Math.floor(dms / (1000 * 60 * 60 * 24));

  if (dms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: dDays,
    hours: dHours,
    minutes: dMinutes,
    seconds: dSeconds,
  };
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function showTime({ days, hours, minutes, seconds }) {
  daysSpan.textContent = days;
  hoursSpan.textContent = String(hours).padStart(2, '0');
  minutesSpan.textContent = String(minutes).padStart(2, '0');
  secondsSpan.textContent = String(seconds).padStart(2, '0');
}

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './../css/02-timer.css';

const datetime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
const text = '<p class="text">Left:</p>';
timer.insertAdjacentHTML('beforebegin', text);

const options = {
  // minDate: 'today',
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates[0]);
  },
};

startBtn.addEventListener('click', onClickStart);
startBtn.disabled = true;

const flatpickrObj = flatpickr(datetime, options);

function checkDate(selectedDate) {
  if (selectedDate <= Date.now()) {
    // alert('Please choose a date in the future');
    startBtn.disabled = true;
    Notify.failure('Please choose a date in the future');
    return;
  }
  startBtn.disabled = false;
}

function onClickStart() {
  const dateEnd = flatpickrObj.selectedDates[0].getTime();
  if (dateEnd <= Date.now()) {
    clearInterval(timerID);
    return;
  }

  startBtn.disabled = true;
  const timerID = setInterval(onTimerTick, 1000);

  function onTimerTick() {
    timerCycle(dateEnd);
  }

  function timerCycle(date) {
    const diffTime = calculateDTime(date - Date.now());
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

  function showTime({ days, hours, minutes, seconds }) {
    daysSpan.textContent = String(days).padStart(2, '0');
    hoursSpan.textContent = String(hours).padStart(2, '0');
    minutesSpan.textContent = String(minutes).padStart(2, '0');
    secondsSpan.textContent = String(seconds).padStart(2, '0');
  }
}

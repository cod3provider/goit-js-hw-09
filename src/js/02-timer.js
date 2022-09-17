import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_green.css';

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  startBtn: document.querySelector('button[data-start]'),
  timerDiv: document.querySelector('.timer'),
}

refs.startBtn.setAttribute('disabled', '');
refs.startBtn.addEventListener('click', startTimer);

let timeLeft;
let timerStarted = false;

const fp = flatpickr(refs.datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  // minDate: "today",
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    calcLeftTime(selectedDates[0]);
  },
});

function calcLeftTime(selectedTime) {
  timeLeft = selectedTime - Date.now();

  if (timeLeft <= 0) {
    Notify.failure('Please choose a date in the future');
    refs.startBtn.setAttribute('disabled', '');
    return;
  }
  refs.startBtn.removeAttribute('disabled');
}


function startTimer() {
  if (timerStarted) {
    return;
  }

  addTitle();
  const timerId = setInterval(() => {
    const { days, hours, minutes, seconds} = convertMs(timeLeft);
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;

    timeLeft -= 1000;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      timerStarted = false;
      refs.startBtn.setAttribute('disabled', '');

      changeTimerTitle();
    }
  }, 1000);

  timerStarted = true;
  Notify.success('Timer started');
  refs.datePicker.setAttribute('disabled', '');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function addTitle() {
  refs.timerDiv.insertAdjacentHTML('afterbegin', '<p class="timer--title timer--title__animation">Putin will die in:</p>')
}

function changeTimerTitle() {
  const timerTitle = document.querySelector('.timer > .timer--title');
  timerTitle.textContent = 'Putin dead';
}
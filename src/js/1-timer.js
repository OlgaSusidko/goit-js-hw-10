import '../css/1-timer.css'
import '../css/styles.css'
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";




const ref = {
  inputValueEl: document.querySelector('#datetime-picker'),
  btnStartEl: document.querySelector('button'),
  timerEl: document.querySelector('.timer'),
  dayEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

ref.btnStartEl.disabled = true;
let userSelectedDate = null;
let timeInterval = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      ref.btnStartEl.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      ref.btnStartEl.disabled = false;
    }
  },
};

flatpickr(ref.inputValueEl, options);

ref.btnStartEl.addEventListener('click', startCount);

function startCount() {
  if (userSelectedDate) {
    countDown(userSelectedDate);
    ref.btnStartEl.disabled = true;
    ref.inputValueEl.disabled = true;
  }
}

function countDown(endDate) {
  timeInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance < 0) {
      clearInterval(timeInterval);
      ref.inputValueEl.disabled = false;
       ref.btnStartEl.disabled = true;
      return;
    }

    const convertedTime = convertMs(distance);
    changeTimer(convertedTime);
  }, 1000);
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function changeTimer(valueTime) {
  ref.dayEl.textContent = addLeadingZero(valueTime.days);
  ref.hoursEl.textContent = addLeadingZero(valueTime.hours);
  ref.minutesEl.textContent = addLeadingZero(valueTime.minutes);
  ref.secondsEl.textContent = addLeadingZero(valueTime.seconds);
}

iziToast.settings({
  class: 'izi-toast',
  position: 'topRight',
  backgroundColor: 'rgba(239, 64, 64, 1)',
  progressBarColor: 'rgba(181, 27, 27, 1)',
  theme: 'dark',
});
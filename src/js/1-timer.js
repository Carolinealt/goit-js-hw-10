import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};
const { input, btnStart, daysEl, hoursEl, minutesEl, secondsEl } = refs;

let userSelectedDate = null;
let idInterval = null;
btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        messageColor: 'white',
        messageSize: '22',
        backgroundColor: '#b31717',
        progressBar: false,
        icon: '',
      });
      btnStart.disabled = true;
      return;
    }
    btnStart.disabled = false;
    userSelectedDate = selectedDates[0].getTime();
  },
};

flatpickr(input, options);

function calculateTimerValue(userDate) {
  return userDate - Date.now();
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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function stopInterval(id) {
  clearInterval(id);
  input.disabled = false;
}

function updatingTimerUi({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}

btnStart.addEventListener('click', () => {
  btnStart.disabled = true;
  input.disabled = true;

  idInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(
      calculateTimerValue(userSelectedDate)
    );

    updatingTimerUi({ days, hours, minutes, seconds });

    if ((days && hours && minutes && seconds === '00')) {
      stopInterval(idInterval);
      return;
    }
  }, 1000);
});

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('form'),
  inputDelay: document.querySelector('[name="delay"]'),
  inputRadio: document.querySelector('[name="state"]'),
};
const { form, inputDelay, inputRadio } = refs;
let valueRadio = null;

iziToast.settings({
  position: 'topRight',
  messageColor: 'white',
  messageSize: `20`,
  icon: '',
});

function checkRadioValue(radio) {
  return radio.checked;
}

const getPromise = ({ userDelay, userRadio }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userRadio) {
        reject(`❌ Rejected promise in ${userDelay}ms`);
      }
      resolve(`✅ Fulfilled promise in ${userDelay}ms`);
    }, userDelay);
  });
};

function handlerPromise(inputRadio, valueDelay) {
  valueRadio = checkRadioValue(inputRadio);
  getPromise({ userDelay: valueDelay, userRadio: valueRadio })
    .then(value => {
      iziToast.show({
        message: value,
        backgroundColor: '#31bd3f',
      });
    })
    .catch(value => {
      iziToast.error({
        message: `${value}`,
        backgroundColor: '#b31717',
      });
    });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  handlerPromise(inputRadio, inputDelay.value);
});

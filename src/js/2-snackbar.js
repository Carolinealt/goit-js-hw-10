import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('form'),
  inputDelay: document.querySelector('[name="delay"]'),
  inputRadio: document.querySelector('[name="state"]'),
  btnSubmit: document.querySelector('[type="button"]'),
};
const { form, inputDelay, inputRadio, btnSubmit } = refs;
let valueRadio = null;
let delayValue = null;

function checkRadioValue(radio) {
  return radio.checked ? true : false;
}

const getPromise = ({ userDelay, userRadio }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userRadio) {
        reject(
          iziToast.error({
            message: `❌ Rejected promise in ${userDelay}ms`,
            position: 'topRight',
            backgroundColor: '#b31717',
            messageColor: 'white',
            messageSize:`20`,
            icon: '',
            shadow: false,
          })
        );
      } else
        resolve(
          iziToast.show({
            message: `✅ Fulfilled promise in ${userDelay}ms`,
            position: 'topRight',
            backgroundColor: "#31bd3f",
            messageSize:`20`,
            messageColor: 'white',
            shadow: false,
            icon: '',
          })
        );
    }, userDelay);
  });
};

function handlerPromise(inputRadio, inputDelay) {
  valueRadio = checkRadioValue(inputRadio);
  delayValue = inputDelay * 1000;
  getPromise({ userDelay: delayValue, userRadio: valueRadio })
    .then(value => {
      console.log(value);
    })
    .catch(value => {
      console.log(value);
    });
}

btnSubmit.addEventListener('click', () => {
  handlerPromise(inputRadio, inputDelay.value);
});

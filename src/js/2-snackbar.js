import '../css/2-snackbar.css'
import '../css/styles.css'

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

    const delay = event.currentTarget.querySelector('input[name="delay"]').value;
     console.log(delay);
    const stateRadio = event.currentTarget.querySelector('input[name="state"]:checked');
     console.log(stateRadio);
    const state = stateRadio ? stateRadio.value : null;

  
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: 'rgba(89, 161, 13, 1)',
        progressBarColor: 'rgba(50, 97, 1, 1)',
        theme: 'dark',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: 'rgba(239, 64, 64, 1)',
        progressBarColor: 'rgba(181, 27, 27, 1)',
        theme: 'dark',
      });
    });
}

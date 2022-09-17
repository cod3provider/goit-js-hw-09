import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onSubmitForm);

const notiflixOptions = {
  position: 'right-top',
  clickToClose: true,
  timeout: 3000,
  cssAnimationStyle: 'zoom',
}

function onSubmitForm (evt) {
  evt.preventDefault();

  const refs = {
    delayRef: Number(document.querySelector('input[name="delay"]').value),
    stepRef: Number(document.querySelector('input[name="step"]').value),
    amountRef: Number(document.querySelector('input[name="amount"]').value),
  }

  let { delayRef,
        stepRef,
        amountRef
    } = refs;

  for (let i = 1; i <= amountRef; i += 1) {
    createPromise(i, delayRef)
    .then(({ position, delay}) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, notiflixOptions)})
    .catch(({ position, delay}) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, notiflixOptions)});
    delayRef += stepRef;
  }
  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
  });
}


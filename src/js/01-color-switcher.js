const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

const backgroundSetter = {
  isActive: false,
  intervalId: null,
  start() {
    if (this.isActive) {
      return;
    };

    this.intervalId = setInterval(() => {
      this.isActive = true;
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.startBtn.setAttribute('disabled', '');
  },
  stop() {
    this.isActive = false;
    clearInterval(this.intervalId);
    refs.startBtn.removeAttribute('disabled');
  },
}

refs.startBtn.addEventListener('click', startSetter);
refs.stopBtn.addEventListener('click', stopSetter);

function startSetter() {
  backgroundSetter.start();
}

function stopSetter() {
  backgroundSetter.stop();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

refreshCurrentPlayerTime();

//додаємо слухач на подію timeupdate
player.on('timeupdate', throttle(loadTimeUpdate, 1000));

//функція, яка отримує час відтворення
function loadTimeUpdate({ seconds }) {
  addToStorageUpdatedTime(seconds);
}

// функція, яка записує час відтворення в локальне сховище
function addToStorageUpdatedTime(time) {
  localStorage.setItem(STORAGE_KEY, time);
}

//функція, яка перевіряє наявність збереженого часу
function hasStorageCurrentTime() {
  return localStorage.getItem(STORAGE_KEY) ?? false;
}

// функція, яка встановлює поточний час після перезавантаження сторінки
function refreshCurrentPlayerTime() {
  if (!hasStorageCurrentTime()) {
    return;
  }

  player.setCurrentTime(hasStorageCurrentTime());
}

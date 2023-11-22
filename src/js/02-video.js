import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {
});

const localStorage = window.localStorage;

player.on('timeupdate', (event) => {
  const currentTime = event.seconds;

  localStorage.setItem('videoplayer-current-time', currentTime);
});

const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime) {
  player.setCurrentTime(savedTime);
}

const updateCurrentTimeThrottled = throttle(updateCurrentTime, 1000);

function updateCurrentTime(event) {
  const currentTime = event.seconds;
  localStorage.setItem('videoplayer-current-time', JSON.stringify(currentTime));
}

player.on('timeupdate', updateCurrentTimeThrottled);


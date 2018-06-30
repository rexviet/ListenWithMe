var player;

function initPlayer() {
  let iframe = document.querySelector('iframe.embedly-embed');
  player = new playerjs.Player(iframe);
  player.on('ready', function(){
    console.log('ready');
    initSocket();
    //autoplay the video.
    // player.play();

  });
}

function getCurrentTime() {
  return new Promise(resolve => {
    player.getCurrentTime(time => {
      return resolve(time);
    })
  });
}

function setCurrentTime(time) {
  return player.setCurrentTime(time)
}

function play() {
  player.play();
}

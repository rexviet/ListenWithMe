var player;

function initPlayer() {
  let iframe = document.querySelector('iframe.embedly-embed');
  player = new playerjs.Player(iframe);
  player.on('ready', function(){
    console.log('ready');
    if(!configs.SOCKET_INIT) {
      initSocket();
    }
    //autoplay the video.
    // player.play();

    player.on('ended', function(){
      console.log('video ended');
      configs.songs.shift();
      $('#sampleArea').children().eq(1).remove();
      renderFistSong();
    });
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

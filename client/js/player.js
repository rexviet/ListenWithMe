let player;

function initPlayer() {
  return new Promise(resolve => {
    console.log('initPlayer');
    let iframe = document.querySelector('iframe');
    player = new playerjs.Player(iframe);
    player.on('ready', function(){
      console.log('ready');
      if(!configs.SOCKET_INIT) {
        initSocket();
      }
      player.getPaused(function(paused){
        console.log('Paused: '+paused);
        if(paused) {
          player.play();
        }
      });
      // autoplay the video.
      // player.play();

      player.on('ended', function(){
        console.log('video ended');
        playNextSong();
        // getNextSong();
        // configs.songs.shift();
        // $('#sampleArea').children().eq(1).remove();
        // renderFistSong();
      });

      return resolve();
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
  console.log('set current time to:', time);
  player.setCurrentTime(time);
}

function play() {
  console.log('PLAY');
  player.play();
}

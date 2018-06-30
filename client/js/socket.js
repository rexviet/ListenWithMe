let socket;

function initSocket() {
  socket = io(configs.BASE_URL);

  socket.on('connection_rs', function(isMaster){
    console.log('connect to server success');
    console.log('is master:', isMaster);
    if(isMaster) {
      play();
    }
  });

  socket.on('get_time', function (data) {
    console.log('new player:', data.newPlayer);
    getCurrentTime()
      .then(time => socket.emit('get_time_rs', {player: data.newPlayer, time}));

  });

  socket.on('get_time_rs', function (time) {
    console.log('time:', time);
    setCurrentTime(time);
  });
}

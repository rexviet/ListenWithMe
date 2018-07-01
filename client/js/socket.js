let socket;

function initSocket() {
  socket = io(configs.BASE_URL);

  socket.on('connection_rs', function(isMaster){
    console.log('connect to server success');
    configs.SOCKET_INIT = true;
    console.log('is master:', isMaster);
    configs.isMaster = isMaster;
    if(configs.isMaster) {
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

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
      .then(time => socket.emit('get_time_rs', {player: data.newPlayer, time, song: configs.songs[0]._id}));

  });

  socket.on('get_time_rs', function (data) {
    console.log('data:', data);

    let songIndex = findItemByProp(configs.songs, '_id', data.song);
    console.log('songIndex:', songIndex);
    if(songIndex !== false) {
      configs.songs.splice(0, songIndex);
      $('#sampleArea').find('ul').each((i, elm) => {
        if(i < songIndex) {
          $(elm).remove();
        }
      });
      renderFistSong()
        .then(() => {
          console.log('render first song done.');
          setCurrentTime(data.time);
          console.log('play now');
          player.play();
        });

    }
  });

  socket.on('new_master', masterId => {
    configs.isMaster = socket.id.toString() === masterId.toString();
    console.log('is master:', configs.isMaster);
  });

  socket.on('new_song', song => {
    console.log('new song receive:', song);
    if(configs.songs.length < 10) {
      configs.songs.push(song);

      // render to list
      let template = $('#hidden-template').html();
      let html = Mustache.to_html(template, song);
      $('#sampleArea').append(html);
    }

    if(configs.songs.length === 1) {
      renderFistSong();
    }
  });
}

function emit(event, data) {
  return socket.emit(event, data);
}

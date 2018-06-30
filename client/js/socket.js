const socket = io('http://localhost:3000');

socket.on('get_time', function (data) {
  console.log('new player:', data.newPlayer);
});

socket.on('connect', function(){
  console.log('connect to server success');
});

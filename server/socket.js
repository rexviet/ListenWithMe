import SocketIO from 'socket.io';
import * as PlayerServices from './services/player.services';
import {getRandomItem} from "./utils/ArrayHelper";

let io = null;

exports.io = io;

exports.init = (server) => {
  io = new SocketIO(server);
  console.log('socket init success');

  io.on('connection', (socket) => {
    let str = 'A client connected on instance ' + (process.env.NODE_APP_INSTANCE || '0');
    console.log(str);

    let masterPlayerSocketID = PlayerServices.getMasterPlayerSocketID();
    if(!masterPlayerSocketID) {
      console.log('chua co master, init master:', socket.id);
      PlayerServices.setMasterPlayerSocketID(socket.id);
      socket.isMaster = true;
    } else {
      console.log('ask master:');
      emitToSocketID(masterPlayerSocketID, 'get_time', {newPlayer: socket.id});
    }

    // console.log('connected:', Object.keys(io.sockets.sockets));
    socket.on('disconnect', () => {
      if(socket.isMaster) {
        console.log('master disconnected');
        PlayerServices.unsetMasterPlayer();
        let connectedSockets = Object.keys(io.sockets.sockets);
        let newMaster = getRandomItem(connectedSockets);
        console.log('random new master:', newMaster);
        if(newMaster) {
          PlayerServices.setMasterPlayerSocketID(socket.id);
          io.sockets.sockets[newMaster].isMaster = true;
        } else {
          console.log('no more master :(');
        }
      }
    })
  });
};

function emitToSocketID(socketID, event, data) {
  // console.log('socketID:', socketID);
  // console.log('event:', event);
  // console.log('data:', data);
  io.to(socketID).emit(event, data);
}

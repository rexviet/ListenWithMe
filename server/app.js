import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import configs from './config';
import {init as initSocket} from './socket';
import Queue from './libs/Queue';
import dummyData from './dummyData';
import apiRoutes from './routes/index';
import uploadRoutes from './routes/upload.route';
import {checkLogin} from './libs/Auth';
import path from 'path';

// MongoDB Connection
mongoose.Promise = global.Promise;
(async function () {
  try {
    await mongoose.connect(configs.mongoURL);
    console.log('DB connect success.');
  } catch (err) {
    console.error('err on mongo connection:', err);
    process.exit(1);
  }
}) ();

// Kue and KueUI
Queue.init(configs.kue, configs.kueUI);

// Express
const app = express();
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '20mb'
}));
app.use(checkLogin);
app.use('/api/', apiRoutes);
app.use('/upload/', uploadRoutes);

if(configs.useExpressStatic) {
  app.use('/uploads/', express.static(path.resolve(__dirname, '../uploads')));
}

const server = http.createServer(app);

// SocketIO
initSocket(server);


server.listen(configs.serverPort, async () => {
  console.log('server is listening on port', configs.serverPort);
  await dummyData();
  console.log('dummy data done.');
  // console.log('pairFollowing:', configs.pairFollowing);
  // process.exit();
});

app.get('/', function(req, res) {
  res.end('Hello');
});

export default app;

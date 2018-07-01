import Queue from '../libs/Queue';
import mongoose from 'mongoose';
import configs from '../config';
import {addSong} from "../services/song.services";

const queue = Queue.getInstance().getQueue();

// MongoDB Connection
mongoose.Promise = global.Promise;
(async function () {
  try {
    await mongoose.connect(configs.mongoURL);
    console.log('DB connect success.');

    queue.process('new_song', 10, async (job, done) => {
      try {
        let url = job.data.url;
        let song = await addSong(url);
        // console.log('song:', song);
        return done(null);
      } catch (err) {
        console.log('err on job new_song:', err);
        return done(err);
      }
    });
  } catch (err) {
    console.error('err on mongo connection:', err);
    process.exit(1);
  }
}) ();



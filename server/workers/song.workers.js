import Queue from '../libs/Queue';
import mongoose from 'mongoose';
import configs from '../config';
import * as SongServices from "../services/song.services";

const queue = Queue.getInstance().getQueue();

// MongoDB Connection
mongoose.Promise = global.Promise;
(async function () {
  try {
    await mongoose.connect(configs.mongoURL);
    console.log('DB connect success.');

    queue.process('new_song', 5, async (job, done) => {
      try {
        let url = job.data.url;
        console.log('processing new song:', url);
        let song = await SongServices.addSong(url);
        // console.log('song:', song);
        console.log('added song', song.title, 'to queue.');
        return done(null);
      } catch (err) {
        console.log('err on job new_song:', err);
        return done(err);
      }
    });

    queue.process('new_song_slack', 5, async (job, done) => {
      try {
        let url = job.data.url;
        let channel = job.data.channel;

        await SongServices.submitSongFromSlack(url, channel);

        return done(null);
      } catch (err) {
        console.log('err on job new_song_slack:', err);
        return done(err);
      }
    });
  } catch (err) {
    console.error('err on mongo connection:', err);
    process.exit(1);
  }
}) ();



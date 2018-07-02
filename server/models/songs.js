import mongoose from 'mongoose';
import Queue from '../libs/Queue';

const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: {type: String},
  url: {type: String},
  thumbnail_url: {type: String},
  description: {type: String},
  html: {type: String},
  src: {type: String},
  added_at: {type: Date, default: Date.now, index: 1}
});

songSchema.post('save', function (created, next) {
  // console.log('new song triggerd:', created);
  Queue.getInstance().pushJob('emit', {
    event: 'new_song',
    data: created
  });
  return next();
});

export default mongoose.model('Song', songSchema);

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: {type: String},
  url: {type: String},
  html: {type: String},
  added_at: {type: Date, default: Date.now, index: 1}
});

export default mongoose.model('Song', songSchema);

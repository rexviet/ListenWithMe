import configs from './config';
import {dummySongs, getSongs} from "./services/song.services";

export default async function () {
  let songs = await getSongs();
  if(!songs.length) {
    await dummySongs();
  }
}

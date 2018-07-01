import * as SongServices from '../services/song.services';

const SONG_LIMIT = 10;

export async function getSongs(req, res) {
  try {
    let lastSongId = req.query.lastSong, limit = Number(req.query.limit).valueOf();
    if(isNaN(limit) || limit > SONG_LIMIT) {
      limit = SONG_LIMIT;
    }

    let data = await SongServices.getSongs(lastSongId, limit);

    return res.status(200).json({success: true, data});
  } catch (err) {
    err.success = false;
    return res.status(err.status || 500).json(err);
  }
}

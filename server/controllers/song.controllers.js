import * as SongServices from '../services/song.services';

export async function getSongs(req, res) {
  try {
    let lastSongId = req.query.lastSong, limit = Number(req.query.limit).valueOf();
    if(isNaN(limit) || limit > 3) {
      limit = 3;
    }

    let data = await SongServices.getSongs(lastSongId, limit);

    return res.status(200).json({success: true, data});
  } catch (err) {
    err.success = false;
    return res.status(err.status || 500).json(err);
  }
}

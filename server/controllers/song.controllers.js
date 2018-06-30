import * as SongServices from '../services/song.services';

export async function getSongs(req, res) {
  try {
    let data = await SongServices.getSongs();

    return res.status(200).json({success: true, data});
  } catch (err) {
    err.success = false;
    return res.status(err.status || 500).json(err);
  }
}

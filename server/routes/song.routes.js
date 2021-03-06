import {Router} from 'express';
import * as SongControllers from '../controllers/song.controllers';

const router = new Router();

router.route('/')
  .get(SongControllers.getSongs);

router.route('/:input/')
  .post(SongControllers.submitSong);

export default router;

import express from 'express';
import songRoutes from './song.routes';

const router = express.Router();

router.use('/songs', songRoutes);

export default router;

import express from 'express';
import { getAnimes, addAnime, deleteAnime, updateAnime } from '../controllers/watchlist.controller.js';

const router = express.Router();
import authenticatetoken from '../authenticate.js';

router.get('/', authenticatetoken, getAnimes)
router.post('/', authenticatetoken, addAnime);
router.delete("/:id", authenticatetoken, deleteAnime)
router.put('/:id', authenticatetoken, updateAnime)

export default router;
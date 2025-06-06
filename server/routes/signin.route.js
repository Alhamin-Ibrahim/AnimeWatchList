import express from 'express'
import { signin } from '../controllers/signin.controller.js';

const router = express.Router();

router.post('/', signin)

export default router;
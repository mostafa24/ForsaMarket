import { Router } from 'express';
import * as auth from '../controllers/auth.controller.js';

const r = Router();

r.post('/login', auth.login);

export default r;

import { Router } from 'express';
import * as auth from '../controllers/auth.controller.js';
import * as validator from '../validators/auth.validator.js';

const r = Router();
r.post('/login', validator.login, auth.login);
r.post('/register', validator.register, auth.register);
export default r;

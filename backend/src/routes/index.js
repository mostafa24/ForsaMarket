import { Router } from 'express';
import authRoutes from './auth.routes.js';
// import other route files…

const router = Router();
router.use('/auth', authRoutes);
export default router;

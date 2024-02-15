import { Router } from 'express';
import { Login, Register } from '../controllers/auth.controllers';
const router = Router();

router.post('/register', Register).post('/login', Login);

export default router;

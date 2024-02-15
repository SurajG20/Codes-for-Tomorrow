import { Router } from 'express';
import { getUserData } from '../controllers/user.controllers';
import { authenticateUser } from '../middlewares/authentication';
const router = Router();

router.get('/get-user', authenticateUser, getUserData);

export default router;

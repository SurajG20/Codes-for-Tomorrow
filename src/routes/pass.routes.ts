import { Router } from 'express';
import {
  forgetPassword,
  resetPassword,
  showResetPassword,
  showSuccessPage,
} from '../controllers/pass.controllers';
import { authenticateUser } from '../middlewares/authentication';

const router = Router();

router.post('/forget-password', authenticateUser, forgetPassword);
router.get('/reset-password', showResetPassword);
router.post('/reset-password', resetPassword);
router.get('/success', showSuccessPage);

export default router;

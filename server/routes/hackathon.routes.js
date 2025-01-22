import Router from 'express';
import { 
  createHackathon, 
  updateHackathon, 
  closeHackathon, 
  getActiveHackathons 
} from '../controllers/hackathon.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { handlehackathonBanner } from '../middlewares/hackathonBanner.js';

const router = Router();

router.route('/create')
  .post(verifyJWT, handlehackathonBanner, createHackathon);

router.route('/update/:id')
  .patch(verifyJWT, handlehackathonBanner, updateHackathon);

router.route('/close/:id')
  .patch(verifyJWT, closeHackathon);

router.route('/active')
  .get(getActiveHackathons);

export default router;
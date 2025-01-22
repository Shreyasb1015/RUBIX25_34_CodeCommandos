import Router from 'express';
import { registerUser,loginUser,changePassword,logoutUser,getAllUsers } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const router=Router();  

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/change-password').patch(verifyJWT,changePassword)
router.route('/allusers').get(verifyJWT,getAllUsers)
router.route('/logout').get(verifyJWT,logoutUser)


export default router;
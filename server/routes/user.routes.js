import Router from 'express';
import { registerUser,loginUser,changePassword,logoutUser,getAllUsers,updateProfile,getUserById,getJudgeActiveHackathons,getAllJudges} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { handleProfilePic } from '../middlewares/profilePicStorage.js';



const router=Router();  

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route("/updateProfile").patch(verifyJWT,handleProfilePic,updateProfile);
router.route('/change-password').patch(verifyJWT,changePassword)
router.get('/user/:userId', verifyJWT, getUserById)
router.route('/allusers').get(verifyJWT,getAllUsers)

router.route('/logout').get(verifyJWT,logoutUser)
router.route("/alljudgehackathons")
  .get(verifyJWT, getJudgeActiveHackathons);
router.route("/alljudges").get(verifyJWT,getAllJudges)

export default router;
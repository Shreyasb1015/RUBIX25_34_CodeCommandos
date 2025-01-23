import Router from "express";
import {
  createTeam,
  updateTeam,
  deleteTeam,
  acceptInvite,
  declineInvite,
  sendTeamInvite,
  getTeamsByHackathonId,
  getTeamById
} from "../controllers/team.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/create").post( createTeam);
router.route("/update").patch(verifyJWT, updateTeam);
router.get('/accept-invite', acceptInvite);
router.get('/decline-invite', declineInvite);
router.route("/delete/:teamId").delete(verifyJWT, deleteTeam);
router.post('/send-invite', sendTeamInvite);
router.get('/hackathon/:hackathonId', getTeamsByHackathonId);
router.get('/getteam/:teamId', getTeamById);
export default router;

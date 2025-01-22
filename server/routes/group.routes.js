import Router from "express";
import {
  createGroup,
  deleteGroup,
  addParticipant,
  removeParticipant,
} from "../controllers/group.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/create").post(verifyJWT, createGroup);


router.route("/delete/:groupId").delete(verifyJWT, deleteGroup);


router.route("/add-participant").patch(verifyJWT, addParticipant);


router.route("/remove-participant").patch(verifyJWT, removeParticipant);

export default router;

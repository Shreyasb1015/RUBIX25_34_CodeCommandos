import Router from "express";
import {
  sendMessage,
  updateMessage,
  deleteMessage,
  getMessagesByGroupId,
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/send").post(verifyJWT, sendMessage);


router.route("/update").patch(verifyJWT, updateMessage);


router.route("/delete/:messageId").delete(verifyJWT, deleteMessage);

router.route("/group/:grpId").get(verifyJWT, getMessagesByGroupId);

export default router;

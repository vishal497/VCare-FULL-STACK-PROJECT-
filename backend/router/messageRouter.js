import express from "express"
import { isAdminAuthenticated } from "../midlwares/auth.js"
import { getAllMessages, sendMessage } from "../controller/messageController.js";

const router = express.Router();
router.post("/send", sendMessage)
router.get("/getall",isAdminAuthenticated, getAllMessages)
export default router;
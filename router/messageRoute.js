import express from "express";
import { deleteMessage, getAllmessage, sendMessage } from "../controllers/messageControler.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", getAllmessage);
router.delete("/delete/:id", isAuthenticated, deleteMessage);

export default router;
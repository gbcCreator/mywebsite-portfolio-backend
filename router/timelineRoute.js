import express from "express";
import {postTimeline, deleteTimeline} from "../controllers/timelineControler.js";
import {isAuthenticated} from "../middlewares/auth.js";
import { getAllTimelines } from "../controllers/timelineControler.js";

const router = express.Router();
router.post("/add", isAuthenticated, postTimeline);
router.delete("/delete/:id", isAuthenticated, deleteTimeline);
router.get("/getall", getAllTimelines);

export default router;
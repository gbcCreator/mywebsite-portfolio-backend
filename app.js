import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbCoonection.js";
import { errorMiddleware } from "./middlewares/error.js";
import  messageRouter from "./router/messageRoute.js"
import userRouter from "./router/userRoutes.js"
import timelineRoute from "./router/timelineRoute.js"
import applicationRoute from "./router/softwareApplicationRoute.js"
import skillRute from "./router/skillRute.js";
import projectRoute from "./router/projectRoute.js";


const app = express();
dotenv.config({ path:"./config/config.env"});

app.use(
    cors({
        origin:[process.env.PORTFOLIO_URL, process.env.DASHBOARD_URI],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);
// app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir:"/tmp/",
    })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRoute);
app.use("/api/v1/softwareapplication", applicationRoute);
app.use("/api/v1/skill", skillRute);
app.use("/api/v1/project", projectRoute);

dbConnection();
app.use(errorMiddleware);

export default app;
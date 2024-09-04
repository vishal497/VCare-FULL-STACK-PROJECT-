import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbconnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from './midlwares/errorMiddleware.js';
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app = express();

// Load environment variables
config({ path: "./config/config.env" });

// CORS Configuration

app.use(
  cors({
    origin: [process.env.DASHBOARD_URL, process.env.FRONTEND_URL], 
    default : process.env.FRONTEND_URL,// Updated to use a single URL
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"], // Include OPTIONS method
    credentials: true,
  })
);


// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", 
}));
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);


dbConnection(); 
app.use(errorMiddleware); 

export default app;

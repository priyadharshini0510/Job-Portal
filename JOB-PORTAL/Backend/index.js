import express from "express";
import connectDB from "./database/db.js";
import { configDotenv } from "dotenv";
import {v2 as cloudinary} from 'cloudinary';
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { UserRouter } from "./routes/userRouter.js";
import { ApplicationRouter } from "./routes/applicationRouter.js";
import { JobRouter } from "./routes/jobRouter.js";   

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME, 
  api_key: process.env.CLOUDINARY_CLIENT_API, 
  api_secret: process.env.CLOUDINARY_CLIENT_API_SECRET, 
});

configDotenv();
connectDB();
const app = express();
app.use(cookieParser());
app.use(fileUpload());
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  credentials: true
}))

// routers
app.use('/api/v1/user', UserRouter)               // following the industries standard to making the router
app.use('/api/v1/jobs', JobRouter)                // following the industries standard to making the router
app.use('/api/v1/application', ApplicationRouter)  // following the industries standard to making the router

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

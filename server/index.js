import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectMongoDB } from "./config/monogdb.js";
import { authController } from "./controllers/authController.js";

const app = express();

dotenv.config();
connectMongoDB();

app.use(express.json());
app.use(cors());

app.use("/auth", authController);

app.listen(5000);

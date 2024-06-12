import { config } from "dotenv";
config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import pool from "./db";
import catchAsync from "./utils/catchAsync";
const app = express();

// middleware to allow cross-origin requests

app.use(cors());

// parse the request body to json

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
export default app;

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
// add a todo
app.post(
  "/todos",
  catchAsync(async (req: Request, res: Response) => {
    let { description } = req.body;

    let queryString = `
  INSERT INTO todo(description) VALUES($1) RETURNING *; 
`;
    let newTODo = await pool.query(queryString, [description]);
console.log("newTODo",newTODo)
    return res.json({message:"todo has been added successfully",todo:newTODo.rows[0]});
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
export default app;

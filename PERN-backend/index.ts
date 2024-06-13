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
    return res.status(201).json({message:"todo has been added successfully",todo:newTODo.rows[0]});
  })
);
// get all todos
app.get(
  "/todos",
  catchAsync(async (req: Request, res: Response) => {
    let queryString = `SELECT * FROM todo;`;
    let todoList = await pool.query(queryString);
    return res.json({items:todoList.rows});
  })
);
// get todo by id
app.get(
  "/todo/:id",
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;
    if (!id) {
      throw new Error("id of the todo list is not given");
    }
    let queryString = `SELECT * FROM todo WHERE t_id = $1`;
    let searchedTodo = await pool.query(queryString, [id]);
    return res.json(searchedTodo.rows[0]);
  })
);
// update todo by id
app.put(
  "/todo/:id",
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;

    let { description } = req.body;
    if (!id) {
      throw new Error("id of the todo list is not given");
    }
    let queryString = `UPDATE todo SET description=$1 WHERE t_id=$2`;

    let updatedToDo = await pool.query(queryString, [description, id]);
    return res.json("To do has been updated!");
  })
);
//delete a todo by id
app.delete(
  "/todo/:id",
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;
    if (!id) {
      throw new Error("id of the todo list is not given");
    }
    let queryString = `DELETE FROM todo WHERE t_id=$1`;
    let deletedToDo = await pool.query(queryString, [id]);
    console.log("deletedToDo", deletedToDo);
    return res.json("To do has been deleted!");
  })
);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
export default app;

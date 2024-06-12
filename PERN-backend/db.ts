import { Pool } from "pg";
const pool = new Pool({
  user:  process.env.DB_USER,
  database: "todo",
  password: process.env.DB_PASSWORD,
  port: 5432,
  host: process.env.DB_HOST,
});

export default pool;

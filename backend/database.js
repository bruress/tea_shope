import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "tea_shop",
  port: 5432,
});

export default pool;

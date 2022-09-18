//db
const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "mysql",
  user: "root",
  password: "minleejae",
  database: "myapp",
});
exports.pool = pool;

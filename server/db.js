const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "todo_reactnode",
});

connection.connect();

module.exports = connection;

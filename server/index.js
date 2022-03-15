const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const { connect } = require("./db");

//middleware
app.use(cors());
app.use(express.json()); // req.body

//routes

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    await createNewTodo(description);
    res.json("created");
  } catch (error) {
    console.error(error.message);
  }
});

async function createNewTodo(description) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO todo(description) VALUES(?)`;
    connection.query(query, [description], (err) => {
      if (err) reject(`${err}`);
      resolve();
    });
  });
}

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await getAlltodos();
    res.json(allTodos);
  } catch (err) {
    console.error(err.message);
  }
});

function getAlltodos() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM todo", (err, result) => {
      if (err) reject(`${err}`);
      resolve(result);
    });
  });
}

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await getAtodo(id);
    res.json(todo);
  } catch (error) {
    console.error(error);
  }
});

function getAtodo(id) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM todo WHERE todo_id = ?`;
    connection.query(query, [id], (err, result) => {
      if (err) reject(`${err}`);
      resolve(result);
    });
  });
}

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await updateTodo(id, description);
    res.json("updated");
  } catch (error) {
    console.error(error);
  }
});

function updateTodo(id, description) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE todo SET description = ? WHERE todo_id = ?`;
    connection.query(query, [description, id], (err) => {
      if (err) reject(`${err}`);
      resolve();
    });
  });
}

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTodo(id);
    res.json("deleted");
  } catch (error) {
    console.error(error);
  }
});

function deleteTodo(id) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM todo WHERE todo_id = ?`;
    connection.query(query, [id], (err) => {
      if (err) reject(`${err}`);
      resolve();
    });
  });
}
app.listen(5000, () => {
  console.log("server has started on port 5000");
});

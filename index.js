//instatiate express module
const express = require("express");

//use express in app variable
const app = express();

//init Body Parser to make express accept json request
const bodyParser = require("body-parser");

//define the server port
const port = 5000;

app.use(bodyParser.json());

let todos = [
  {
    id: 1,
    title: "Belajar Express.js",
    isDone: false,
  },
  {
    id: 2,
    title: "Belajar Node.js",
    isDone: true,
  },
];

// create route for todos endpoint to show todos data
app.get("/todos", (req, res) => {
  res.send({
    status: "Response Success",
    data: todos,
  });
});

app.get("/todo/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id == id);

  if (!todo) {
    return res.send({
      status: "Data Not Found",
      data: null,
    });
  }

  res.send({
    status: "Response Success",
    data: todo,
  });
});

app.post("/todo", (req, res) => {
  const todo = req.body;
  todos = [...todos, todo];
  res.send({
    status: "Response Success",
    data: todo,
  });
});

app.patch("/todo/:id", (req, res) => {
  const { id } = req.params; // const id = req.params.id;

  todos = todos.map((todo) => (todo.id == id ? req.body : todo));

  res.send({
    status: "Response Success",
    data: req.body,
  });
});

app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;

  todos = todos.filter((todo) => todo.id != id);
  res.send({
    status: "Deleted Success",
    data: id,
  });
});

//when this node.js app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port} !!!`));

const express = require("express");

const router = express.Router();

const {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos");

const { getPosts } = require("../controllers/post");
const { route } = require("./routeV2");

//todos
router.get("/todos", getTodos);
router.get("/todo/:id", getTodo);
router.post("/todo", addTodo);
router.put("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);

//posts
router.get("/posts", getPosts);

module.exports = router;

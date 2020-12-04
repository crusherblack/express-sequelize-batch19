const express = require("express");

const router = express.Router();

const { auth: fakeAuth } = require("../middleware/fakeMidlleware");
const { auth: authentication } = require("../middleware/auth");
const { uploadFile } = require("../middleware/upload");

const {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos");

const {
  getPosts,
  getSinglePostById,
  addPost,
  updatePost,
  deletePost,
  restorePost,
} = require("../controllers/post");

const { getUsers, getProfiles } = require("../controllers/user");
const { getBoooks, getAuthors } = require("../controllers/bookAuthor");

const { register, login } = require("../controllers/auth");

const { route } = require("./routeV2");

//todos
router.get("/todos", getTodos);
router.get("/todo/:id", getTodo);
router.post("/todo", addTodo);
router.put("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);

//posts
router.get("/posts", authentication, getPosts); //get all resource
router.get("/post/:id", getSinglePostById); //get one resource
//pastikan name parameter didalam uploadFile itu sama dengan yang kalian kirim
//dari postman atau dari form-data (name field pada form / state)
router.post("/post", uploadFile("thumbnail", "videoFile"), addPost); //add one resource
router.patch("/post/:id", updatePost); //update resource by id
router.delete("/post/:id", deletePost); //delete resource by id (Soft Delete || Using Paranoid Model)
router.post("/post/:id", restorePost); //restore resource by id

//user
router.get("/users", getUsers); //relationship User hasOne Profile
//profile
router.get("/profiles", getProfiles); //relationship Profile belongsTo User

//ManyToMany
//Book
router.get("/books", getBoooks);
//Author
router.get("/authors", getAuthors);

//Auth
router.post("/register", register);
router.post("/login", login);

module.exports = router;

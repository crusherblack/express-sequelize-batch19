const express = require("express");

const router = express.Router();

const { getTodos } = require("../controllers/todosV2");

router.get("/todos", getTodos);

module.exports = router;

const express = require("express");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  patchTodo,
} = require("../controller/Todo.controller");

const auth = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", auth, createTodo);
router.get("/", auth, getTodos);
router.put("/:id", auth, updateTodo);
router.delete("/:id", auth, deleteTodo);
router.patch("/:id", auth, patchTodo);

module.exports = router;

const Todo = require("../models/Todo.model");

exports.createTodo = async (req, res) => {
  try {
    const todo = new Todo({ ...req.body, user: req.user.userId });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create todo", message: error.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};

exports.patchTodo = async (req, res) => {
  try {
    const allowedUpdates = ["todo", "status", "priority"];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates!" });
    }

    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    updates.forEach((update) => (todo[update] = req.body[update]));
    await todo.save();

    res.json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update todo", message: error.message });
  }
};

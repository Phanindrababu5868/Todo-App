import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppState } from "../context";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const { todos, setTodos, filters, setFilters } = useAppState();
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/todos`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTodos();
    } else {
      navigate("/auth");
    }
  }, [user?.token]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/todos`,
        { todo: newTodo, priority },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setNewTodo("");
      setPriority("LOW");
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdateTodo = async (id, updatedFields) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/todos/${id}`,
        updatedFields,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? response.data : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredTodos = todos.filter((todo) => {
    return (
      (filters.status === "" || todo.status === filters.status) &&
      (filters.priority === "" || todo.priority === filters.priority)
    );
  });

  return (
    <div className="todo-page-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <form
          onSubmit={handleAddTodo}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "600px",
          }}
        >
          <label htmlFor="todo">Todo</label>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="New to-do"
            id="todo"
            required
          />
          <label>Priority</label>
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            {["LOW", "MEDIUM", "HIGH"].map((priorityOption, index) => (
              <div style={{ display: "flex" }} key={index}>
                <label key={priorityOption}>
                  {priorityOption.charAt(0) +
                    priorityOption.slice(1).toLowerCase()}
                </label>
                <input
                  type="radio"
                  name="priority"
                  value={priorityOption}
                  checked={priority === priorityOption}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </div>
            ))}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
      <div className="todos-bg-container">
        <div className="filter-container">
          <span>Filters</span>
          <label>
            Status:
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </label>
          <label>
            Priority:
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </label>
        </div>
        <div className="todo-container">
          {filteredTodos.map((todo) => (
            <div
              key={todo._id}
              className="todo-item"
              style={{
                backgroundColor:
                  todo.status === "DONE"
                    ? "#bae1d3"
                    : todo.status === "IN PROGRESS"
                    ? "#fffbce"
                    : "",
              }}
            >
              <p className="todo-title ">{todo.todo}</p>
              <div className="action-container">
                <label>Status</label>
                <select
                  value={todo.status}
                  onChange={(e) =>
                    handleUpdateTodo(todo._id, { status: e.target.value })
                  }
                >
                  <option value="TODO">To Do</option>
                  <option value="IN PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
                <label>Priority</label>
                <select
                  value={todo.priority}
                  onChange={(e) =>
                    handleUpdateTodo(todo._id, { priority: e.target.value })
                  }
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
                <button onClick={() => handleDeleteTodo(todo._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todos;

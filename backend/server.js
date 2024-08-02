require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/Auth");
const todoRoutes = require("./routes/Todos");
const sessionRoutes = require("./routes/Sessions");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/sessions", sessionRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

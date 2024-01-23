import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
require('dotenv').config();

const app = express();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

app.use(express.json());

// Database connection
mongoose
  .connect("mongodb+srv://aysharamzy:Database123@cluster0.mscdaf9.mongodb.net/?retryWrites=true&w=majority")

  // .connect("mongodb+srv://$(username):$(password)@cluster0.mscdaf9.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

export default app;

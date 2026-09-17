import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
import connectDB from "./db/index.js";

dotenv.config();

// DNS fix
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/patients", async (req, res) => {
  try {
    const patients = await mongoose.connection.db
      .collection("patients")
      .find({})
      .toArray();
    res.json(patients);
  } catch (error) {
    console.log("Data fetch error:", error.message);

    res.status(500).json({
      message: "Data fetch nahi hua",
      error: error.message,
    });
  }
});

// Pehle MongoDB connect, phir server start
const startServer = async () => {
  try {
    await connectDB();

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.log("Server start nahi hua");
  }
};

startServer();
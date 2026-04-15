import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import responseTime from "response-time";
import profilesRoute from "./routes/profiles.js";
import connectDB from "./config/db.js";

configDotenv(); // Load environment variables from .env file

connectDB(); // Establish connection to MongoDB database

const PORT = process.env.PORT || 5000; // Port where the server listens

const app = express();
app.use(
  responseTime((req, res, time) => {
    console.log(`${req.method} ${req.url} took ${time}ms`);
  }),
); // Measure response time for all incoming requests

app.use(cors()); // Enable CORS for all incoming requests
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to My Predictions API! Use the /api/profiles endpoint"); // Basic welcome message for the root endpoint
});

app.use("/api/profiles", profilesRoute); // Mount the profiles route at /api/profiles

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server startup
});

import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import responseTime from "response-time";
import processGender from "./processGender.js";

configDotenv();

const PORT = process.env.PORT || 5000; // Port where the server listens

const app = express();
app.use(
  responseTime((req, res, time) => {
    console.log(`${req.method} ${req.url} took ${time}ms`);
  }),
); // Measure response time for all incoming requests
app.use(cors()); // Enable CORS for all incoming requests

app.get("/", (req, res) => {
  res.send(
    "Welcome to the  Gender Prediction API! Use the /api/classify endpoint with a name query parameter to get gender predictions.",
  ); // Basic welcome message for the root endpoint
});

app.get("/api/classify", processGender); // Endpoint to classify gender based on name

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server startup
});

import express from "express";
import newProfile from "../controllers/newProfile.js";

const router = express.Router();

router.post("/", newProfile);

router.get("/:id", (req, res) => {
  return res.json({ status: "success", method: req.method, data: [{}] });
});

router.get("/", (req, res) => {
  return res.json({ status: "success", method: req.method, data: [{}] });
});

router.delete("/:id", (req, res) => {
  return res.json({ status: "success", method: req.method, data: [{}] });
});

export default router;

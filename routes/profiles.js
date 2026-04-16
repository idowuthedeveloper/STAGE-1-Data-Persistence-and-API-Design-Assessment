import express from "express";
import newProfile from "../controllers/newProfile.js";
import {
  deleteProfileById,
  getAllProfiles,
  getProfileById,
} from "../controllers/profileController.js";

const router = express.Router();

router.post("/", newProfile);

router.get("/:id", getProfileById);

router.get("/", getAllProfiles);

router.delete("/:id", deleteProfileById);

export default router;

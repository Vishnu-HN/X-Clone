import express from "express";
import {
  followUser,
  getCurrentUser,
  getUserProfile,
  syncUser,
  updateProfile,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtect } from "../middleware/arcjet.middleware.js";

const router = express.Router();

// Public route
router.get("/profile/:username", arcjetProtect, getUserProfile);

// ✅ Protected routes — Arcjet runs AFTER user is verified
router.post("/sync", protectRoute, arcjetProtect, syncUser);
router.post("/me", protectRoute, arcjetProtect, getCurrentUser);
router.put("/profile", protectRoute, arcjetProtect, updateProfile);
router.post("/follow/:targetUserId", protectRoute, arcjetProtect, followUser);

export default router;

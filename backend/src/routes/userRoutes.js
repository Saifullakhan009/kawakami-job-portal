import express from "express";

import {
  registerUser,
  loginUser,
  fetchUserData,
  applyJob,
  getUserAppliedJobs,
  uploadResume,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

import upload from "../utils/upload.js";
import userAuthMiddleware from "../middlewares/userAuthMiddleware.js";

const router = express.Router();

// ============================================================
// AUTHENTICATION
// ============================================================

router.post(
  "/register-user",
  upload.single("image"),
  registerUser
);

router.post(
  "/login-user",
  loginUser
);

// ============================================================
// PASSWORD RESET
// ============================================================

// Request password reset email
router.post(
  "/forgot-password",
  forgotPassword
);

// Reset password using token
router.post(
  "/reset-password/:token",
  resetPassword
);

// ============================================================
// USER DATA
// ============================================================

router.get(
  "/user-data",
  userAuthMiddleware,
  fetchUserData
);

// ============================================================
// JOB APPLICATIONS
// ============================================================

router.post(
  "/apply-job",
  userAuthMiddleware,
  applyJob
);

router.post(
  "/get-user-applications",
  userAuthMiddleware,
  getUserAppliedJobs
);

// ============================================================
// RESUME
// ============================================================

router.post(
  "/upload-resume",
  userAuthMiddleware,
  upload.single("resume"),
  uploadResume
);

export default router;
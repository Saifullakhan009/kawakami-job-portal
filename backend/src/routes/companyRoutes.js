import express from "express";

import {
  fetchCompanyData,
  loginCompany,
  postJob,
  registerCompany,
  getCompanyPostedAllJobs,
  changeJobVisibility,
  getCompanyJobApplicants,
  changeStatus,
  forgotCompanyPassword,
  resetCompanyPassword,
} from "../controllers/companyController.js";

import upload from "../utils/upload.js";
import companyAuthMiddleware from "../middlewares/companyAuthMiddleware.js";

const router = express.Router();

// ======================================================
// COMPANY AUTHENTICATION
// ======================================================

// Register company
router.post(
  "/register-company",
  upload.single("image"),
  registerCompany
);

// Login company
router.post(
  "/login-company",
  loginCompany
);

// ======================================================
// COMPANY PASSWORD RESET
// ======================================================

// Forgot employer password
router.post(
  "/forgot-password",
  forgotCompanyPassword
);

// Reset employer password
router.post(
  "/reset-password/:token",
  resetCompanyPassword
);

// ======================================================
// LOGGED-IN COMPANY DATA
// ======================================================

// Fetch logged-in company data
router.get(
  "/company-data",
  companyAuthMiddleware,
  fetchCompanyData
);

// ======================================================
// JOB MANAGEMENT
// ======================================================

// Post a new job
router.post(
  "/post-job",
  companyAuthMiddleware,
  postJob
);

// Get all jobs posted by logged-in company
router.get(
  "/company/posted-jobs",
  companyAuthMiddleware,
  getCompanyPostedAllJobs
);

// Change job visibility
router.post(
  "/change-visibility",
  companyAuthMiddleware,
  changeJobVisibility
);

// ======================================================
// APPLICATION MANAGEMENT
// ======================================================

// Get applications received by company
router.post(
  "/view-applications",
  companyAuthMiddleware,
  getCompanyJobApplicants
);

// Change application status
router.post(
  "/change-status",
  companyAuthMiddleware,
  changeStatus
);

export default router;
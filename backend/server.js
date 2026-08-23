import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./src/db/connectDB.js";
import userRoutes from "./src/routes/userRoutes.js";
import companyRoutes from "./src/routes/companyRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import Cloudinary from "./src/utils/cloudinary.js";

const app = express();

// ============================================================
// MIDDLEWARE
// ============================================================

// Allow requests from frontend
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// ============================================================
// DATABASE & CLOUDINARY
// ============================================================

connectDB();
Cloudinary();

// ============================================================
// BASIC API TEST
// ============================================================

app.get("/", (req, res) => {
  res.send("api is working");
});

// ============================================================
// ROUTES
// ============================================================

app.use("/user", userRoutes);
app.use("/company", companyRoutes);
app.use("/job", jobRoutes);

// ============================================================
// SERVER
// ============================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌐 Server is running on port ${PORT}`);
});
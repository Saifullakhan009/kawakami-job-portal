import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ============================================================
// LOAD ENVIRONMENT VARIABLES
// ============================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env is located at:
// backend/.env
const envPath = path.join(__dirname, "../../.env");

dotenv.config({
  path: envPath,
});

// ============================================================
// CHECK EMAIL CONFIGURATION
// ============================================================

if (!process.env.EMAIL_USER) {
  console.error("❌ EMAIL_USER is missing from backend/.env");
}

if (!process.env.EMAIL_PASSWORD) {
  console.error("❌ EMAIL_PASSWORD is missing from backend/.env");
}

// ============================================================
// GMAIL TRANSPORTER
// ============================================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ============================================================
// VERIFY GMAIL CONNECTION
// ============================================================

transporter.verify((error) => {
  if (error) {
    console.error("❌ Gmail SMTP connection failed:");
    console.error(error);
  } else {
    console.log("✅ Gmail SMTP connection verified successfully");
  }
});

// ============================================================
// EXPORT
// ============================================================

export default transporter;
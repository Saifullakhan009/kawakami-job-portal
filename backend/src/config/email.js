import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify Gmail SMTP connection when the server starts
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Gmail SMTP connection failed:");
    console.error(error);
  } else {
    console.log("✅ Gmail SMTP connection verified successfully");
  }
});

export default transporter;
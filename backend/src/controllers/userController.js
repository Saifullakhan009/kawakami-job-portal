import bcrypt from "bcrypt";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import transporter from "../config/email.js";

// ============================================================
// REGISTER USER
// ============================================================

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Enter your name",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Enter your email",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Enter your password",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Upload your image",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUploadUrl = await cloudinary.uploader.upload(
      imageFile.path
    );

    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      image: imageUploadUrl.secure_url,
    });

    await user.save();

    const token = await generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      userData: user,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

// ============================================================
// LOGIN USER
// ============================================================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      userData: user,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// ============================================================
// FORGOT PASSWORD
// ============================================================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body || {};

    // --------------------------------------------------------
    // Validate email
    // --------------------------------------------------------

    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    console.log(
      "🔐 Forgot password request received for:",
      normalizedEmail
    );

    // --------------------------------------------------------
    // Find candidate
    // --------------------------------------------------------

    const user = await User.findOne({
      email: normalizedEmail,
    });

    /*
      IMPORTANT:
      We do not reveal whether an email exists in the database.
      This prevents email/account enumeration.
    */

    if (!user) {
      console.log(
        "⚠️ No candidate account found for:",
        normalizedEmail
      );

      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      });
    }

    console.log("✅ Candidate found:", user.email);

    // --------------------------------------------------------
    // Generate secure reset token
    // --------------------------------------------------------

    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store only the hashed token in MongoDB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // --------------------------------------------------------
    // Save reset token and expiry
    // --------------------------------------------------------

    user.resetPasswordToken = hashedToken;

    // Token expires after 15 minutes
    user.resetPasswordExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await user.save();

    console.log("✅ Password reset token saved");

    // --------------------------------------------------------
    // Create frontend reset URL
    // --------------------------------------------------------

    const frontendUrl =
      process.env.FRONTEND_URL || "http://localhost:5173";

    const resetUrl =
      `${frontendUrl}/reset-password/${resetToken}`;

    console.log("🔗 Password reset URL generated");

    // --------------------------------------------------------
    // Send password reset email
    // --------------------------------------------------------

    console.log(
      "📧 Sending password reset email to:",
      user.email
    );

    try {
      const mailResult = await transporter.sendMail({
        from: `"Kawakami Overseas Placements" <${process.env.EMAIL_USER}>`,
        to: user.email,

        subject: "Reset Your Candidate Portal Password",

        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >
  <title>Password Reset</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f5f5f3;
    font-family: Arial, Helvetica, sans-serif;
  "
>

  <div
    style="
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
    "
  >

    <!-- Header -->
    <div
      style="
        background-color: #10100f;
        padding: 30px;
        border-radius: 12px 12px 0 0;
        color: white;
      "
    >

      <h1
        style="
          margin: 0;
          color: #d4af37;
          font-size: 24px;
        "
      >
        Kawakami Overseas Placements
      </h1>

      <p
        style="
          color: #cccccc;
          margin: 8px 0 0 0;
        "
      >
        Candidate Portal
      </p>

    </div>

    <!-- Content -->
    <div
      style="
        background-color: white;
        padding: 30px;
        border-radius: 0 0 12px 12px;
      "
    >

      <h2
        style="
          color: #151515;
          margin-top: 0;
        "
      >
        Reset Your Password
      </h2>

      <p
        style="
          color: #555555;
          line-height: 1.6;
        "
      >
        Hello ${user.name},
      </p>

      <p
        style="
          color: #555555;
          line-height: 1.6;
        "
      >
        We received a request to reset the password
        for your candidate portal account.
      </p>

      <p
        style="
          color: #555555;
          line-height: 1.6;
        "
      >
        Click the button below to create a new password.
      </p>

      <!-- Reset Button -->
      <div
        style="
          text-align: center;
          margin: 30px 0;
        "
      >

        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            background-color: #d4af37;
            color: #111111;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: bold;
          "
        >
          Reset Password
        </a>

      </div>

      <p
        style="
          color: #777777;
          font-size: 13px;
          line-height: 1.6;
        "
      >
        This password reset link will expire in
        <strong>15 minutes</strong>.
      </p>

      <p
        style="
          color: #777777;
          font-size: 13px;
          line-height: 1.6;
        "
      >
        If you did not request a password reset,
        you can safely ignore this email.
      </p>

      <hr
        style="
          border: none;
          border-top: 1px solid #eeeeee;
          margin: 25px 0;
        "
      >

      <p
        style="
          color: #999999;
          font-size: 12px;
          text-align: center;
          margin-bottom: 0;
        "
      >
        Kawakami Overseas Placements
      </p>

    </div>

  </div>

</body>
</html>
        `,
      });

      console.log(
        "✅ Password reset email sent successfully!"
      );

      console.log(
        "📨 Message ID:",
        mailResult.messageId
      );

    } catch (emailError) {
      console.error(
        "❌ Password reset email failed:",
        emailError
      );

      // Remove token if email could not be sent
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      await user.save();

      return res.status(500).json({
        success: false,
        message: "Unable to send password reset email",
      });
    }

    // --------------------------------------------------------
    // Success response
    // --------------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
    });

  } catch (error) {
    console.error(
      "Forgot password error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to process password reset request",
    });
  }
};

// ============================================================
// RESET PASSWORD
// ============================================================

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body || {};

    // --------------------------------------------------------
    // Validate token
    // --------------------------------------------------------

    if (
      !token ||
      typeof token !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Reset token is required",
      });
    }

    // --------------------------------------------------------
    // Validate password
    // --------------------------------------------------------

    if (
      !password ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "New password is required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long",
      });
    }

    // --------------------------------------------------------
    // Hash token received from reset URL
    // --------------------------------------------------------

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // --------------------------------------------------------
    // Find candidate with valid token
    // --------------------------------------------------------

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: {
        $gt: new Date(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Reset link is invalid or has expired",
      });
    }

    console.log(
      "✅ Valid reset token found for:",
      user.email
    );

    // --------------------------------------------------------
    // Hash new password
    // --------------------------------------------------------

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    user.password = hashedPassword;

    // --------------------------------------------------------
    // Invalidate reset token
    // --------------------------------------------------------

    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    console.log(
      "✅ Password reset successfully for:",
      user.email
    );

    return res.status(200).json({
      success: true,
      message:
        "Password reset successfully. You can now login with your new password.",
    });

  } catch (error) {
    console.error(
      "Reset password error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to reset password",
    });
  }
};

// ============================================================
// FETCH USER DATA
// ============================================================

export const fetchUserData = async (req, res) => {
  try {
    const userData = req.userData;

    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      userData,
    });
  } catch (error) {
    console.error(
      "Fetch user data error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "User data fetch failed",
    });
  }
};

// ============================================================
// APPLY FOR JOB
// ============================================================

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.userData._id;

    if (!userId || !jobId) {
      return res.status(400).json({
        success: false,
        message:
          "User ID and Job ID are required",
      });
    }

    const isAlreadyApplied =
      await JobApplication.findOne({
        userId,
        jobId,
      });

    if (isAlreadyApplied) {
      return res.status(409).json({
        success: false,
        message:
          "You have already applied for this job",
      });
    }

    const jobData =
      await Job.findById(jobId);

    if (!jobData) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const jobApplication =
      new JobApplication({
        jobId,
        userId,
        companyId: jobData.companyId,
        date: new Date(),
      });

    await jobApplication.save();

    return res.status(201).json({
      success: true,
      message: "Job applied successfully",
      jobApplication,
    });

  } catch (error) {
    console.error(
      "Job application error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Job application failed",
    });
  }
};

// ============================================================
// GET USER APPLIED JOBS
// ============================================================

export const getUserAppliedJobs = async (req, res) => {
  try {
    const userId = req.userData._id;

    const applications =
      await JobApplication.find({
        userId,
      })
        .populate(
          "companyId",
          "name email image"
        )
        .populate(
          "jobId",
          "title location date status"
        );

    return res.status(200).json({
      success: true,
      message:
        "Job applications fetched successfully",
      jobApplications: applications,
    });

  } catch (error) {
    console.error(
      "Get applied jobs error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch job applications",
    });
  }
};

// ============================================================
// UPLOAD RESUME
// ============================================================

export const uploadResume = async (req, res) => {
  try {
    const userId = req.userData._id;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const userData =
      await User.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const uploadedResumeUrl =
      await cloudinary.uploader.upload(
        resumeFile.path
      );

    userData.resume =
      uploadedResumeUrl.secure_url;

    await userData.save();

    return res.status(200).json({
      success: true,
      message:
        "Resume uploaded successfully",
      resumeUrl: userData.resume,
    });

  } catch (error) {
    console.error(
      "Upload resume error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to upload resume",
    });
  }
};
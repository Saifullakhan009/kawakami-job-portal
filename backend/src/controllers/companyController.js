import bcrypt from "bcrypt";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

import generateToken from "../utils/generateToken.js";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import transporter from "../config/email.js";

// ======================================================
// REGISTER COMPANY
// ======================================================

export const registerCompany = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Enter your name",
      });
    }

    if (!email) {
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

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Upload your logo",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingCompany = await Company.findOne({
      email: normalizedEmail,
    });

    if (existingCompany) {
      return res.status(409).json({
        success: false,
        message: "Company already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUpload = await cloudinary.uploader.upload(
      imageFile.path
    );

    const company = new Company({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    await company.save();

    const token = generateToken(company._id);

    return res.status(201).json({
      success: true,
      message: "Registration successful",

      companyData: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },

      token,
    });
  } catch (error) {
    console.error("Company registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

// ======================================================
// LOGIN COMPANY
// ======================================================

export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
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

    const company = await Company.findOne({
      email: normalizedEmail,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      company.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = generateToken(company._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      companyData: company,
      token,
    });
  } catch (error) {
    console.error("Company login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// ======================================================
// FORGOT COMPANY PASSWORD
// ======================================================

export const forgotCompanyPassword = async (req, res) => {
  try {
    const { email } = req.body || {};

    if (
      !email ||
      typeof email !== "string" ||
      !email.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    console.log(
      "🔐 Employer password reset request:",
      normalizedEmail
    );

    const company = await Company.findOne({
      email: normalizedEmail,
    });

    /*
      We intentionally return the same response whether the
      company exists or not.
    */

    if (!company) {
      console.log(
        "⚠️ No employer account found for:",
        normalizedEmail
      );

      return res.status(200).json({
        success: true,
        message:
          "If an employer account exists with this email, a password reset link has been sent.",
      });
    }

    console.log(
      "✅ Employer account found:",
      company.email
    );

    // ----------------------------------------------------
    // Generate secure reset token
    // ----------------------------------------------------

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Store only hashed token in MongoDB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // ----------------------------------------------------
    // Store token + expiry
    // ----------------------------------------------------

    company.resetPasswordToken = hashedToken;

    // Token expires after 15 minutes
    company.resetPasswordExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await company.save();

    console.log(
      "✅ Employer reset token saved"
    );

    // ----------------------------------------------------
    // Create frontend reset URL
    // ----------------------------------------------------

    const frontendUrl =
      process.env.FRONTEND_URL ||
      "http://localhost:5173";

    const resetUrl =
      `${frontendUrl}/employer-reset-password/${resetToken}`;

    console.log(
      "🔗 Employer reset URL generated"
    );

    // ----------------------------------------------------
    // Send email
    // ----------------------------------------------------

    try {
      const mailResult = await transporter.sendMail({
        from:
          `"Kawakami Overseas Placements" <${process.env.EMAIL_USER}>`,

        to: company.email,

        subject:
          "Reset Your Employer Portal Password",

        html: `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Employer Password Reset</title>
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

    <!-- HEADER -->

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
        Employer Portal
      </p>

    </div>


    <!-- CONTENT -->

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
        Hello ${company.name},
      </p>

      <p
        style="
          color: #555555;
          line-height: 1.6;
        "
      >
        We received a request to reset the password
        for your employer portal account.
      </p>

      <p
        style="
          color: #555555;
          line-height: 1.6;
        "
      >
        Click the button below to create a new password.
      </p>


      <!-- RESET BUTTON -->

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
        "✅ Employer password reset email sent!"
      );

      console.log(
        "📨 Message ID:",
        mailResult.messageId
      );

    } catch (emailError) {
      console.error(
        "❌ Employer password reset email failed:",
        emailError
      );

      // Remove token if email failed
      company.resetPasswordToken = null;
      company.resetPasswordExpires = null;

      await company.save();

      return res.status(500).json({
        success: false,
        message:
          "Unable to send password reset email",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "If an employer account exists with this email, a password reset link has been sent.",
    });

  } catch (error) {
    console.error(
      "Forgot company password error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to process password reset request",
    });
  }
};

// ======================================================
// RESET COMPANY PASSWORD
// ======================================================

export const resetCompanyPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body || {};

    // ----------------------------------------------------
    // Validate token
    // ----------------------------------------------------

    if (
      !token ||
      typeof token !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Reset token is required",
      });
    }

    // ----------------------------------------------------
    // Validate password
    // ----------------------------------------------------

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

    // ----------------------------------------------------
    // Hash token received from frontend
    // ----------------------------------------------------

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // ----------------------------------------------------
    // Find company with valid token
    // ----------------------------------------------------

    const company = await Company.findOne({
      resetPasswordToken: hashedToken,

      resetPasswordExpires: {
        $gt: new Date(),
      },
    });

    if (!company) {
      return res.status(400).json({
        success: false,
        message:
          "Reset link is invalid or has expired",
      });
    }

    console.log(
      "✅ Valid employer reset token found for:",
      company.email
    );

    // ----------------------------------------------------
    // Hash new password
    // ----------------------------------------------------

    const hashedPassword =
      await bcrypt.hash(password, 10);

    company.password = hashedPassword;

    // ----------------------------------------------------
    // Invalidate reset token
    // ----------------------------------------------------

    company.resetPasswordToken = null;
    company.resetPasswordExpires = null;

    await company.save();

    console.log(
      "✅ Employer password reset successfully:",
      company.email
    );

    return res.status(200).json({
      success: true,
      message:
        "Password reset successfully. You can now login with your new password.",
    });

  } catch (error) {
    console.error(
      "Reset company password error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to reset employer password",
    });
  }
};

// ======================================================
// FETCH COMPANY DATA
// ======================================================

export const fetchCompanyData = async (req, res) => {
  try {
    const company = req.companyData;

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company data fetched successfully",
      companyData: company,
    });
  } catch (error) {
    console.error(
      "Fetch company data error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch company data",
    });
  }
};

// ======================================================
// POST JOB
// ======================================================

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      level,
      country,
      location,
      currency,
      salaryMin,
      salaryMax,
      salaryPeriod,
    } = req.body;

    // --------------------------------------------------
    // Required field validation
    // --------------------------------------------------

    if (
      !title?.trim() ||
      !description ||
      !category?.trim() ||
      !level?.trim() ||
      !country?.trim() ||
      !location?.trim() ||
      !currency?.trim() ||
      !salaryPeriod?.trim() ||
      salaryMin === undefined ||
      salaryMin === null ||
      salaryMin === "" ||
      salaryMax === undefined ||
      salaryMax === null ||
      salaryMax === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // --------------------------------------------------
    // Salary validation
    // --------------------------------------------------

    const minSalary = Number(salaryMin);
    const maxSalary = Number(salaryMax);

    if (
      Number.isNaN(minSalary) ||
      Number.isNaN(maxSalary) ||
      minSalary < 0 ||
      maxSalary < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter valid salary values",
      });
    }

    if (minSalary > maxSalary) {
      return res.status(400).json({
        success: false,
        message:
          "Minimum salary cannot be greater than maximum salary",
      });
    }

    // --------------------------------------------------
    // Logged-in company
    // --------------------------------------------------

    const companyId = req.companyData?._id;

    if (!companyId) {
      return res.status(401).json({
        success: false,
        message:
          "Company authentication required",
      });
    }

    // --------------------------------------------------
    // Create job
    // --------------------------------------------------

    const job = new Job({
      title: title.trim(),
      description,
      category: category.trim(),
      level: level.trim(),

      country: country.trim(),
      location: location.trim(),

      currency: currency.trim().toUpperCase(),
      salaryMin: minSalary,
      salaryMax: maxSalary,
      salaryPeriod: salaryPeriod.trim(),

      companyId,
      date: Date.now(),
    });

    await job.save();

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      jobData: job,
    });
  } catch (error) {
    console.error(
      "Error posting job:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message || "Job posting failed",
    });
  }
};

// ======================================================
// GET ALL JOBS POSTED BY COMPANY
// ======================================================

export const getCompanyPostedAllJobs = async (req, res) => {
  try {
    const companyId = req.companyData?._id;

    if (!companyId) {
      return res.status(401).json({
        success: false,
        message:
          "Company authentication required",
      });
    }

    const jobs = await Job.find({
      companyId,
    }).sort({
      date: -1,
    });

    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants =
          await JobApplication.countDocuments({
            jobId: job._id,
          });

        return {
          ...job.toObject(),
          applicants,
        };
      })
    );

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      jobData: jobsData,
    });
  } catch (error) {
    console.error(
      "Job fetching error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Job fetching failed",
    });
  }
};

// ======================================================
// CHANGE JOB VISIBILITY
// ======================================================

export const changeJobVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.companyData?._id;

    if (!companyId) {
      return res.status(401).json({
        success: false,
        message:
          "Company authentication required",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Ensure the logged-in employer owns this job
    if (
      job.companyId.toString() !==
      companyId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorised to modify this job",
      });
    }

    job.visible = !job.visible;

    await job.save();

    return res.status(200).json({
      success: true,
      message: job.visible
        ? "Job is now visible"
        : "Job is now hidden",
      visible: job.visible,
    });
  } catch (error) {
    console.error(
      "Error changing job visibility:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Visibility change failed",
    });
  }
};

// ======================================================
// GET COMPANY JOB APPLICANTS
// ======================================================

export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.companyData?._id;

    if (!companyId) {
      return res.status(401).json({
        success: false,
        message:
          "Company authentication required",
      });
    }

    const applicants =
      await JobApplication.find({
        companyId,
      })
        .populate(
          "userId",
          "name image resume"
        )
        .populate(
          "jobId",
          "title country location date status category level salaryMin salaryMax currency salaryPeriod"
        );

    return res.status(200).json({
      success: true,
      message:
        "Applicants fetched successfully",
      viewApplicationData: applicants,
    });
  } catch (error) {
    console.error(
      "Fetch applicants error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applicants",
    });
  }
};

// ======================================================
// CHANGE APPLICATION STATUS
// ======================================================

export const changeStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const companyId = req.companyData?._id;

    if (!companyId) {
      return res.status(401).json({
        success: false,
        message:
          "Company authentication required",
      });
    }

    if (!id || !status) {
      return res.status(400).json({
        success: false,
        message:
          "Application ID and status are required",
      });
    }

    const application =
      await JobApplication.findOne({
        _id: id,
        companyId,
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message:
          "Job application not found",
      });
    }

    application.status = status;

    await application.save();

    return res.status(200).json({
      success: true,
      message:
        "Status changed successfully",
      application,
    });
  } catch (error) {
    console.error(
      "Change application status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to change status",
    });
  }
};
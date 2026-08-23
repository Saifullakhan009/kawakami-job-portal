import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

const companyAuthMiddleware = async (req, res, next) => {
  try {
    // Get company token from request headers
    const token = req.headers.token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login again.",
      });
    }

    // Check if JWT secret exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");

      return res.status(500).json({
        success: false,
        message: "Server authentication configuration error.",
      });
    }

    // Verify token
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find company
    const company = await Company.findById(
      decodedToken.id
    ).select("-password");

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    // Attach company data to request
    req.companyData = company;

    next();
  } catch (error) {
    console.error("Company authentication error:", error.message);

    // Expired JWT
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    // Invalid JWT
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token. Please login again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Authentication failed. Please login again.",
    });
  }
};

export default companyAuthMiddleware;
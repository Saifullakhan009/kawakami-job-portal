import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  // ================= BASIC JOB INFORMATION =================

  title: {
    type: String,
    required: true,
    trim: true,
  },

  category: {
    type: String,
    required: true,
    trim: true,
  },

  level: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  // ================= LOCATION INFORMATION =================

  country: {
    type: String,
    required: true,
    trim: true,
  },

  location: {
    type: String,
    required: true,
    trim: true,
  },

  // ================= SALARY INFORMATION =================

  currency: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },

  salaryMin: {
    type: Number,
    required: true,
    min: 0,
  },

  salaryMax: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (value) {
        return value >= this.salaryMin;
      },
      message: "Maximum salary cannot be less than minimum salary",
    },
  },

  salaryPeriod: {
    type: String,
    required: true,
    enum: ["Hour", "Day", "Week", "Month", "Year"],
    default: "Month",
  },

  // ================= COMPANY =================

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },

  // ================= JOB MANAGEMENT =================

  date: {
    type: Number,
    default: Date.now,
  },

  visible: {
    type: Boolean,
    default: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
import React from "react";
import { Route, Routes } from "react-router-dom";

import AppLayout from "./layout/AppLayout";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import AllJobs from "./pages/AllJobs";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";

// Candidate Authentication
import CandidatesLogin from "./pages/CandidatesLogin";
import CandidatesSignup from "./pages/CandidatesSignup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Recruiter Authentication
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterSignup from "./pages/RecruiterSignup";
import EmployerResetPassword from "./pages/EmployerResetPassword";

// Recruiter Dashboard
import Dashboard from "./pages/Dashboard";
import AddJobs from "./pages/AddJobs";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";

const App = () => {
  return (
    <AppLayout>
      <Routes>

        {/* =========================
            PUBLIC PAGES
        ========================== */}

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/terms" element={<Terms />} />


        {/* =========================
            JOB PAGES
        ========================== */}

        <Route
          path="/all-jobs/:category"
          element={<AllJobs />}
        />

        <Route
          path="/apply-job/:id"
          element={<ApplyJob />}
        />

        <Route
          path="/applications"
          element={<Applications />}
        />


        {/* =========================
            CANDIDATE AUTHENTICATION
        ========================== */}

        {/* Candidate Login */}
        <Route
          path="/candidate-login"
          element={<CandidatesLogin />}
        />

        {/* Candidate Registration */}
        <Route
          path="/candidate-signup"
          element={<CandidatesSignup />}
        />

        {/* Forgot Password */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Reset Password */}
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />


        {/* =========================
            RECRUITER AUTHENTICATION
        ========================== */}

        <Route
          path="/recruiter-login"
          element={<RecruiterLogin />}
        />

        <Route
          path="/recruiter-signup"
          element={<RecruiterSignup />}
        />

        <Route
          path="/employer-reset-password/:token"
           element={<EmployerResetPassword />}
        />


        {/* =========================
            RECRUITER DASHBOARD
        ========================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        >
          <Route
            path="add-job"
            element={<AddJobs />}
          />

          <Route
            path="manage-jobs"
            element={<ManageJobs />}
          />

          <Route
            path="view-applications"
            element={<ViewApplications />}
          />
        </Route>

      </Routes>
    </AppLayout>
  );
};

export default App;
import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const EmployerResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!password || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Invalid or missing password reset token.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/company/reset-password/${token}`,
        {
          password,
        }
      );

      if (data.success) {
        setMessage(
          "Your employer password has been reset successfully. You can now log in with your new password."
        );

        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/recruiter-login");
        }, 2000);
      } else {
        setError(
          data.message || "Unable to reset your password."
        );
      }
    } catch (error) {
      console.error("Employer reset password error:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to reset your password. The reset link may have expired or is invalid."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-[#f7f7f5] px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-200">
        <div className="grid md:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="bg-[#11110f] px-8 py-12 md:px-12 flex flex-col justify-center">
            <div>
              <div className="w-14 h-14 rounded-xl border border-[#d4af37] flex items-center justify-center mb-8">
                <span className="text-2xl text-[#d4af37]">
                  🔐
                </span>
              </div>

              <p className="text-sm tracking-[0.3em] font-semibold text-[#d4af37] uppercase mb-5">
                Employer Portal
              </p>

              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Create a New
                <span className="block text-[#d4af37]">
                  Password
                </span>
              </h1>

              <p className="mt-6 text-gray-300 leading-7">
                Secure your Kawakami Overseas Placements employer
                account by creating a new password.
              </p>
            </div>

            <div className="space-y-5 mt-10">

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center">
                  <span className="text-[#d4af37]">
                    🔑
                  </span>
                </div>

                <span className="text-gray-200 text-sm">
                  Create a strong password
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center">
                  <span className="text-[#d4af37]">
                    🔒
                  </span>
                </div>

                <span className="text-gray-200 text-sm">
                  Secure your employer account
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center">
                  <span className="text-[#d4af37]">
                    ✓
                  </span>
                </div>

                <span className="text-gray-200 text-sm">
                  Continue managing recruitment
                </span>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="px-8 py-12 md:px-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">

              <h2 className="text-3xl font-bold text-gray-900">
                Reset Your{" "}
                <span className="text-[#d4af37]">
                  Password
                </span>
              </h2>

              <p className="mt-3 text-gray-600 leading-6">
                Enter your new password below to regain access
                to the employer portal.
              </p>

              {/* SUCCESS MESSAGE */}
              {message && (
                <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-4">
                  <p className="text-sm text-green-700">
                    {message}
                  </p>
                </div>
              )}

              {/* ERROR MESSAGE */}
              {error && (
                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-4">
                  <p className="text-sm text-red-700">
                    {error}
                  </p>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8"
              >

                {/* NEW PASSWORD */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    New Password
                  </label>

                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#d4af37] focus-within:ring-1 focus-within:ring-[#d4af37]">

                    <div className="px-4 text-[#d4af37]">
                      🔒
                    </div>

                    <input
                      type="password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your new password"
                      className="w-full px-2 py-4 outline-none text-gray-800"
                      disabled={loading}
                    />

                  </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="mt-5">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Confirm New Password
                  </label>

                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#d4af37] focus-within:ring-1 focus-within:ring-[#d4af37]">

                    <div className="px-4 text-[#d4af37]">
                      🔒
                    </div>

                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Confirm your new password"
                      className="w-full px-2 py-4 outline-none text-gray-800"
                      disabled={loading}
                    />

                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full mt-6 py-4 rounded-lg font-semibold transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-[#d4af37] hover:bg-[#c29d2e] text-black"
                  }`}
                >
                  {loading
                    ? "Resetting Password..."
                    : "Reset Employer Password"}
                </button>

              </form>

              {/* BACK TO LOGIN */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <Link
                  to="/recruiter-login"
                  className="text-sm font-semibold text-[#b98c0b] hover:text-[#8f6c08] transition"
                >
                  ← Back to Employer Login
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployerResetPassword;
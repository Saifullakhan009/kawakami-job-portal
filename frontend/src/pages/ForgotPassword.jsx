import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/user/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage(
          "If an account exists with this email, a password reset link has been sent."
        );
        setEmail("");
      } else {
        setError(data.message || "Unable to process your request.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setError(
        "Unable to connect to the server. Please try again later."
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
            <div className="mb-8">
              <div className="w-14 h-14 rounded-xl border border-[#d4af37] flex items-center justify-center mb-8">
                <span className="text-2xl text-[#d4af37]">🔐</span>
              </div>

              <p className="text-sm tracking-[0.3em] font-semibold text-[#d4af37] uppercase mb-5">
                Candidate Portal
              </p>

              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Reset Your
                <span className="block text-[#d4af37]">
                  Password
                </span>
              </h1>

              <p className="mt-6 text-gray-300 leading-7">
                Forgot your password? Don't worry. Enter your registered
                email address and we'll send you a secure password reset
                link.
              </p>
            </div>

            <div className="space-y-5 mt-4">

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center">
                  <span className="text-[#d4af37]">✉</span>
                </div>

                <span className="text-gray-200 text-sm">
                  Enter your registered email
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center">
                  <span className="text-[#d4af37]">🔗</span>
                </div>

                <span className="text-gray-200 text-sm">
                  Receive a secure reset link
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center">
                  <span className="text-[#d4af37]">🔒</span>
                </div>

                <span className="text-gray-200 text-sm">
                  Create a new password securely
                </span>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="px-8 py-12 md:px-12 flex flex-col justify-center">

            <div className="max-w-md w-full mx-auto">

              <h2 className="text-3xl font-bold text-gray-900">
                Forgot <span className="text-[#d4af37]">Password?</span>
              </h2>

              <p className="mt-3 text-gray-600 leading-6">
                Enter the email address associated with your candidate
                account. We'll send you a link to reset your password.
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

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Email Address
                  </label>

                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#d4af37] focus-within:ring-1 focus-within:ring-[#d4af37]">
                    <div className="px-4 text-[#d4af37]">
                      ✉
                    </div>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-2 py-4 outline-none text-gray-800"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
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
                    ? "Sending Reset Link..."
                    : "Send Reset Link"}
                </button>

              </form>

              {/* BACK TO LOGIN */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <Link
                  to="/candidate-login"
                  className="text-sm font-semibold text-[#b98c0b] hover:text-[#8f6c08] transition"
                >
                  ← Back to Candidate Login
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
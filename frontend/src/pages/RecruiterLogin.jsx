import { Lock, Mail, LoaderCircle, BriefcaseBusiness } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const RecruiterLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { backendUrl, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  const navigate = useNavigate();

  const recruiterLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/company/login-company`,
        {
          email: email.trim(),
          password,
        }
      );

      if (data.success) {
        setCompanyToken(data.token);
        setCompanyData(data.companyData);

        // Keep existing token behaviour so dashboard authentication
        // continues to work with the current application.
        localStorage.setItem("companyToken", data.token);

        toast.success(data.message || "Login successful");
        navigate("/dashboard");
        window.scrollTo(0, 0);
      } else {
        toast.error(data.message || "Invalid email or password.");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          {/* Login Section */}
          <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:grid-cols-2">
            
            {/* Left Branding Panel */}
            <div className="relative hidden bg-[#111111] p-12 lg:flex lg:flex-col lg:justify-between">
              {/* Decorative glow */}
              <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-[#D4AF37]/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[#D4AF37]/5 blur-3xl" />

              <div className="relative">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10">
                  <BriefcaseBusiness
                    size={27}
                    strokeWidth={1.8}
                    className="text-[#D4AF37]"
                  />
                </div>

                <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
                  Employer Portal
                </p>

                <h2 className="max-w-md text-4xl font-bold leading-tight text-white">
                  Manage Your{" "}
                  <span className="text-[#D4AF37]">
                    Recruitment
                  </span>{" "}
                  With KOP
                </h2>

                <p className="mt-6 max-w-md leading-7 text-gray-400">
                  Access your employer dashboard to publish opportunities,
                  manage job listings, and review candidate applications.
                </p>
              </div>

              <div className="relative mt-16 border-t border-[#D4AF37]/20 pt-6">
                <p className="text-sm leading-6 text-gray-400">
                  From specialised equestrian recruitment to global career
                  opportunities.
                </p>
              </div>
            </div>

            {/* Right Login Panel */}
            <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
              <div className="mx-auto max-w-md">
                {/* Mobile label */}
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#B68D2A] lg:hidden">
                  Employer Portal
                </p>

                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-[#111111] sm:text-4xl">
                    Employer{" "}
                    <span className="text-[#D4AF37]">Login</span>
                  </h1>

                  <p className="mt-3 leading-7 text-gray-600">
                    Sign in to manage jobs, applications, and your recruitment
                    activity with Kawakami Overseas Placements.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={recruiterLogin}>
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="employer-email"
                      className="mb-2 block text-sm font-semibold text-[#111111]"
                    >
                      Email Address
                    </label>

                    <div className="flex items-center rounded-lg border border-gray-300 bg-white px-4 transition-all duration-200 focus-within:border-[#D4AF37] focus-within:ring-2 focus-within:ring-[#D4AF37]/20">
                      <Mail
                        size={19}
                        strokeWidth={1.8}
                        className="mr-3 shrink-0 text-[#B68D2A]"
                      />

                      <input
                        id="employer-email"
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="employer-password"
                      className="mb-2 block text-sm font-semibold text-[#111111]"
                    >
                      Password
                    </label>

                    <div className="flex items-center rounded-lg border border-gray-300 bg-white px-4 transition-all duration-200 focus-within:border-[#D4AF37] focus-within:ring-2 focus-within:ring-[#D4AF37]/20">
                      <Lock
                        size={19}
                        strokeWidth={1.8}
                        className="mr-3 shrink-0 text-[#B68D2A]"
                      />

                      <input
                        id="employer-password"
                        type="password"
                        placeholder="Enter your password"
                        className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                      />
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center">
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 cursor-pointer accent-[#D4AF37]"
                      />

                      <span className="text-sm text-gray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex w-full items-center justify-center rounded-lg bg-[#D4AF37] px-5 py-3.5 font-bold text-[#111111] transition-all duration-300 hover:bg-[#C49D2F] hover:shadow-lg ${
                      loading
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer"
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <LoaderCircle className="h-5 w-5 animate-spin" />
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      "Login to Employer Portal"
                    )}
                  </button>

                  {/* Signup */}
                  <div className="border-t border-gray-100 pt-5 text-center">
                    <p className="text-sm text-gray-600">
                      New employer?{" "}
                      <Link
                        to="/recruiter-signup"
                        className="font-bold text-[#B68D2A] transition-colors hover:text-[#D4AF37]"
                      >
                        Create an Account
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Security / information note */}
          <p className="mt-6 text-center text-xs leading-5 text-gray-500">
            Employer access is intended for organisations managing recruitment
            opportunities through Kawakami Overseas Placements.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RecruiterLogin;
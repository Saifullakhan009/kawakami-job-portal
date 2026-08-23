import axios from "axios";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  EyeOff,
  Globe2,
  LoaderCircle,
  Lock,
  Mail,
  ShieldCheck,
  Upload,
  UserRound,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";

const CandidatesSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { backendUrl, setUserData, setUserToken, setIsLogin } =
    useContext(AppContext);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const userSignupHanlder = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload your profile photo");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/user/register-user`,
        formData
      );

      if (data.success) {
        setUserToken(data.token);
        setUserData(data.userData);
        setIsLogin(true);

        localStorage.setItem("userToken", data.token);

        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to create candidate account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#f5f5f3] px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl lg:grid-cols-2">

          {/* ================= LEFT PANEL ================= */}
          <section className="relative hidden min-h-[760px] overflow-hidden bg-[#10100f] p-12 text-white lg:flex lg:flex-col lg:justify-between">

            {/* Decorative gold glow */}
            <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#d4af37]/10 blur-3xl" />

            <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#d4af37]/5 blur-3xl" />

            <div className="relative z-10">
              {/* Icon */}
              <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10">
                <BriefcaseBusiness className="h-7 w-7 text-[#d4af37]" />
              </div>

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                Candidate Registration
              </p>

              <h1 className="max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
                Build Your Career
                <span className="block text-[#d4af37]">
                  Beyond Borders
                </span>
              </h1>

              <p className="mt-6 max-w-md text-[15px] leading-7 text-gray-400">
                Create your candidate account and discover international
                employment opportunities through Kawakami Overseas Placements.
              </p>

              {/* Benefits */}
              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/40">
                    <Globe2 className="h-4 w-4 text-[#d4af37]" />
                  </div>

                  <span className="text-sm text-gray-300">
                    Explore overseas employment opportunities
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/40">
                    <CheckCircle2 className="h-4 w-4 text-[#d4af37]" />
                  </div>

                  <span className="text-sm text-gray-300">
                    Apply directly to available job openings
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/40">
                    <ShieldCheck className="h-4 w-4 text-[#d4af37]" />
                  </div>

                  <span className="text-sm text-gray-300">
                    Track your applications securely
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom text */}
            <div className="relative z-10 border-t border-[#d4af37]/20 pt-7">
              <p className="max-w-md text-sm leading-6 text-gray-400">
                Connecting skilled professionals with international employers
                while supporting candidates throughout their overseas
                recruitment journey.
              </p>
            </div>
          </section>

          {/* ================= RIGHT PANEL ================= */}
          <section className="flex min-h-[760px] items-center justify-center px-6 py-12 sm:px-12 lg:px-16">

            <div className="w-full max-w-md">

              {/* Heading */}
              <div className="mb-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#c89d18] lg:hidden">
                  Candidate Registration
                </p>

                <h2 className="text-3xl font-bold text-[#151515]">
                  Candidate{" "}
                  <span className="text-[#d4af37]">
                    Sign Up
                  </span>
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Create your account to discover opportunities and manage
                  your job applications.
                </p>
              </div>

              <form
                className="space-y-5"
                onSubmit={userSignupHanlder}
              >

                {/* ================= PROFILE IMAGE ================= */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Profile Photo
                  </label>

                  <label className="group flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-[#d4af37] hover:bg-[#d4af37]/5">

                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white">

                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Candidate preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Upload className="h-6 w-6 text-[#c89d18]" />
                      )}

                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold text-gray-800">
                        {image
                          ? image.name
                          : "Upload your profile photo"}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Select a professional image for your candidate profile.
                      </p>

                      {image && (
                        <p className="mt-1 text-xs font-semibold text-[#b98c0b]">
                          Click to change photo
                        </p>
                      )}

                    </div>

                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        setImage(e.target.files?.[0] || null)
                      }
                    />

                  </label>
                </div>

                {/* ================= FULL NAME ================= */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Full Name
                  </label>

                  <div className="flex h-13 items-center rounded-lg border border-gray-300 bg-white transition focus-within:border-[#d4af37] focus-within:ring-2 focus-within:ring-[#d4af37]/10">

                    <div className="flex h-full w-12 shrink-0 items-center justify-center border-r border-gray-200">
                      <UserRound className="h-5 w-5 text-[#c89d18]" />
                    </div>

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="h-full w-full bg-transparent px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      required
                    />

                  </div>
                </div>

                {/* ================= EMAIL ================= */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Email Address
                  </label>

                  <div className="flex h-13 items-center rounded-lg border border-gray-300 bg-white transition focus-within:border-[#d4af37] focus-within:ring-2 focus-within:ring-[#d4af37]/10">

                    <div className="flex h-full w-12 shrink-0 items-center justify-center border-r border-gray-200">
                      <Mail className="h-5 w-5 text-[#c89d18]" />
                    </div>

                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="h-full w-full bg-transparent px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />

                  </div>
                </div>

                {/* ================= PASSWORD ================= */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Password
                  </label>

                  <div className="flex h-13 items-center rounded-lg border border-gray-300 bg-white transition focus-within:border-[#d4af37] focus-within:ring-2 focus-within:ring-[#d4af37]/10">

                    <div className="flex h-full w-12 shrink-0 items-center justify-center border-r border-gray-200">
                      <Lock className="h-5 w-5 text-[#c89d18]" />
                    </div>

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a secure password"
                      className="h-full w-full bg-transparent px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="mr-4 text-gray-400 transition hover:text-[#c89d18]"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >

                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}

                    </button>

                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    Use a strong password to protect your candidate account.
                  </p>
                </div>

                {/* ================= TERMS ================= */}

                <label
                  htmlFor="terms-checkbox"
                  className="flex cursor-pointer items-start gap-2 text-sm text-gray-600"
                >

                  <input
                    id="terms-checkbox"
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#d4af37]"
                    required
                  />

                  <span>
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="font-semibold text-[#b98c0b] transition hover:text-[#8f6c08]"
                    >
                      Terms and Conditions
                    </Link>
                  </span>

                </label>

                {/* ================= CREATE ACCOUNT ================= */}

                <button
                  type="submit"
                  disabled={loading}
                  className={`flex h-13 w-full items-center justify-center rounded-lg bg-[#d4af37] px-4 font-semibold text-[#111] transition duration-200 hover:bg-[#c39b25] ${
                    loading
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }`}
                >

                  {loading ? (
                    <>
                      <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Candidate Account"
                  )}

                </button>

                {/* ================= LOGIN LINK ================= */}

                <div className="border-t border-gray-200 pt-6 text-center">

                  <p className="text-sm text-gray-600">
                    Already have a candidate account?{" "}

                    <Link
                      to="/candidate-login"
                      className="font-semibold text-[#b98c0b] transition hover:text-[#8f6c08]"
                    >
                      Login Here
                    </Link>

                  </p>

                </div>

              </form>

              <p className="mt-7 text-center text-xs leading-5 text-gray-400">
                Your profile information is used to support your recruitment
                and job application experience.
              </p>

            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CandidatesSignup;
import React, { useContext, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  Mail,
  Lock,
  LoaderCircle,
  BriefcaseBusiness,
  Search,
  Globe2,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CandidatesLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { backendUrl, setUserData, setUserToken, setIsLogin } =
    useContext(AppContext);

  const userLoginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${backendUrl}/user/login-user`, {
        email,
        password,
      });

      if (data.success) {
        setUserToken(data.token);
        setUserData(data.userData);
        setIsLogin(true);

        localStorage.setItem("userToken", data.token);

        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
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

          {/* LEFT SIDE */}
          <section className="relative hidden min-h-[650px] overflow-hidden bg-[#10100f] p-12 text-white lg:flex lg:flex-col lg:justify-between">

            {/* Gold glow */}
            <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#d4af37]/10 blur-3xl" />
            <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#d4af37]/5 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10">
                <BriefcaseBusiness className="h-7 w-7 text-[#d4af37]" />
              </div>

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                Candidate Portal
              </p>

              <h1 className="max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
                Your Next Career
                <span className="block text-[#d4af37]">
                  Opportunity Awaits
                </span>
              </h1>

              <p className="mt-6 max-w-md text-[15px] leading-7 text-gray-400">
                Discover international employment opportunities and connect
                with employers through Kawakami Overseas Placements.
              </p>

              <div className="mt-10 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d4af37]/40">
                    <Search className="h-4 w-4 text-[#d4af37]" />
                  </div>
                  <span className="text-sm text-gray-300">
                    Explore verified job opportunities
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d4af37]/40">
                    <Globe2 className="h-4 w-4 text-[#d4af37]" />
                  </div>
                  <span className="text-sm text-gray-300">
                    Discover overseas career opportunities
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d4af37]/40">
                    <ShieldCheck className="h-4 w-4 text-[#d4af37]" />
                  </div>
                  <span className="text-sm text-gray-300">
                    Track your applications securely
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 border-t border-[#d4af37]/20 pt-7">
              <p className="max-w-md text-sm leading-6 text-gray-400">
                Connecting skilled professionals with international employers
                and supporting candidates throughout their overseas
                recruitment journey.
              </p>
            </div>
          </section>

          {/* RIGHT SIDE */}
          <section className="flex min-h-[650px] items-center justify-center px-6 py-12 sm:px-12 lg:px-16">
            <div className="w-full max-w-md">

              <div className="mb-9">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#c89d18] lg:hidden">
                  Candidate Portal
                </p>

                <h2 className="text-3xl font-bold text-[#151515]">
                  Candidate <span className="text-[#d4af37]">Login</span>
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Welcome back. Login to explore opportunities and manage your
                  applications.
                </p>
              </div>

              <form onSubmit={userLoginHandler} className="space-y-5">

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Email Address
                  </label>

                  <div className="flex h-13 items-center rounded-lg border border-gray-300 bg-white transition focus-within:border-[#d4af37] focus-within:ring-2 focus-within:ring-[#d4af37]/10">
                    <div className="flex h-full w-12 items-center justify-center border-r border-gray-200">
                      <Mail className="h-5 w-5 text-[#c89d18]" />
                    </div>

                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="h-full w-full bg-transparent px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Password
                  </label>

                  <div className="flex h-13 items-center rounded-lg border border-gray-300 bg-white transition focus-within:border-[#d4af37] focus-within:ring-2 focus-within:ring-[#d4af37]/10">
                    <div className="flex h-full w-12 items-center justify-center border-r border-gray-200">
                      <Lock className="h-5 w-5 text-[#c89d18]" />
                    </div>

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-full w-full bg-transparent px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="mr-4 text-gray-400 transition hover:text-[#c89d18]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* REMEMBER ME + FORGOT PASSWORD */}
                <div className="flex items-center justify-between">

                <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[#d4af37]"
                    />

                    <span className="text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-[#b98c0b] transition hover:text-[#8f6c08]"
                  >
                    Forgot Password?
                  </Link>

                </div>

                {/* LOGIN */}
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
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                  ) : (
                    "Login to Candidate Portal"
                  )}
                </button>

                {/* SIGN UP */}
                <div className="border-t border-gray-200 pt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have a candidate account?{" "}
                    <Link
                      to="/candidate-signup"
                      className="font-semibold text-[#b98c0b] transition hover:text-[#8f6c08]"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>

              <p className="mt-8 text-center text-xs leading-5 text-gray-400">
                By accessing the candidate portal, you agree to Kawakami
                Overseas Placements' terms and recruitment policies.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CandidatesLogin;
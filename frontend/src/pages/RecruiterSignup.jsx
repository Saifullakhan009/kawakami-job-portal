import axios from "axios";
import {
  Lock,
  Mail,
  Upload,
  UserRound,
  LoaderCircle,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RecruiterSignup = () => {
  const [companyLogo, setCompanyLogo] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  const navigate = useNavigate();

  const recruiterSignup = async (e) => {
    e.preventDefault();

    if (!companyLogo) {
      toast.error("Please upload your company logo.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", companyLogo);

      const { data } = await axios.post(
        `${backendUrl}/company/register-company`,
        formData
      );

      if (data.success) {
        setCompanyToken(data.token);
        setCompanyData(data.companyData);
        localStorage.setItem("companyToken", data.token);

        toast.success(data.message || "Employer account created successfully.");

        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to create employer account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Main Signup Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* LEFT SIDE */}
            <div className="relative bg-[#111111] px-8 py-12 sm:px-12 lg:px-14 lg:py-14 flex flex-col justify-between overflow-hidden">
              {/* Gold background glow */}
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10">
                  <BriefcaseBusiness
                    size={27}
                    className="text-[#D4AF37]"
                  />
                </div>

                <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
                  Employer Registration
                </p>

                <h1 className="max-w-md text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Build Your Recruitment{" "}
                  <span className="text-[#D4AF37]">With KOP</span>
                </h1>

                <p className="mt-7 max-w-md leading-7 text-gray-400">
                  Create your employer account to publish opportunities,
                  manage job listings, and connect with candidates through
                  Kawakami Overseas Placements.
                </p>

                {/* Features */}
                <div className="mt-9 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#D4AF37]"
                    />
                    <span>Publish overseas employment opportunities</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#D4AF37]"
                    />
                    <span>Manage your active job listings</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#D4AF37]"
                    />
                    <span>Review candidate applications</span>
                  </div>
                </div>
              </div>

              {/* Bottom message */}
              <div className="relative z-10 mt-14 border-t border-[#D4AF37]/20 pt-7">
                <p className="text-sm text-gray-400">
                  From specialised equestrian recruitment to global career
                  opportunities.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="px-8 py-10 sm:px-12 lg:px-14 lg:py-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#111111]">
                  Employer{" "}
                  <span className="text-[#D4AF37]">Sign Up</span>
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Create your employer account to access the KOP recruitment
                  portal.
                </p>
              </div>

              <form onSubmit={recruiterSignup} className="space-y-5">
                {/* Company Logo */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#111111]">
                    Company Logo
                  </label>

                  <label className="group flex cursor-pointer items-center gap-5 rounded-xl border border-dashed border-gray-300 p-4 transition hover:border-[#D4AF37] hover:bg-[#D4AF37]/5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                      {companyLogo ? (
                        <img
                          src={URL.createObjectURL(companyLogo)}
                          alt="Company logo preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Upload size={23} className="text-[#C89B1F]" />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {companyLogo
                          ? companyLogo.name
                          : "Upload company logo"}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Select an image for your employer profile.
                      </p>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        setCompanyLogo(e.target.files?.[0] || null)
                      }
                      required
                    />
                  </label>
                </div>

                {/* Company Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#111111]">
                    Company Name
                  </label>

                  <div className="flex items-center rounded-lg border border-gray-300 px-4 transition focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37]">
                    <UserRound
                      size={19}
                      className="mr-3 shrink-0 text-[#C89B1F]"
                    />

                    <input
                      type="text"
                      placeholder="Enter company name"
                      className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-gray-400"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#111111]">
                    Email Address
                  </label>

                  <div className="flex items-center rounded-lg border border-gray-300 px-4 transition focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37]">
                    <Mail
                      size={19}
                      className="mr-3 shrink-0 text-[#C89B1F]"
                    />

                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-gray-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#111111]">
                    Password
                  </label>

                  <div className="flex items-center rounded-lg border border-gray-300 px-4 transition focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37]">
                    <Lock
                      size={19}
                      className="mr-3 shrink-0 text-[#C89B1F]"
                    />

                    <input
                      type="password"
                      placeholder="Create your password"
                      className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-gray-400"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 accent-[#D4AF37]"
                  />

                  <span>
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="font-semibold text-[#B88912] hover:text-[#D4AF37]"
                    >
                      Terms and Conditions
                    </Link>
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex w-full items-center justify-center rounded-lg bg-[#D4AF37] px-5 py-3.5 font-bold text-[#111111] transition duration-200 hover:bg-[#C9A227] ${
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
                    "Create Employer Account"
                  )}
                </button>

                {/* Login */}
                <div className="border-t border-gray-100 pt-5 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an employer account?{" "}
                    <Link
                      to="/recruiter-login"
                      className="font-semibold text-[#B88912] transition hover:text-[#D4AF37]"
                    >
                      Login Here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Security / access message */}
          <p className="mt-7 text-center text-xs leading-6 text-gray-500">
            Employer registration is intended for organisations recruiting
            candidates through Kawakami Overseas Placements.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RecruiterSignup;
import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import {
  LoaderCircle,
  BriefcaseBusiness,
  MapPin,
  Banknote,
} from "lucide-react";
import { JobCategories } from "../assets/assets";
import { countryData, currencies } from "../utils/countryData";

const jobLevels = [
  "Entry Level",
  "Experienced",
  "Skilled",
  "Supervisor",
  "Management",
];

const salaryPeriods = ["Month", "Day", "Week", "Hour", "Year"];

const AddJob = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState(JobCategories[0] || "");
  const [level, setLevel] = useState("Entry Level");

  const [country, setCountry] = useState("United Arab Emirates");
  const [location, setLocation] = useState("");

  const [currency, setCurrency] = useState("AED");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [salaryPeriod, setSalaryPeriod] = useState("Month");

  const [loading, setLoading] = useState(false);

  const { backendUrl, companyToken } = useContext(AppContext);

  // Automatically select the country's currency
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;

    setCountry(selectedCountry);

    const selectedCountryData = countryData.find(
      (item) => item.country === selectedCountry
    );

    if (selectedCountryData) {
      setCurrency(selectedCountryData.currency);
    }
  };

  // Post job
  const postJob = async (e) => {
    e.preventDefault();

    if (!description || description === "<p><br></p>") {
      toast.error("Please enter a job description.");
      return;
    }

    if (!location.trim()) {
      toast.error("Please enter the job city or location.");
      return;
    }

    const minSalary = Number(salaryMin);
    const maxSalary = Number(salaryMax);

    if (
      Number.isNaN(minSalary) ||
      Number.isNaN(maxSalary) ||
      minSalary < 0 ||
      maxSalary < 0
    ) {
      toast.error("Please enter valid salary values.");
      return;
    }

    if (minSalary > maxSalary) {
      toast.error("Minimum salary cannot be greater than maximum salary.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/company/post-job`,
        {
          title: title.trim(),
          description,
          category,
          level,

          country,
          location: location.trim(),

          currency,
          salaryMin: minSalary,
          salaryMax: maxSalary,
          salaryPeriod,
        },
        {
          headers: {
            token: companyToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message || "Job posted successfully.");

        // Reset form
        setTitle("");
        setDescription("");
        setCategory(JobCategories[0] || "");
        setLevel("Entry Level");

        setCountry("United Arab Emirates");
        setLocation("");

        setCurrency("AED");
        setSalaryMin("");
        setSalaryMax("");
        setSalaryPeriod("Month");

        if (quillRef.current) {
          quillRef.current.setText("");
        }
      } else {
        toast.error(data.message || "Unable to post job.");
      }
    } catch (error) {
      console.error("Post Job Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while posting the job."
      );
    } finally {
      setLoading(false);
    }
  };

  // Initialize Quill editor
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder:
          "Describe the role, responsibilities, requirements, experience and other important details...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ header: [1, 2, 3, false] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        },
      });

      quillRef.current.on("text-change", () => {
        setDescription(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  useEffect(() => {
    document.title = "Post a Job | Kawakami Overseas Placements";
  }, []);

  return (
    <section className="mr-1 mb-8">
      {/* ================= PAGE HEADER ================= */}

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
            <BriefcaseBusiness className="w-5 h-5 text-[#C89B16]" />
          </div>

          <div>
            <p className="text-[#B88917] text-xs font-bold tracking-[0.18em] uppercase mb-1">
              Employer Dashboard
            </p>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Post a New Job
            </h1>
          </div>
        </div>

        <p className="text-gray-500 max-w-3xl text-sm md:text-base leading-7">
          Create an international employment opportunity with country-specific
          location and salary information.
        </p>
      </div>

      {/* ================= FORM ================= */}

      <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-8 shadow-sm">
        <form onSubmit={postJob}>
          {/* ================= BASIC JOB INFORMATION ================= */}

          <div className="mb-8">
            <div className="mb-6">
              <p className="text-[#B88917] text-xs font-bold tracking-[0.15em] uppercase mb-1">
                Job Information
              </p>

              <h2 className="text-lg font-bold text-gray-900">
                Basic Details
              </h2>
            </div>

            {/* Job Title */}

            <div className="mb-7">
              <label
                htmlFor="job-title"
                className="block text-gray-900 text-sm font-semibold mb-2"
              >
                Job Title
              </label>

              <input
                id="job-title"
                type="text"
                placeholder="e.g. Delivery Rider, Horse Groom, Electrician"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C89B16] transition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <p className="text-xs text-gray-400 mt-2">
                Enter a clear and specific position title.
              </p>
            </div>

            {/* Category + Level */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="job-category"
                  className="block text-gray-900 text-sm font-semibold mb-2"
                >
                  Job Category
                </label>

                <select
                  id="job-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C89B16] cursor-pointer"
                  required
                >
                  {JobCategories.map((jobCategory) => (
                    <option key={jobCategory} value={jobCategory}>
                      {jobCategory}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="job-level"
                  className="block text-gray-900 text-sm font-semibold mb-2"
                >
                  Experience Level
                </label>

                <select
                  id="job-level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C89B16] cursor-pointer"
                  required
                >
                  {jobLevels.map((jobLevel) => (
                    <option key={jobLevel} value={jobLevel}>
                      {jobLevel}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ================= LOCATION ================= */}

          <div className="py-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#B88917]" />
              </div>

              <div>
                <p className="text-[#B88917] text-xs font-bold tracking-[0.15em] uppercase">
                  Location
                </p>

                <h2 className="text-lg font-bold text-gray-900">
                  Job Location
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Country */}

              <div>
                <label
                  htmlFor="job-country"
                  className="block text-gray-900 text-sm font-semibold mb-2"
                >
                  Country
                </label>

                <select
                  id="job-country"
                  value={country}
                  onChange={handleCountryChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C89B16] cursor-pointer"
                  required
                >
                  {countryData.map((item) => (
                    <option key={item.country} value={item.country}>
                      {item.country}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}

              <div>
                <label
                  htmlFor="job-location"
                  className="block text-gray-900 text-sm font-semibold mb-2"
                >
                  City / Location
                </label>

                <input
                  id="job-location"
                  type="text"
                  placeholder="e.g. Dubai, London, Sydney, Toronto"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C89B16] transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* ================= COMPENSATION ================= */}

          <div className="py-8 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <Banknote className="w-4 h-4 text-[#B88917]" />
              </div>

              <div>
                <p className="text-[#B88917] text-xs font-bold tracking-[0.15em] uppercase">
                  Compensation
                </p>

                <h2 className="text-lg font-bold text-gray-900">
                  Salary Information
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Currency */}

              <div>
                <label
                  htmlFor="job-currency"
                  className="block text-gray-900 text-sm font-semibold mb-2"
                >
                  Currency
                </label>

                <select
                  id="job-currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C89B16] cursor-pointer"
                  required
                >
                  {currencies.map((currencyCode) => (
                    <option key={currencyCode} value={currencyCode}>
                      {currencyCode}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minimum Salary */}

              <div>
                <label
                  htmlFor="salary-min"
                  className="block text-gray-900 text-sm font-semibold mb-2"
                >
                  Minimum Salary
                </label>

                <input
                  id="salary-min"
                  type="number"
                  min="0"
                  placeholder="e.g. 2000"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C89B16]"
                  required
                />
              </div>

              {/* Maximum Salary */}

              <div>
                <label
                  htmlFor="salary-max"
                  className="block text-gray-900 text-sm font-semibold mb-2"
                >
                  Maximum Salary
                </label>

                <input
                  id="salary-max"
                  type="number"
                  min="0"
                  placeholder="e.g. 3000"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C89B16]"
                  required
                />
              </div>

              {/* Salary Period */}

              <div>
                <label
                  htmlFor="salary-period"
                  className="block text-gray-900 text-sm font-semibold mb-2"
                >
                  Salary Period
                </label>

                <select
                  id="salary-period"
                  value={salaryPeriod}
                  onChange={(e) => setSalaryPeriod(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#C89B16] cursor-pointer"
                  required
                >
                  {salaryPeriods.map((period) => (
                    <option key={period} value={period}>
                      Per {period}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Salary Preview */}

            {salaryMin && salaryMax && (
              <div className="mt-5 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg px-4 py-3">
                <p className="text-xs text-gray-500 mb-1">
                  Candidate salary display
                </p>

                <p className="text-sm font-bold text-gray-900">
                  {currency} {Number(salaryMin).toLocaleString()} – {currency}{" "}
                  {Number(salaryMax).toLocaleString()} / {salaryPeriod}
                </p>
              </div>
            )}
          </div>

          {/* ================= DESCRIPTION ================= */}

          <div className="py-8 border-t border-gray-200">
            <label className="block text-gray-900 text-sm font-semibold mb-2">
              Job Description
            </label>

            <div className="job-description-editor">
              <div
                ref={editorRef}
                className="min-h-[190px] bg-white"
              />
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Include responsibilities, candidate requirements, experience,
              benefits and other important employment details.
            </p>
          </div>

          {/* ================= SUBMIT ================= */}

          <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-gray-400 max-w-lg leading-5">
              Please verify the country, currency and salary information
              carefully before publishing this opportunity.
            </p>

            <button
              type="submit"
              disabled={loading}
              className={`min-w-[170px] bg-[#D4AF37] hover:bg-[#C39D2E] text-[#111111] py-3 px-8 font-bold rounded-lg transition duration-200 flex items-center justify-center gap-2 ${
                loading
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer"
              }`}
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin h-5 w-5" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <BriefcaseBusiness className="w-4 h-4" />
                  <span>Post Job</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddJob;
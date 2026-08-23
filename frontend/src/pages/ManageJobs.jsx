import React, { useContext, useEffect, useMemo, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";

import {
  BriefcaseBusiness,
  Search,
  MapPin,
  CalendarDays,
  Users,
  Eye,
  EyeOff,
  Plus,
  ChevronDown,
} from "lucide-react";

const ManageJobs = () => {
  const [manageJobData, setManageJobData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("All Countries");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const { backendUrl, companyToken } = useContext(AppContext);

  // =========================================================
  // FETCH JOBS
  // =========================================================

  const fetchManageJobsData = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `${backendUrl}/company/company/posted-jobs`,
        {
          headers: {
            token: companyToken,
          },
        }
      );

      if (data.success) {
        setManageJobData(data.jobData || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to load your jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // CHANGE JOB VISIBILITY
  // =========================================================

  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/company/change-visiblity`,
        {
          id,
        },
        {
          headers: {
            token: companyToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchManageJobsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to update job visibility"
      );
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchManageJobsData();
  }, []);

  useEffect(() => {
    document.title =
      "Kawakami Overseas Placements | Manage Jobs";
  }, []);

  // =========================================================
  // COUNTRIES
  // =========================================================

  const countries = useMemo(() => {
    const uniqueCountries = [
      ...new Set(
        manageJobData
          .map((job) => job.country)
          .filter(Boolean)
      ),
    ];

    return ["All Countries", ...uniqueCountries];
  }, [manageJobData]);

  // =========================================================
  // FILTER JOBS
  // =========================================================

  const filteredJobs = useMemo(() => {
    return manageJobData
      .filter((job) => {
        const search = searchTerm.toLowerCase().trim();

        if (!search) return true;

        return (
          job.title?.toLowerCase().includes(search) ||
          job.location?.toLowerCase().includes(search) ||
          job.country?.toLowerCase().includes(search) ||
          job.category?.toLowerCase().includes(search)
        );
      })
      .filter((job) => {
        if (countryFilter === "All Countries") {
          return true;
        }

        return job.country === countryFilter;
      })
      .filter((job) => {
        if (statusFilter === "All Status") {
          return true;
        }

        if (statusFilter === "Active") {
          return job.visible === true;
        }

        if (statusFilter === "Hidden") {
          return job.visible === false;
        }

        return true;
      })
      .sort(
        (a, b) =>
          new Date(b.date || 0) -
          new Date(a.date || 0)
      );
  }, [
    manageJobData,
    searchTerm,
    countryFilter,
    statusFilter,
  ]);

  // =========================================================
  // FORMAT SALARY
  // =========================================================

  const formatSalary = (job) => {
    if (
      job.salaryMin === undefined ||
      job.salaryMin === null
    ) {
      return "Salary not specified";
    }

    const currency = job.currency || "";

    const min = Number(job.salaryMin).toLocaleString();
    const max =
      job.salaryMax !== undefined &&
      job.salaryMax !== null
        ? Number(job.salaryMax).toLocaleString()
        : null;

    if (max) {
      return `${currency} ${min} – ${max}`;
    }

    return `${currency} ${min}`;
  };

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalJobs = manageJobData.length;

  const activeJobs = manageJobData.filter(
    (job) => job.visible
  ).length;

  const hiddenJobs = manageJobData.filter(
    (job) => !job.visible
  ).length;

  const totalApplicants = manageJobData.reduce(
    (total, job) => total + (job.applicants || 0),
    0
  );

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <section className="space-y-6">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <div className="mb-2 flex items-center gap-2 text-[#b8962e]">

            <BriefcaseBusiness size={18} />

            <span className="text-xs font-semibold uppercase tracking-[0.16em]">
              Recruitment
            </span>

          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
            Manage Jobs
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage your international job openings,
            monitor applications, and control job visibility.
          </p>

        </div>

        <button
          type="button"
          onClick={() => {
            window.location.href =
              "/dashboard/add-job";
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-[#c6a32d]"
        >
          <Plus size={18} />
          Post a New Job
        </button>

      </div>


      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL JOBS */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Jobs
              </p>

              <p className="mt-2 text-3xl font-bold text-[#111111]">
                {totalJobs}
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7f0d8] text-[#b8962e]">
              <BriefcaseBusiness size={20} />
            </div>

          </div>

        </div>


        {/* ACTIVE JOBS */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Active Jobs
              </p>

              <p className="mt-2 text-3xl font-bold text-[#111111]">
                {activeJobs}
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Eye size={20} />
            </div>

          </div>

        </div>


        {/* HIDDEN JOBS */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Hidden Jobs
              </p>

              <p className="mt-2 text-3xl font-bold text-[#111111]">
                {hiddenJobs}
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
              <EyeOff size={20} />
            </div>

          </div>

        </div>


        {/* APPLICANTS */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Applicants
              </p>

              <p className="mt-2 text-3xl font-bold text-[#111111]">
                {totalApplicants}
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={20} />
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          JOB MANAGEMENT CARD
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* CARD HEADER */}

        <div className="border-b border-gray-200 p-5">

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            <div>

              <h2 className="text-lg font-semibold text-[#111111]">
                Your Job Listings
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1
                  ? "job"
                  : "jobs"}{" "}
                displayed
              </p>

            </div>


            {/* FILTERS */}

            <div className="flex flex-col gap-3 sm:flex-row">

              {/* SEARCH */}

              <div className="relative">

                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  placeholder="Search jobs..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-[#d4af37] focus:bg-white sm:w-[220px]"
                />

              </div>


              {/* COUNTRY */}

              <div className="relative">

                <select
                  value={countryFilter}
                  onChange={(e) =>
                    setCountryFilter(e.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm text-gray-700 outline-none transition focus:border-[#d4af37] focus:bg-white sm:w-[170px]"
                >

                  {countries.map((country) => (
                    <option
                      key={country}
                      value={country}
                    >
                      {country}
                    </option>
                  ))}

                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

              </div>


              {/* STATUS */}

              <div className="relative">

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm text-gray-700 outline-none transition focus:border-[#d4af37] focus:bg-white sm:w-[150px]"
                >

                  <option>
                    All Status
                  </option>

                  <option>
                    Active
                  </option>

                  <option>
                    Hidden
                  </option>

                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {filteredJobs.length === 0 ? (

          <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f7f0d8] text-[#b8962e]">

              <BriefcaseBusiness size={28} />

            </div>

            <h3 className="mt-5 text-lg font-semibold text-[#111111]">
              No jobs found
            </h3>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              {manageJobData.length === 0
                ? "You haven't posted any jobs yet. Create your first international job opening to get started."
                : "Try changing your search or filters to find a job."}
            </p>

            {manageJobData.length === 0 && (
              <button
                type="button"
                onClick={() => {
                  window.location.href =
                    "/dashboard/add-job";
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#c6a32d]"
              >
                <Plus size={17} />
                Post Your First Job
              </button>
            )}

          </div>

        ) : (

          <>
            {/* =================================================
                DESKTOP TABLE
            ================================================= */}

            <div className="hidden overflow-x-auto lg:block">

              <table className="w-full">

                <thead className="bg-[#fafafa]">

                  <tr className="border-b border-gray-200">

                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Job
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Location
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Salary
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Posted
                    </th>

                    <th className="px-6 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Applicants
                    </th>

                    <th className="px-6 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-gray-100">

                  {filteredJobs.map((job) => (

                    <tr
                      key={job._id}
                      className="transition hover:bg-[#fcfbf7]"
                    >

                      {/* JOB */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f7f0d8] text-[#b8962e]">

                            <BriefcaseBusiness
                              size={19}
                            />

                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-semibold text-[#111111]">
                              {job.title}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {job.category ||
                                "General Recruitment"}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* LOCATION */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">

                          <MapPin
                            size={15}
                            className="shrink-0 text-[#b8962e]"
                          />

                          <div>

                            <p className="text-sm text-gray-700">
                              {job.location ||
                                "Location not specified"}
                            </p>

                            {job.country && (
                              <p className="mt-0.5 text-xs text-gray-400">
                                {job.country}
                              </p>
                            )}

                          </div>

                        </div>

                      </td>


                      {/* SALARY */}

                      <td className="px-6 py-5">

                        <p className="text-sm font-medium text-[#111111]">
                          {formatSalary(job)}
                        </p>

                        {job.salaryPeriod && (
                          <p className="mt-0.5 text-xs text-gray-400">
                            per {job.salaryPeriod.toLowerCase()}
                          </p>
                        )}

                      </td>


                      {/* DATE */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-sm text-gray-600">

                          <CalendarDays
                            size={15}
                            className="text-gray-400"
                          />

                          {moment(job.date).format(
                            "MMM DD, YYYY"
                          )}

                        </div>

                      </td>


                      {/* APPLICANTS */}

                      <td className="px-6 py-5 text-center">

                        <span className="inline-flex min-w-[36px] items-center justify-center rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600">
                          {job.applicants || 0}
                        </span>

                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-5">

                        <div className="flex items-center justify-center gap-3">

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                              job.visible
                                ? "bg-green-50 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >

                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                job.visible
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                              }`}
                            />

                            {job.visible
                              ? "Active"
                              : "Hidden"}

                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              changeJobVisibility(
                                job._id
                              )
                            }
                            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                              job.visible
                                ? "border-green-200 text-green-600 hover:bg-green-50"
                                : "border-gray-200 text-gray-500 hover:bg-gray-50"
                            }`}
                            title={
                              job.visible
                                ? "Hide job"
                                : "Make job visible"
                            }
                          >

                            {job.visible ? (
                              <Eye size={17} />
                            ) : (
                              <EyeOff size={17} />
                            )}

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>


            {/* =================================================
                MOBILE / TABLET CARDS
            ================================================= */}

            <div className="space-y-3 p-4 lg:hidden">

              {filteredJobs.map((job) => (

                <div
                  key={job._id}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f7f0d8] text-[#b8962e]">

                        <BriefcaseBusiness
                          size={19}
                        />

                      </div>

                      <div className="min-w-0">

                        <h3 className="truncate text-sm font-semibold text-[#111111]">
                          {job.title}
                        </h3>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {job.category ||
                            "General Recruitment"}
                        </p>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        changeJobVisibility(
                          job._id
                        )
                      }
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                        job.visible
                          ? "border-green-200 text-green-600"
                          : "border-gray-200 text-gray-500"
                      }`}
                    >
                      {job.visible ? (
                        <Eye size={17} />
                      ) : (
                        <EyeOff size={17} />
                      )}
                    </button>

                  </div>


                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">

                    <div>

                      <p className="text-[11px] uppercase tracking-wide text-gray-400">
                        Location
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">

                        <MapPin
                          size={14}
                          className="text-[#b8962e]"
                        />

                        <p className="text-xs text-gray-700">
                          {job.location ||
                            "Not specified"}
                        </p>

                      </div>

                      {job.country && (
                        <p className="ml-5 mt-0.5 text-[11px] text-gray-400">
                          {job.country}
                        </p>
                      )}

                    </div>


                    <div>

                      <p className="text-[11px] uppercase tracking-wide text-gray-400">
                        Salary
                      </p>

                      <p className="mt-1 text-xs font-medium text-gray-700">
                        {formatSalary(job)}
                      </p>

                    </div>


                    <div>

                      <p className="text-[11px] uppercase tracking-wide text-gray-400">
                        Posted
                      </p>

                      <p className="mt-1 text-xs text-gray-700">
                        {moment(job.date).format(
                          "MMM DD, YYYY"
                        )}
                      </p>

                    </div>


                    <div>

                      <p className="text-[11px] uppercase tracking-wide text-gray-400">
                        Applicants
                      </p>

                      <p className="mt-1 text-xs font-semibold text-blue-600">
                        {job.applicants || 0}
                      </p>

                    </div>

                  </div>


                  <div className="mt-4">

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                        job.visible
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >

                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          job.visible
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />

                      {job.visible
                        ? "Job is Active"
                        : "Job is Hidden"}

                    </span>

                  </div>

                </div>

              ))}

            </div>

          </>

        )}

      </div>

    </section>
  );
};

export default ManageJobs;
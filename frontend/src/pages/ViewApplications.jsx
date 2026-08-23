import moment from "moment";
import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  FileText,
  LoaderCircle,
  Search,
  Users,
  UserCheck,
  XCircle,
  MapPin,
  Eye,
} from "lucide-react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const ViewApplications = () => {
  const [viewApplicationsPageData, setViewApplicationsPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [jobFilter, setJobFilter] = useState("All Jobs");

  const { backendUrl, companyToken } = useContext(AppContext);

  // =========================================================
  // FETCH APPLICATIONS
  // =========================================================

  const fetchViewApplicationsPageData = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/company/view-applications`,
        {},
        {
          headers: {
            token: companyToken,
          },
        }
      );

      if (data?.success) {
        setViewApplicationsPageData(data.viewApplicationData || []);
      } else {
        toast.error(data?.message || "Failed to load applications.");
      }
    } catch (error) {
      console.error(
        "Error fetching applications:",
        error?.response?.data || error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch applications."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================================
  // UPDATE APPLICATION STATUS
  // =========================================================

  const handleStatusUpdate = async (id, status) => {
    setUpdatingStatus(id);

    try {
      const { data } = await axios.post(
        `${backendUrl}/company/change-status`,
        {
          id,
          status,
        },
        {
          headers: {
            token: companyToken,
          },
        }
      );

      if (data?.success) {
        toast.success(
          data?.message || "Application status updated successfully."
        );

        await fetchViewApplicationsPageData();
      } else {
        toast.error(data?.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Status update error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Error updating application status."
      );
    } finally {
      setUpdatingStatus(null);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    document.title = "Superio - Job Portal | Applications";
    fetchViewApplicationsPageData();
  }, []);

  // =========================================================
  // UNIQUE JOBS
  // =========================================================

  const uniqueJobs = useMemo(() => {
    const jobs = viewApplicationsPageData
      .map((application) => ({
        id: application?.jobId?._id,
        title: application?.jobId?.title,
      }))
      .filter((job) => job.id && job.title);

    const unique = [];

    jobs.forEach((job) => {
      if (!unique.some((item) => item.id === job.id)) {
        unique.push(job);
      }
    });

    return unique;
  }, [viewApplicationsPageData]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalApplications = viewApplicationsPageData.length;

  const pendingApplications = viewApplicationsPageData.filter(
    (application) => application?.status === "Pending"
  ).length;

  const acceptedApplications = viewApplicationsPageData.filter(
    (application) => application?.status === "Accepted"
  ).length;

  const rejectedApplications = viewApplicationsPageData.filter(
    (application) => application?.status === "Rejected"
  ).length;

  // =========================================================
  // FILTER APPLICATIONS
  // =========================================================

  const filteredApplications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return [...viewApplicationsPageData]
      .filter((application) => {
        if (statusFilter === "All Status") {
          return true;
        }

        return application?.status === statusFilter;
      })
      .filter((application) => {
        if (jobFilter === "All Jobs") {
          return true;
        }

        return application?.jobId?._id === jobFilter;
      })
      .filter((application) => {
        if (!query) {
          return true;
        }

        const applicantName =
          application?.userId?.name?.toLowerCase() || "";

        const jobTitle =
          application?.jobId?.title?.toLowerCase() || "";

        const location =
          application?.jobId?.location?.toLowerCase() || "";

        return (
          applicantName.includes(query) ||
          jobTitle.includes(query) ||
          location.includes(query)
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a?.date || 0).getTime();
        const dateB = new Date(b?.date || 0).getTime();

        return dateB - dateA;
      });
  }, [
    viewApplicationsPageData,
    searchQuery,
    statusFilter,
    jobFilter,
  ]);

  // =========================================================
  // STATUS BADGE
  // =========================================================

  const renderStatusBadge = (status) => {
    if (status === "Accepted") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
          <CheckCircle2 size={14} />
          Accepted
        </span>
      );
    }

    if (status === "Rejected") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
          <XCircle size={14} />
          Rejected
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
        <CalendarDays size={14} />
        Pending
      </span>
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <section className="pb-10">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#c49b25]">
            <Users size={15} />
            Recruitment
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#111111] md:text-4xl">
            Applications
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
            Review candidates, evaluate applications, and manage your
            recruitment pipeline.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-medium text-gray-400">
            Applications displayed
          </p>

          <p className="mt-1 text-xl font-bold text-[#111111]">
            {filteredApplications.length}
          </p>
        </div>
      </div>

      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Applications
              </p>

              <p className="mt-3 text-3xl font-bold text-[#111111]">
                {totalApplications}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fbf3d8] text-[#c49b25]">
              <Users size={22} />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Pending Review
              </p>

              <p className="mt-3 text-3xl font-bold text-[#111111]">
                {pendingApplications}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <CalendarDays size={22} />
            </div>
          </div>
        </div>

        {/* Accepted */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Accepted
              </p>

              <p className="mt-3 text-3xl font-bold text-[#111111]">
                {acceptedApplications}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <UserCheck size={22} />
            </div>
          </div>
        </div>

        {/* Rejected */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Rejected
              </p>

              <p className="mt-3 text-3xl font-bold text-[#111111]">
                {rejectedApplications}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <XCircle size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          APPLICATIONS CARD
      ====================================================== */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Card Header */}

        <div className="border-b border-gray-200 px-5 py-5 md:px-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#111111]">
                Candidate Applications
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Review and manage candidates who applied to your
                job openings.
              </p>
            </div>

            {/* Filters */}

            <div className="flex flex-col gap-3 md:flex-row">
              {/* Search */}

              <div className="relative min-w-[240px]">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search candidates..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#d4af37] focus:bg-white focus:ring-2 focus:ring-[#d4af37]/10"
                />
              </div>

              {/* Job Filter */}

              <select
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
                className="h-11 min-w-[170px] cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-[#d4af37] focus:bg-white"
              >
                <option value="All Jobs">All Jobs</option>

                {uniqueJobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>

              {/* Status Filter */}

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-11 min-w-[150px] cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-[#d4af37] focus:bg-white"
              >
                <option value="All Status">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* =================================================
            EMPTY FILTER RESULT
        ================================================== */}

        {filteredApplications.length === 0 ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fbf3d8] text-[#c49b25]">
              <Users size={28} />
            </div>

            <h3 className="text-lg font-bold text-[#111111]">
              No applications found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              {searchQuery ||
              statusFilter !== "All Status" ||
              jobFilter !== "All Jobs"
                ? "Try adjusting your search or filters to find applications."
                : "Applications from candidates will appear here once they apply to your jobs."}
            </p>

            {(searchQuery ||
              statusFilter !== "All Status" ||
              jobFilter !== "All Jobs") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("All Status");
                  setJobFilter("All Jobs");
                }}
                className="mt-5 rounded-xl bg-[#d4af37] px-5 py-2.5 text-sm font-semibold text-[#111111] transition hover:bg-[#c49b25]"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* =================================================
                DESKTOP TABLE
            ================================================== */}

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/70">
                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Candidate
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Applied For
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Location
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Applied
                    </th>

                    <th className="px-6 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Resume
                    </th>

                    <th className="px-6 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredApplications.map((application) => {
                    const applicantName =
                      application?.userId?.name || "Unknown Applicant";

                    const applicantImage =
                      application?.userId?.image ||
                      assets.default_profile;

                    const jobTitle =
                      application?.jobId?.title || "Job unavailable";

                    const location =
                      application?.jobId?.location || "Location unavailable";

                    return (
                      <tr
                        key={application._id}
                        className="group transition hover:bg-[#fffdf6]"
                      >
                        {/* Candidate */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <img
                              src={applicantImage}
                              alt={applicantName}
                              className="h-11 w-11 rounded-full border border-gray-200 object-cover"
                              onError={(e) => {
                                e.currentTarget.src =
                                  assets.default_profile;
                              }}
                            />

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-[#111111]">
                                {applicantName}
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                Candidate
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Job */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fbf3d8] text-[#c49b25]">
                              <BriefcaseBusiness size={18} />
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-[210px] truncate text-sm font-semibold text-[#111111]">
                                {jobTitle}
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                Job Application
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Location */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin
                              size={15}
                              className="shrink-0 text-[#c49b25]"
                            />

                            <span>{location}</span>
                          </div>

                          {application?.jobId?.country && (
                            <p className="mt-1 pl-5 text-xs text-gray-400">
                              {application.jobId.country}
                            </p>
                          )}
                        </td>

                        {/* Date */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CalendarDays
                              size={15}
                              className="text-gray-400"
                            />

                            {application?.date
                              ? moment(application.date).format("ll")
                              : "N/A"}
                          </div>
                        </td>

                        {/* Resume */}

                        <td className="px-6 py-5 text-center">
                          {application?.userId?.resume ? (
                            <a
                              href={application.userId.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-[#d4af37] hover:bg-[#fffdf6] hover:text-[#a27b08]"
                            >
                              <FileText size={14} />
                              View Resume
                            </a>
                          ) : (
                            <span className="text-xs text-gray-400">
                              No resume
                            </span>
                          )}
                        </td>

                        {/* Status */}

                        <td className="px-6 py-5 text-center">
                          {updatingStatus === application._id ? (
                            <div className="flex justify-center">
                              <LoaderCircle
                                size={20}
                                className="animate-spin text-[#c49b25]"
                              />
                            </div>
                          ) : (
                            renderStatusBadge(application.status)
                          )}
                        </td>

                        {/* Action */}

                        <td className="px-6 py-5 text-right">
                          {updatingStatus === application._id ? (
                            <span className="text-xs text-gray-400">
                              Updating...
                            </span>
                          ) : application.status === "Pending" ? (
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusUpdate(
                                    application._id,
                                    "Accepted"
                                  )
                                }
                                className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100"
                              >
                                Accept
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusUpdate(
                                    application._id,
                                    "Rejected"
                                  )
                                }
                                className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                application?.userId?.resume &&
                                window.open(
                                  application.userId.resume,
                                  "_blank",
                                  "noopener,noreferrer"
                                )
                              }
                              disabled={!application?.userId?.resume}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#d4af37] hover:bg-[#fffdf6] hover:text-[#a27b08] disabled:cursor-not-allowed disabled:opacity-40"
                              title="View resume"
                            >
                              <Eye size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* =================================================
                MOBILE / TABLET CARDS
            ================================================== */}

            <div className="divide-y divide-gray-100 lg:hidden">
              {filteredApplications.map((application) => {
                const applicantName =
                  application?.userId?.name || "Unknown Applicant";

                const applicantImage =
                  application?.userId?.image ||
                  assets.default_profile;

                const jobTitle =
                  application?.jobId?.title || "Job unavailable";

                const location =
                  application?.jobId?.location || "Location unavailable";

                return (
                  <div
                    key={application._id}
                    className="p-5 transition hover:bg-[#fffdf6]"
                  >
                    {/* Candidate Header */}

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={applicantImage}
                          alt={applicantName}
                          className="h-12 w-12 shrink-0 rounded-full border border-gray-200 object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              assets.default_profile;
                          }}
                        />

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-bold text-[#111111]">
                            {applicantName}
                          </h3>

                          <p className="mt-0.5 text-xs text-gray-400">
                            Candidate
                          </p>
                        </div>
                      </div>

                      {renderStatusBadge(application.status)}
                    </div>

                    {/* Job */}

                    <div className="mt-5 rounded-xl bg-gray-50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fbf3d8] text-[#c49b25]">
                          <BriefcaseBusiness size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#111111]">
                            {jobTitle}
                          </p>

                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {location}
                            </span>

                            <span className="flex items-center gap-1">
                              <CalendarDays size={12} />
                              {application?.date
                                ? moment(application.date).format("ll")
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {application?.userId?.resume && (
                        <a
                          href={application.userId.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 transition hover:border-[#d4af37] hover:bg-[#fffdf6]"
                        >
                          <FileText size={14} />
                          View Resume
                        </a>
                      )}

                      {application.status === "Pending" && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              handleStatusUpdate(
                                application._id,
                                "Accepted"
                              )
                            }
                            disabled={
                              updatingStatus === application._id
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2.5 text-xs font-semibold text-green-700 transition hover:bg-green-100 disabled:opacity-50"
                          >
                            {updatingStatus === application._id ? (
                              <LoaderCircle
                                size={14}
                                className="animate-spin"
                              />
                            ) : (
                              <CheckCircle2 size={14} />
                            )}
                            Accept
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleStatusUpdate(
                                application._id,
                                "Rejected"
                              )
                            }
                            disabled={
                              updatingStatus === application._id
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                          >
                            <XCircle size={14} />
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ViewApplications;
import { useContext, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  BriefcaseBusiness,
  FileText,
  LogOut,
  Menu,
  Settings,
  Bell,
  BarChart3,
  Users,
  Eye,
  EyeOff,
  MapPin,
  CalendarDays,
  ArrowRight,
  Plus,
  LayoutDashboard,
} from "lucide-react";

import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";

import { AppContext } from "../context/AppContext";
import { LoaderCircle } from "lucide-react";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { companyData, companyLoading, backendUrl, companyToken } =
    useContext(AppContext);

  const [jobs, setJobs] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // =========================================================
  // RECRUITMENT NAVIGATION
  // =========================================================

  const sidebarLinks = [
    {
      id: "dashboard",
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "manage-jobs",
      name: "Manage Jobs",
      path: "/dashboard/manage-jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "add-job",
      name: "Post a Job",
      path: "/dashboard/add-job",
      icon: FileText,
    },
    {
      id: "applications",
      name: "Applications",
      path: "/dashboard/view-applications",
      icon: Users,
    },
  ];

  // =========================================================
  // COMING SOON
  // =========================================================

  const comingSoonLinks = [
    {
      id: "analytics",
      name: "Analytics",
      icon: BarChart3,
    },
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
    },
  ];

  // =========================================================
  // FETCH EMPLOYER JOBS
  // =========================================================

  const fetchDashboardJobs = async () => {
    if (!companyToken) return;

    setDashboardLoading(true);

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
        setJobs(data.jobData || []);
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Dashboard error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to load dashboard information"
      );
    } finally {
      setDashboardLoading(false);
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("companyToken");

    toast.success("Logged out successfully");

    navigate("/recruiter-login");
  };

  // =========================================================
  // FETCH DASHBOARD DATA
  // =========================================================

  useEffect(() => {
    if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
      fetchDashboardJobs();
    }
  }, [location.pathname, companyToken]);

  // =========================================================
  // PAGE TITLE
  // =========================================================

  useEffect(() => {
    document.title =
      "Kawakami Overseas Placements | Employer Dashboard";
  }, []);

  // =========================================================
  // DASHBOARD STATISTICS
  // =========================================================

  const totalJobs = jobs.length;

  const activeJobs = jobs.filter((job) => job.visible).length;

  const hiddenJobs = jobs.filter((job) => !job.visible).length;

  const totalApplicants = jobs.reduce(
    (total, job) => total + Number(job.applicants || 0),
    0
  );

  // Latest jobs
  const recentJobs = [...jobs]
    .sort((a, b) => Number(b.date || 0) - Number(a.date || 0))
    .slice(0, 5);

  // =========================================================
  // FORMAT SALARY
  // =========================================================

  const formatSalary = (job) => {
    if (
      job.salaryMin === undefined ||
      job.salaryMax === undefined ||
      job.salaryMin === null ||
      job.salaryMax === null
    ) {
      return "Salary not specified";
    }

    if (
      Number(job.salaryMin) === 0 &&
      Number(job.salaryMax) === 0
    ) {
      return "Salary not specified";
    }

    return `${job.currency || ""} ${Number(
      job.salaryMin
    ).toLocaleString()} – ${Number(job.salaryMax).toLocaleString()}`;
  };

  // =========================================================
  // STAT CARD
  // =========================================================

  const StatCard = ({
    title,
    value,
    icon: Icon,
    iconBackground,
    iconColor,
  }) => (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-[#111111]">
            {dashboardLoading ? "—" : value}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBackground}`}
        >
          <Icon size={22} className={iconColor} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );

  // =========================================================
  // MAIN DASHBOARD VIEW
  // =========================================================

  const DashboardHome = () => {
    return (
      <div className="space-y-7">
        {/* PAGE INTRODUCTION */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <BriefcaseBusiness
                size={17}
                className="text-[#b8962e]"
                strokeWidth={2}
              />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8962e]">
                Employer Overview
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Manage your international recruitment activity, monitor job
              openings, and keep track of your applications.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard/add-job")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-[#c5a12f] hover:shadow-md"
          >
            <Plus size={18} strokeWidth={2.2} />
            Post a New Job
          </button>
        </div>

        {/* STATISTICS */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Jobs"
            value={totalJobs}
            icon={BriefcaseBusiness}
            iconBackground="bg-[#fbf4dc]"
            iconColor="text-[#b8962e]"
          />

          <StatCard
            title="Active Jobs"
            value={activeJobs}
            icon={Eye}
            iconBackground="bg-green-50"
            iconColor="text-green-600"
          />

          <StatCard
            title="Hidden Jobs"
            value={hiddenJobs}
            icon={EyeOff}
            iconBackground="bg-gray-100"
            iconColor="text-gray-500"
          />

          <StatCard
            title="Total Applicants"
            value={totalApplicants}
            icon={Users}
            iconBackground="bg-blue-50"
            iconColor="text-blue-600"
          />
        </div>

        {/* MAIN CONTENT GRID */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
          {/* RECENT JOBS */}

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#111111]">
                  Recent Job Listings
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your latest posted opportunities
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/dashboard/manage-jobs")}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9c7b13] transition hover:text-[#725a0b]"
              >
                View All
                <ArrowRight size={16} />
              </button>
            </div>

            {dashboardLoading ? (
              <div className="flex min-h-[250px] items-center justify-center">
                <LoaderCircle
                  className="animate-spin text-[#b8962e]"
                  size={30}
                />
              </div>
            ) : recentJobs.length === 0 ? (
              <div className="flex min-h-[250px] flex-col items-center justify-center px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fbf4dc]">
                  <BriefcaseBusiness
                    size={25}
                    className="text-[#b8962e]"
                  />
                </div>

                <h3 className="mt-4 font-semibold text-gray-800">
                  No jobs posted yet
                </h3>

                <p className="mt-1 max-w-sm text-sm text-gray-500">
                  Start attracting candidates by posting your first
                  international job opportunity.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/dashboard/add-job")}
                  className="mt-4 rounded-lg bg-[#d4af37] px-4 py-2 text-sm font-semibold text-black hover:bg-[#c5a12f]"
                >
                  Post Your First Job
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentJobs.map((job) => (
                  <div
                    key={job._id}
                    className="flex flex-col gap-4 px-5 py-5 transition hover:bg-[#fafaf8] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fbf4dc]">
                        <BriefcaseBusiness
                          size={20}
                          className="text-[#b8962e]"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-[#111111]">
                          {job.title}
                        </h3>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {job.category || "Job Opportunity"}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={13} />
                            {job.location}
                            {job.country ? `, ${job.country}` : ""}
                          </span>

                          <span className="inline-flex items-center gap-1">
                            <CalendarDays size={13} />
                            {job.date
                              ? moment(job.date).format("MMM DD, YYYY")
                              : "Date unavailable"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <div className="text-left sm:text-right">
                        <p className="text-sm font-semibold text-[#111111]">
                          {formatSalary(job)}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          per {String(job.salaryPeriod || "month").toLowerCase()}
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                          {job.applicants || 0}
                        </div>

                        <p className="mt-1 text-[10px] text-gray-400">
                          applicants
                        </p>
                      </div>

                      <span
                        className={`hidden rounded-full px-3 py-1.5 text-xs font-semibold sm:inline-flex ${
                          job.visible
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {job.visible ? "Active" : "Hidden"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* QUICK ACTIONS */}

          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-[#111111]">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Frequently used recruitment tools
              </p>

              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/add-job")}
                  className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left transition hover:border-[#d4af37] hover:bg-[#fffdf5]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fbf4dc]">
                    <Plus size={19} className="text-[#b8962e]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Post a Job
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Create a new opportunity
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    className="ml-auto text-gray-400"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/dashboard/manage-jobs")}
                  className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left transition hover:border-[#d4af37] hover:bg-[#fffdf5]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <BriefcaseBusiness
                      size={19}
                      className="text-gray-600"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Manage Jobs
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      View and control listings
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    className="ml-auto text-gray-400"
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/dashboard/view-applications")
                  }
                  className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left transition hover:border-[#d4af37] hover:bg-[#fffdf5]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Users size={19} className="text-blue-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Applications
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Review candidates
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    className="ml-auto text-gray-400"
                  />
                </button>
              </div>
            </div>

            {/* RECRUITMENT SUMMARY */}

            <div className="rounded-2xl bg-[#111111] p-5 text-white shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d4af37]">
                  <BriefcaseBusiness
                    size={18}
                    className="text-black"
                  />
                </div>

                <p className="text-sm font-semibold">
                  Recruitment Summary
                </p>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Active opportunities
                  </span>

                  <span className="text-sm font-semibold text-[#d4af37]">
                    {activeJobs}
                  </span>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Total applications
                  </span>

                  <span className="text-sm font-semibold text-white">
                    {totalApplicants}
                  </span>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Hidden listings
                  </span>

                  <span className="text-sm font-semibold text-white">
                    {hiddenJobs}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // =========================================================
  // DESKTOP SIDEBAR
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#111111]">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[270px] border-r border-[#242424] bg-[#0d0d0d] lg:flex lg:flex-col">
        {/* BRAND */}

        <div className="border-b border-[#252525] px-7 py-7">
          <Link to="/dashboard" className="block">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-[#b8962e]/40 bg-black">
                <img
                  src={assets.logo}
                  alt="Kawakami Overseas Placements"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h1 className="text-[17px] font-bold tracking-[0.08em] text-white">
                  KAWAKAMI
                </h1>

                <p className="mt-1 text-[10px] font-medium tracking-[0.18em] text-[#b8962e]">
                  OVERSEAS PLACEMENTS
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* COMPANY IDENTITY */}

        <div className="border-b border-[#252525] px-7 py-6">
          <div className="flex items-center gap-3">
            {companyLoading ? (
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b8962e]/30 bg-[#171717]">
                <LoaderCircle
                  className="h-5 w-5 animate-spin text-[#d4af37]"
                />
              </div>
            ) : (
              <img
                src={companyData?.image}
                alt={companyData?.name || "Company"}
                className="h-11 w-11 rounded-full border border-[#b8962e] object-cover"
              />
            )}

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {companyData?.name || "Employer"}
              </p>

              <p className="mt-0.5 text-xs text-gray-500">
                Employer Portal
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}

        <div className="flex-1 overflow-y-auto px-4 py-7">
          <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
            Recruitment
          </p>

          <nav className="space-y-1.5">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#d4af37] text-black shadow-[0_8px_24px_rgba(212,175,55,0.18)]"
                        : "text-gray-400 hover:bg-[#181818] hover:text-white"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        strokeWidth={isActive ? 2.4 : 1.8}
                        className={
                          isActive
                            ? "text-black"
                            : "text-gray-500 group-hover:text-[#d4af37]"
                        }
                      />

                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* COMING SOON */}

          <div className="mt-9">
            <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
              Coming Soon
            </p>

            <div className="space-y-1.5">
              {comingSoonLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-600"
                  >
                    <Icon size={19} strokeWidth={1.8} />

                    <span>{item.name}</span>

                    <span className="ml-auto rounded-full border border-[#303030] px-2 py-0.5 text-[8px] uppercase tracking-wider text-gray-600">
                      Soon
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* LOGOUT */}

        <div className="border-t border-[#252525] p-5">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-900/40 bg-red-950/20 px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-950/40 hover:text-red-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* =====================================================
          MOBILE TOP BAR
      ===================================================== */}

      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 lg:hidden">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[#d4af37]/50">
            <img
              src={assets.logo}
              alt="Kawakami"
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <p className="text-sm font-bold tracking-wide text-[#111111]">
              KAWAKAMI
            </p>

            <p className="text-[8px] tracking-[0.16em] text-[#b8962e]">
              OVERSEAS PLACEMENTS
            </p>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden">
          <div className="absolute left-0 top-0 h-full w-[280px] bg-[#0d0d0d] p-5 pt-24 text-white shadow-2xl">
            <div className="mb-7">
              <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Recruitment
              </p>

              <nav className="space-y-1.5">
                {sidebarLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      end={item.path === "/dashboard"}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium ${
                          isActive
                            ? "bg-[#d4af37] text-black"
                            : "text-gray-400 hover:bg-[#181818] hover:text-white"
                        }`
                      }
                    >
                      <Icon size={19} />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <button
              onClick={handleLogout}
              className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-red-900/40 bg-red-950/20 px-4 py-3 text-sm font-medium text-red-400"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="min-h-screen lg:ml-[270px]">
        {/* DESKTOP HEADER */}

        <header className="sticky top-0 z-20 hidden border-b border-gray-200 bg-white/95 backdrop-blur lg:block">
          <div className="flex min-h-[88px] items-center justify-between px-8 xl:px-10">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-[#111111]">
                  Welcome back
                </h2>

                <span className="text-2xl">👋</span>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                International Recruitment Dashboard
              </p>
            </div>

            <div className="flex items-center gap-5">
              <button
                type="button"
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-[#d4af37] hover:text-[#a38316]"
                aria-label="Notifications"
              >
                <Bell size={19} strokeWidth={1.8} />

                <span className="absolute right-[9px] top-[8px] h-2 w-2 rounded-full bg-[#d4af37]" />
              </button>

              <div className="h-9 w-px bg-gray-200" />

              <div className="flex items-center gap-3">
                {companyLoading ? (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200">
                    <LoaderCircle
                      className="h-5 w-5 animate-spin text-[#b8962e]"
                    />
                  </div>
                ) : (
                  <img
                    src={companyData?.image}
                    alt={companyData?.name || "Employer"}
                    className="h-11 w-11 rounded-full border border-[#d4af37] object-cover"
                  />
                )}

                <div className="hidden xl:block">
                  <p className="text-sm font-semibold text-[#111111]">
                    {companyData?.name || "Employer"}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-500">
                    Employer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* MOBILE WELCOME */}

        <div className="border-b border-gray-200 bg-white px-5 py-5 lg:hidden">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#111111]">
              Welcome back
            </h2>

            <span className="text-xl">👋</span>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            International Recruitment Dashboard
          </p>
        </div>

        {/* =====================================================
            ROUTE CONTENT
        ===================================================== */}

        <main className="min-h-[calc(100vh-89px)] bg-[#f7f7f5] p-5 sm:p-6 lg:p-8 xl:p-10">
          {location.pathname === "/dashboard" ||
          location.pathname === "/dashboard/" ? (
            <DashboardHome />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
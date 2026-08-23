import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  MapPin,
  SlidersHorizontal,
  BriefcaseBusiness,
  X,
} from "lucide-react";
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JobCategories, JobLocations } from "../assets/assets";
import JobCard from "../components/JobCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { slideRigth, SlideUp } from "../utils/Animation";

function AllJobs() {
  const [jobData, setJobData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const {
    jobs,
    searchFilter,
    setSearchFilter,
    setIsSearched,
    isSearched,
    fetchJobsData,
  } = useContext(AppContext);

  const { category } = useParams();
  const navigate = useNavigate();

  const jobsPerPage = 6;

  const [searchInput, setSearchInput] = useState({
    title: "",
    location: "",
    selectedCategories: [],
    selectedLocations: [],
  });

  /* ---------------------------------------------
     FETCH JOBS
  --------------------------------------------- */

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchJobsData();
      setLoading(false);
    };

    fetchData();
  }, []);

  /* ---------------------------------------------
     CATEGORY / GLOBAL SEARCH FILTER
  --------------------------------------------- */

  useEffect(() => {
    if (!jobs?.length) {
      setJobData([]);
      return;
    }

    let filtered = [...jobs];

    if (category && category !== "all") {
      filtered = filtered.filter(
        (job) =>
          job.category?.toLowerCase() ===
          decodeURIComponent(category).toLowerCase()
      );
    }

    setJobData(filtered);

    setSearchInput({
      title: isSearched ? searchFilter.title : "",
      location: isSearched ? searchFilter.location : "",
      selectedCategories: [],
      selectedLocations: [],
    });

    setCurrentPage(1);
  }, [category, jobs, isSearched, searchFilter]);

  /* ---------------------------------------------
     LOCAL FILTERING
  --------------------------------------------- */

  useEffect(() => {
    let results = [...jobData];

    if (searchInput.title.trim()) {
      results = results.filter((job) =>
        job.title
          ?.toLowerCase()
          .includes(searchInput.title.trim().toLowerCase())
      );
    }

    if (searchInput.location.trim()) {
      results = results.filter((job) =>
        job.location
          ?.toLowerCase()
          .includes(searchInput.location.trim().toLowerCase())
      );
    }

    if (searchInput.selectedCategories.length > 0) {
      results = results.filter((job) =>
        searchInput.selectedCategories.includes(job.category)
      );
    }

    if (searchInput.selectedLocations.length > 0) {
      results = results.filter((job) =>
        searchInput.selectedLocations.includes(job.location)
      );
    }

    setFilteredJobs(results);
    setCurrentPage(1);
  }, [jobData, searchInput]);

  /* ---------------------------------------------
     HANDLERS
  --------------------------------------------- */

  const handleSearchChange = (e) => {
    const { name, value } = e.target;

    setSearchInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryToggle = (cat) => {
    setSearchInput((prev) => {
      const updated = prev.selectedCategories.includes(cat)
        ? prev.selectedCategories.filter((item) => item !== cat)
        : [...prev.selectedCategories, cat];

      return {
        ...prev,
        selectedCategories: updated,
      };
    });
  };

  const handleLocationToggle = (loc) => {
    setSearchInput((prev) => {
      const updated = prev.selectedLocations.includes(loc)
        ? prev.selectedLocations.filter((item) => item !== loc)
        : [...prev.selectedLocations, loc];

      return {
        ...prev,
        selectedLocations: updated,
      };
    });
  };

  const clearAllFilters = () => {
    setSearchInput({
      title: "",
      location: "",
      selectedCategories: [],
      selectedLocations: [],
    });

    setSearchFilter({
      title: "",
      location: "",
    });

    setIsSearched(false);
    setShowFilters(false);

    navigate("/all-jobs/all");
    window.scrollTo(0, 0);
  };

  /* ---------------------------------------------
     PAGINATION
  --------------------------------------------- */

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginatedJobs = useMemo(() => {
    return [...filteredJobs]
      .reverse()
      .slice(
        (currentPage - 1) * jobsPerPage,
        currentPage * jobsPerPage
      );
  }, [filteredJobs, currentPage]);

  /* ---------------------------------------------
     ACTIVE FILTER CHECK
  --------------------------------------------- */

  const hasActiveFilters =
    searchInput.title.trim() ||
    searchInput.location.trim() ||
    searchInput.selectedCategories.length > 0 ||
    searchInput.selectedLocations.length > 0 ||
    (category && category !== "all");

  /* ---------------------------------------------
     LOADER
  --------------------------------------------- */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main>
        {/* =============================================
            PAGE HERO
        ============================================== */}

        <section className="rounded-2xl bg-[#111111] px-6 py-14 text-center sm:px-10 sm:py-16 lg:py-20">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
            Career Opportunities
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            Find Your Next{" "}
            <span className="text-[#D4AF37]">
              Overseas Opportunity
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
            Explore international employment opportunities across
            equestrian and diverse industries and find a role that
            matches your skills and experience.
          </p>
        </section>

        {/* =============================================
            JOB SEARCH AREA
        ============================================== */}

        <section className="py-16 sm:py-20">
          {/* Section Header */}

          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#B68D2A]">
                Available Positions
              </p>

              <h2 className="text-3xl font-bold text-[#111111] sm:text-4xl">
                {category === "all"
                  ? "Explore Current Jobs"
                  : `${decodeURIComponent(category)} Opportunities`}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                Browse available positions and use the filters to find
                opportunities that suit your experience and career goals.
              </p>
            </div>

            {/* Job Count */}

            <div className="flex items-center gap-3 self-start rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-5 py-3 lg:self-auto">
              <BriefcaseBusiness
                size={19}
                className="text-[#B68D2A]"
              />

              <div>
                <p className="text-xs text-gray-500">
                  Opportunities Found
                </p>

                <p className="font-bold text-[#111111]">
                  {filteredJobs.length}{" "}
                  {filteredJobs.length === 1 ? "Job" : "Jobs"}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}

          <div className="mb-6 md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#111111] px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#111111]"
            >
              {showFilters ? <X size={18} /> : <Filter size={18} />}

              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Main Grid */}

          <div className="flex flex-col gap-8 md:flex-row lg:gap-10">
            {/* =============================================
                FILTER SIDEBAR
            ============================================== */}

            <motion.aside
              variants={slideRigth(0.3)}
              initial="hidden"
              animate="visible"
              className={`h-fit rounded-2xl border border-gray-200 bg-white p-6 md:w-[32%] lg:w-[27%] ${
                showFilters ? "block" : "hidden md:block"
              }`}
            >
              {/* Filter Heading */}

              <div className="mb-7 flex items-center justify-between border-b border-gray-100 pb-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal
                    size={19}
                    className="text-[#B68D2A]"
                  />

                  <h3 className="font-bold text-[#111111]">
                    Filter Jobs
                  </h3>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-[#B68D2A] transition-colors hover:text-[#111111]"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-8">
                {/* Job Title */}

                <div>
                  <label
                    htmlFor="job-title"
                    className="mb-3 block text-sm font-bold text-[#111111]"
                  >
                    Job Title
                  </label>

                  <div className="relative">
                    <Search
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B68D2A]"
                    />

                    <input
                      id="job-title"
                      type="text"
                      name="title"
                      value={searchInput.title}
                      onChange={handleSearchChange}
                      placeholder="Search job title"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/10"
                    />
                  </div>
                </div>

                {/* Location Search */}

                <div>
                  <label
                    htmlFor="job-location"
                    className="mb-3 block text-sm font-bold text-[#111111]"
                  >
                    Location
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B68D2A]"
                    />

                    <input
                      id="job-location"
                      type="text"
                      name="location"
                      value={searchInput.location}
                      onChange={handleSearchChange}
                      placeholder="Search country or location"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/10"
                    />
                  </div>
                </div>

                {/* Categories */}

                <div>
                  <h3 className="mb-4 text-sm font-bold text-[#111111]">
                    Job Categories
                  </h3>

                  <ul className="space-y-3">
                    {JobCategories.map((cat, index) => (
                      <li
                        key={cat}
                        className="flex items-center"
                      >
                        <input
                          type="checkbox"
                          id={`cat-${index}`}
                          checked={searchInput.selectedCategories.includes(
                            cat
                          )}
                          onChange={() =>
                            handleCategoryToggle(cat)
                          }
                          className="h-4 w-4 cursor-pointer accent-[#D4AF37]"
                        />

                        <label
                          htmlFor={`cat-${index}`}
                          className="ml-3 cursor-pointer text-sm text-gray-600 transition-colors hover:text-[#111111]"
                        >
                          {cat}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Locations */}

                <div>
                  <h3 className="mb-4 text-sm font-bold text-[#111111]">
                    Locations
                  </h3>

                  <ul className="space-y-3">
                    {JobLocations.map((loc, index) => (
                      <li
                        key={loc}
                        className="flex items-center"
                      >
                        <input
                          type="checkbox"
                          id={`loc-${index}`}
                          checked={searchInput.selectedLocations.includes(
                            loc
                          )}
                          onChange={() =>
                            handleLocationToggle(loc)
                          }
                          className="h-4 w-4 cursor-pointer accent-[#D4AF37]"
                        />

                        <label
                          htmlFor={`loc-${index}`}
                          className="ml-3 cursor-pointer text-sm text-gray-600 transition-colors hover:text-[#111111]"
                        >
                          {loc}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.aside>

            {/* =============================================
                JOB LISTINGS
            ============================================== */}

            <div className="min-w-0 flex-1">
              {paginatedJobs.length > 0 ? (
                <>
                  <motion.div
                    variants={SlideUp(0.4)}
                    initial="hidden"
                    animate="visible"
                    className="space-y-5"
                  >
                    {paginatedJobs.map((job, index) => (
                      <JobCard
                        key={job._id || job.id || index}
                        job={job}
                      />
                    ))}
                  </motion.div>

                  {/* =============================================
                      PAGINATION
                  ============================================== */}

                  {totalPages > 1 && (
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.max(prev - 1, 1)
                          )
                        }
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-all duration-300 hover:border-[#D4AF37] hover:text-[#B68D2A] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronLeft size={19} />
                      </button>

                      {Array.from(
                        { length: totalPages },
                        (_, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              setCurrentPage(index + 1)
                            }
                            className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold transition-all duration-300 ${
                              currentPage === index + 1
                                ? "border-[#D4AF37] bg-[#D4AF37] text-[#111111]"
                                : "border-gray-200 bg-white text-gray-600 hover:border-[#D4AF37] hover:text-[#B68D2A]"
                            }`}
                          >
                            {index + 1}
                          </button>
                        )
                      )}

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-all duration-300 hover:border-[#D4AF37] hover:text-[#B68D2A] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronRight size={19} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* =============================================
                    EMPTY STATE
                ============================================== */

                <motion.div
                  variants={SlideUp(0.4)}
                  initial="hidden"
                  animate="visible"
                  className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10">
                    <BriefcaseBusiness
                      size={28}
                      strokeWidth={1.7}
                      className="text-[#B68D2A]"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-[#111111] sm:text-2xl">
                    No Opportunities Found
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
                    We couldn't find any positions matching your
                    current filters. Try changing your search or
                    clearing the selected filters.
                  </p>

                  <button
                    onClick={clearAllFilters}
                    className="mt-7 rounded-lg bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E2BD45] hover:shadow-lg"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AllJobs;
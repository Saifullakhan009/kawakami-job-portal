import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SlideUp } from "../utils/Animation";

const FeaturedJob = () => {
  const { jobs, jobLoading } = useContext(AppContext);
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/all-jobs/all");
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-20 sm:py-24">
      {/* Section Header */}
      <motion.div
        variants={SlideUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-3xl text-center"
      >
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#B68D2A]">
          Latest Opportunities
        </p>

        <h2 className="text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
          Discover Your Next{" "}
          <span className="text-[#D4AF37]">Career Opportunity</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl leading-7 text-gray-600">
          Explore current overseas employment opportunities and find a role
          that matches your skills, experience, and career goals.
        </p>
      </motion.div>

      {/* Loading */}
      {jobLoading ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <Loader />
        </div>
      ) : !Array.isArray(jobs) || jobs.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center">
          <div className="mx-auto mb-4 h-1 w-14 rounded-full bg-[#D4AF37]" />

          <h3 className="text-xl font-bold text-[#111111]">
            No Opportunities Available Right Now
          </h3>

          <p className="mx-auto mt-3 max-w-lg leading-7 text-gray-500">
            New overseas career opportunities will appear here as they become
            available. Please check again soon.
          </p>
        </div>
      ) : (
        <>
          {/* Jobs Grid */}
          <motion.div
            variants={SlideUp(0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-5 lg:grid-cols-2"
          >
            {[...jobs]
              .reverse()
              .slice(0, 6)
              .map((job, index) => (
                <JobCard
                  job={job}
                  key={job._id || job.id || index}
                />
              ))}
          </motion.div>

          {/* View All */}
          <motion.div
            variants={SlideUp(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <button
              type="button"
              onClick={handleViewAll}
              className="group inline-flex items-center gap-2 rounded-lg bg-[#111111] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#D4AF37] hover:text-[#111111] hover:shadow-lg"
            >
              View All Opportunities

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </motion.div>
        </>
      )}
    </section>
  );
};

export default FeaturedJob;
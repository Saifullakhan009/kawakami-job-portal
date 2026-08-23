import React from "react";
import moment from "moment";
import kConverter from "k-convert";
import { assets } from "../assets/assets";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  UserRound,
  WalletCards,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleOpenJob = () => {
    navigate(`/apply-job/${job._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <article
      onClick={handleOpenJob}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpenJob();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${job.title}`}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-xl sm:p-7"
    >
      {/* Top Section */}
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-2">
          <img
            className="h-full w-full object-contain"
            src={job.companyId?.image || assets.company_icon}
            alt={`${job.companyId?.name || "Company"} logo`}
            loading="lazy"
          />
        </div>

        {/* Job Title */}
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#B68D2A]">
            Career Opportunity
          </p>

          <h3 className="text-xl font-bold leading-snug text-[#111111] transition-colors duration-300 group-hover:text-[#B68D2A]">
            {job.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <BriefcaseBusiness
              size={16}
              className="shrink-0 text-[#B68D2A]"
            />

            <span className="truncate">
              {job.companyId?.name || "Company not specified"}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] sm:flex">
          <ArrowUpRight
            size={18}
            className="text-gray-500 transition-colors duration-300 group-hover:text-[#111111]"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-gray-100" />

      {/* Job Information */}
      <div className="grid gap-4 text-sm text-gray-600 sm:grid-cols-2">
        {/* Location */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10">
            <MapPin size={17} className="text-[#B68D2A]" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-gray-400">Location</p>
            <p className="truncate font-medium text-gray-700">
              {job.location || "Not specified"}
            </p>
          </div>
        </div>

        {/* Experience Level */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10">
            <UserRound size={17} className="text-[#B68D2A]" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-gray-400">Experience</p>
            <p className="truncate font-medium text-gray-700">
              {job.level || "Not specified"}
            </p>
          </div>
        </div>

        {/* Salary */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10">
            <WalletCards size={17} className="text-[#B68D2A]" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-gray-400">Salary / CTC</p>
            <p className="truncate font-medium text-gray-700">
              {job.salary
                ? kConverter.convertTo(job.salary)
                : "Not disclosed"}
            </p>
          </div>
        </div>

        {/* Posted */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10">
            <Clock3 size={17} className="text-[#B68D2A]" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-gray-400">Posted</p>
            <p className="truncate font-medium text-gray-700">
              {job.date ? moment(job.date).fromNow() : "Recently"}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
        <span className="text-xs font-medium text-gray-400">
          Kawakami Overseas Placements
        </span>

        <span className="flex items-center gap-1.5 text-sm font-bold text-[#B68D2A]">
          View Details

          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>

      {/* Gold Hover Line */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#D4AF37] transition-all duration-500 group-hover:w-full" />
    </article>
  );
};

export default JobCard;
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ChefHat,
  HardHat,
  HeartHandshake,
  Truck,
} from "lucide-react";
import { SlideUp } from "../utils/Animation";

const sectors = [
  {
    name: "Equestrian",
    title: "Equestrian & Racing",
    description:
      "Opportunities across horse racing, stable operations, stud farms, and equine support roles.",
    icon: HeartHandshake,
    featured: true,
  },
  {
    name: "Construction",
    title: "Construction & Engineering",
    description:
      "International opportunities for construction workers, technicians, and skilled personnel.",
    icon: HardHat,
  },
  {
    name: "Hospitality",
    title: "Hospitality & Services",
    description:
      "Career opportunities across hospitality, service operations, and related international roles.",
    icon: ChefHat,
  },
  {
    name: "Logistics",
    title: "Logistics & Transport",
    description:
      "Opportunities supporting transportation, logistics, warehousing, and international operations.",
    icon: Truck,
  },
  {
    name: "Skilled Trades",
    title: "Technical & Skilled Trades",
    description:
      "International roles for skilled professionals, technicians, mechanics, and trade specialists.",
    icon: Building2,
  },
  {
    name: "all",
    title: "Other Opportunities",
    description:
      "Explore additional overseas career opportunities available through KOP.",
    icon: BriefcaseBusiness,
  },
];

const JobCategory = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const handleClick = useCallback(
    (index, category) => {
      setActiveIndex(index);

      setTimeout(() => {
        setActiveIndex(null);
      }, 150);

      navigate(`/all-jobs/${encodeURIComponent(category)}`);
      window.scrollTo(0, 0);
    },
    [navigate]
  );

  const viewAllJobs = () => {
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
          Global Opportunities
        </p>

        <h2 className="text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
          Explore Careers Across{" "}
          <span className="text-[#D4AF37]">Multiple Industries</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl leading-7 text-gray-600">
          From our roots in equestrian recruitment to opportunities across
          diverse industries, KOP connects skilled candidates with suitable
          overseas career opportunities.
        </p>
      </motion.div>

      {/* Sector Cards */}
      <motion.div
        variants={SlideUp(0.3)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {sectors.map((sector, index) => {
          const Icon = sector.icon;
          const isActive = activeIndex === index;

          return (
            <article
              key={sector.title}
              onClick={() => handleClick(index, sector.name)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick(index, sector.name);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${sector.title} jobs`}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                sector.featured
                  ? "border-[#D4AF37]/50 bg-[#111111]"
                  : "border-gray-200 bg-white hover:border-[#D4AF37]/50"
              } ${isActive ? "scale-[0.98]" : ""}`}
            >
              {/* Featured Label */}
              {sector.featured && (
                <div className="absolute right-5 top-5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
                    KOP Heritage
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 ${
                  sector.featured
                    ? "bg-[#D4AF37]"
                    : "border border-[#D4AF37]/30 bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]"
                }`}
              >
                <Icon
                  size={26}
                  strokeWidth={1.8}
                  className={
                    sector.featured
                      ? "text-[#111111]"
                      : "text-[#B68D2A] transition-colors duration-300 group-hover:text-[#111111]"
                  }
                />
              </div>

              {/* Content */}
              <h3
                className={`mb-3 text-xl font-bold ${
                  sector.featured ? "text-white" : "text-[#111111]"
                }`}
              >
                {sector.title}
              </h3>

              <p
                className={`min-h-[84px] text-sm leading-7 ${
                  sector.featured ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {sector.description}
              </p>

              {/* Explore */}
              <div
                className={`mt-6 flex items-center gap-2 text-sm font-bold ${
                  sector.featured
                    ? "text-[#D4AF37]"
                    : "text-[#B68D2A]"
                }`}
              >
                Explore Jobs

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>

              {/* Bottom Accent */}
              <div
                className={`absolute bottom-0 left-0 h-[3px] transition-all duration-300 ${
                  sector.featured
                    ? "w-full bg-[#D4AF37]"
                    : "w-0 bg-[#D4AF37] group-hover:w-full"
                }`}
              />
            </article>
          );
        })}
      </motion.div>

      {/* View All Jobs */}
      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={viewAllJobs}
          className="group inline-flex items-center gap-2 rounded-lg bg-[#111111] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#D4AF37] hover:text-[#111111] hover:shadow-lg"
        >
          View All Opportunities

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </section>
  );
};

export default JobCategory;
import React from "react";
import {
  BriefcaseBusiness,
  FileCheck2,
  GraduationCap,
  Plane,
  SearchCheck,
  UsersRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { SlideUp } from "../utils/Animation";

const services = [
  {
    icon: BriefcaseBusiness,
    title: "Global Job Placements",
    description:
      "Connecting qualified candidates with suitable overseas employment opportunities across industries.",
  },
  {
    icon: SearchCheck,
    title: "Recruitment & Screening",
    description:
      "Identifying, evaluating, and screening candidates to help employers find professionals suited to their requirements.",
  },
  {
    icon: FileCheck2,
    title: "Visa & Documentation Support",
    description:
      "Assistance with visa procedures, documentation, and the formalities required for overseas employment.",
  },
  {
    icon: UsersRound,
    title: "Pre-Departure Orientation",
    description:
      "Preparing candidates for their journey with guidance and essential information before travelling overseas.",
  },
  {
    icon: Plane,
    title: "Relocation Assistance",
    description:
      "Supporting candidates through important relocation requirements as they transition to employment abroad.",
  },
  {
    icon: GraduationCap,
    title: "Career Guidance & Training",
    description:
      "Providing career guidance and preparation to help candidates approach international opportunities with confidence.",
  },
];

const Services = () => {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto">
        {/* Section Heading */}
        <motion.div
          variants={SlideUp(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#B68D2A]">
            Our Services
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
            Complete Support for Your{" "}
            <span className="text-[#D4AF37]">Overseas Career</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            From finding the right opportunity to preparing for your journey
            abroad, Kawakami Overseas Placements supports candidates throughout
            the overseas recruitment process.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                variants={SlideUp(0.15 + index * 0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 transition-all duration-300 group-hover:bg-[#D4AF37]">
                  <Icon
                    size={26}
                    strokeWidth={1.8}
                    className="text-[#B68D2A] transition-colors duration-300 group-hover:text-[#111111]"
                  />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-[#111111]">
                  {service.title}
                </h3>

                <p className="text-sm leading-7 text-gray-600">
                  {service.description}
                </p>

                {/* Decorative line */}
                <div className="mt-6 h-[2px] w-10 bg-[#D4AF37] transition-all duration-300 group-hover:w-20" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
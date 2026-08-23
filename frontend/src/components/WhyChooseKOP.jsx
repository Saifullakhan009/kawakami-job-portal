import React from "react";
import {
  BriefcaseBusiness,
  FileCheck2,
  Globe2,
  Handshake,
} from "lucide-react";
import { motion } from "framer-motion";
import { SlideUp } from "../utils/Animation";

const reasons = [
  {
    icon: BriefcaseBusiness,
    title: "Specialised Recruitment",
    description:
      "Recruitment experience across specialised roles, including KOP's roots in equestrian, horse racing, stable operations, and related employment sectors.",
  },
  {
    icon: Globe2,
    title: "Overseas Career Support",
    description:
      "Supporting candidates as they explore suitable international employment opportunities and prepare for their overseas career journey.",
  },
  {
    icon: FileCheck2,
    title: "Documentation Assistance",
    description:
      "Guidance through recruitment documentation, visa-related procedures, and important overseas employment formalities.",
  },
  {
    icon: Handshake,
    title: "Candidate-Focused Guidance",
    description:
      "Helping candidates understand opportunities, prepare for recruitment requirements, and move forward with greater confidence.",
  },
];

const WhyChooseKOP = () => {
  return (
    <section className="mt-24">
      <div className="rounded-2xl bg-[#111111] px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

          {/* LEFT SIDE */}
          <motion.div
            variants={SlideUp(0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Small Heading */}
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              Why Choose KOP
            </p>

            {/* Main Heading */}
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Recruitment Built on{" "}
              <span className="text-[#D4AF37]">
                Experience & Trust
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl leading-7 text-gray-400">
              From specialised equestrian recruitment to opportunities across
              diverse industries, Kawakami Overseas Placements supports
              candidates throughout their overseas employment journey.
            </p>

            {/* Gold Decorative Line */}
            <div className="mt-8 h-[2px] w-20 bg-[#D4AF37]" />

            {/* Additional Message */}
            <p className="mt-8 max-w-lg text-sm leading-7 text-gray-500">
              Our approach focuses on understanding candidate skills,
              recruitment requirements, and the preparation needed for
              international employment opportunities.
            </p>
          </motion.div>

          {/* RIGHT SIDE - FEATURE CARDS */}
          <div className="grid gap-5 sm:grid-cols-2">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <motion.article
                  key={reason.title}
                  variants={SlideUp(0.3 + index * 0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group rounded-xl border border-white/10 bg-[#191919] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-xl"
                >
                  {/* Icon */}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/10 transition-all duration-300 group-hover:bg-[#D4AF37]">
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                      className="text-[#D4AF37] transition-colors duration-300 group-hover:text-[#111111]"
                    />
                  </div>

                  {/* Card Heading */}
                  <h3 className="mb-3 text-lg font-bold text-white">
                    {reason.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-sm leading-6 text-gray-400">
                    {reason.description}
                  </p>

                  {/* Hover Gold Line */}
                  <div className="mt-5 h-[2px] w-8 bg-[#D4AF37] transition-all duration-300 group-hover:w-16" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseKOP;
import React from "react";
import {
  Search,
  ClipboardCheck,
  FileCheck2,
  PlaneTakeoff,
} from "lucide-react";
import { motion } from "framer-motion";
import { SlideUp } from "../utils/Animation";

const recruitmentSteps = [
  {
    number: "01",
    icon: Search,
    title: "Explore Opportunities",
    description:
      "Browse available overseas employment opportunities and identify roles that match your skills and experience.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Recruitment & Screening",
    description:
      "Candidate profiles are reviewed according to the requirements of the available position and employer.",
  },
  {
    number: "03",
    icon: FileCheck2,
    title: "Documentation Support",
    description:
      "Selected candidates receive guidance through the required recruitment documentation and overseas employment formalities.",
  },
  {
    number: "04",
    icon: PlaneTakeoff,
    title: "Prepare for Overseas Employment",
    description:
      "Candidates are supported with important preparation and guidance before beginning their overseas employment journey.",
  },
];

const Testimonials = () => {
  return (
    <section className="mt-28 mb-28">
      {/* Section Header */}
      <motion.div
        variants={SlideUp(0.3)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-3xl text-center"
      >
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#B68D2A]">
          How It Works
        </p>

        <h2 className="text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
          Your Journey to an{" "}
          <span className="text-[#D4AF37]">Overseas Career</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
          From discovering suitable opportunities to preparing for overseas
          employment, KOP supports candidates through the key stages of the
          recruitment journey.
        </p>
      </motion.div>

      {/* Recruitment Process */}
      <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {recruitmentSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.article
              key={step.number}
              variants={SlideUp(0.3 + index * 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-xl"
            >
              {/* Step Number */}
              <span className="absolute right-6 top-5 text-5xl font-bold text-gray-100 transition-colors duration-300 group-hover:text-[#D4AF37]/15">
                {step.number}
              </span>

              {/* Icon */}
              <div className="relative mb-7 flex h-14 w-14 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 transition-all duration-300 group-hover:bg-[#D4AF37]">
                <Icon
                  size={26}
                  strokeWidth={1.8}
                  className="text-[#B68D2A] transition-colors duration-300 group-hover:text-[#111111]"
                />
              </div>

              {/* Step Label */}
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B68D2A]">
                Step {step.number}
              </p>

              {/* Title */}
              <h3 className="mb-4 text-xl font-bold text-[#111111]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-7 text-gray-600">
                {step.description}
              </p>

              {/* Decorative Line */}
              <div className="mt-6 h-[2px] w-10 bg-[#D4AF37] transition-all duration-300 group-hover:w-20" />
            </motion.article>
          );
        })}
      </div>

      {/* Bottom Message */}
      <motion.div
        variants={SlideUp(0.4)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-gray-500">
          The exact recruitment process may vary depending on the position,
          employer requirements, and destination.
        </p>
      </motion.div>
    </section>
  );
};

export default Testimonials;
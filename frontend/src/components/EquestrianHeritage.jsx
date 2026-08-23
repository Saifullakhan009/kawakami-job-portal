import React from "react";
import {
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SlideUp } from "../utils/Animation";

const EquestrianHeritage = () => {
  const navigate = useNavigate();

  const roles = [
    "Horse Groom",
    "Stable Staff",
    "Exercise Rider",
    "Racing Support Staff",
    "Stud Farm Worker",
    "Equine Care Staff",
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        
        {/* LEFT SIDE */}
        <motion.div
          variants={SlideUp(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#B68D2A]">
            Our Heritage
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
            Rooted in{" "}
            <span className="text-[#D4AF37]">
              Equestrian Recruitment
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-600">
            Kawakami Overseas Placements has strong roots in the equestrian
            sector, supporting recruitment for horse racing, stable operations,
            stud farms, and related equine roles.
          </p>

          <p className="mt-4 max-w-xl text-base leading-8 text-gray-600">
            Today, that recruitment experience continues as KOP connects
            skilled candidates with overseas opportunities across equestrian
            and diverse employment sectors.
          </p>

          {/* Roles */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {roles.map((role) => (
              <div
                key={role}
                className="flex items-center gap-3 text-sm font-medium text-[#222222]"
              >
                <BadgeCheck
                  size={18}
                  className="shrink-0 text-[#C99A20]"
                />
                {role}
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/all-jobs/all")}
            className="mt-9 inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-[#111111] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C49F2F] hover:shadow-lg"
          >
            Explore Opportunities
            <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          variants={SlideUp(0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl bg-[#111111] p-8 sm:p-10">
            
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
                Equestrian Expertise
              </p>

              <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                Recruitment Built Around
                <span className="text-[#D4AF37]"> Specialized Skills</span>
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                Understanding specialized roles helps connect the right
                candidates with suitable international opportunities.
              </p>
            </div>

            <div className="space-y-4">
              {/* Card 1 */}
              <div className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10">
                  <UsersRound
                    size={22}
                    className="text-[#D4AF37]"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-white">
                    Specialized Recruitment
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Recruitment support for skilled equestrian and racing
                    personnel.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10">
                  <ShieldCheck
                    size={22}
                    className="text-[#D4AF37]"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-white">
                    Overseas Career Support
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Supporting candidates through recruitment,
                    documentation, and overseas employment preparation.
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative line */}
            <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

            <p className="mt-7 text-center text-sm font-medium italic text-gray-400">
              From equestrian expertise to global career opportunities.
            </p>
          </div>

          {/* Gold decorative block */}
          <div className="absolute -bottom-3 -right-3 -z-10 h-28 w-28 rounded-2xl bg-[#D4AF37]/20" />
        </motion.div>
      </div>
    </section>
  );
};

export default EquestrianHeritage;
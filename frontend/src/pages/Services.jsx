import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  BriefcaseBusiness,
  FileCheck2,
  GraduationCap,
  Plane,
  SearchCheck,
  UsersRound,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: BriefcaseBusiness,
    title: "Global Job Placements",
    description:
      "Connecting qualified candidates with suitable overseas employment opportunities based on their skills, experience, and career goals.",
  },
  {
    number: "02",
    icon: SearchCheck,
    title: "Recruitment & Screening",
    description:
      "Professional candidate sourcing, evaluation, and screening based on specific employer requirements and international recruitment standards.",
  },
  {
    number: "03",
    icon: FileCheck2,
    title: "Visa & Documentation Support",
    description:
      "Guidance and assistance with visa procedures, required documentation, and overseas employment formalities throughout the process.",
  },
  {
    number: "04",
    icon: UsersRound,
    title: "Pre-Departure Orientation",
    description:
      "Preparing candidates with essential information and practical guidance before beginning their overseas employment journey.",
  },
  {
    number: "05",
    icon: Plane,
    title: "Relocation Assistance",
    description:
      "Supporting candidates through important relocation requirements and helping make their transition to employment abroad smoother.",
  },
  {
    number: "06",
    icon: GraduationCap,
    title: "Career Guidance & Training",
    description:
      "Career guidance and preparation designed to help candidates approach international employment opportunities with greater confidence.",
  },
];

const Services = () => {
  return (
    <>
      <Navbar />

      <main>
        {/* =========================
            PAGE HERO
        ========================== */}
        <section className="relative overflow-hidden rounded-2xl bg-[#111111] px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24">
          
          {/* Subtle gold background glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#D4AF37]/5 blur-3xl" />

          <div className="relative z-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              What We Do
            </p>

            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Our Recruitment{" "}
              <span className="text-[#D4AF37]">Services</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
              From recruitment and documentation to overseas career support,
              Kawakami Overseas Placements assists candidates throughout their
              international employment journey.
            </p>
          </div>
        </section>

        {/* =========================
            SERVICES SECTION
        ========================== */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#B68D2A]">
              Complete Recruitment Support
            </p>

            <h2 className="text-3xl font-bold leading-tight text-[#111111] sm:text-4xl">
              Supporting You at Every{" "}
              <span className="text-[#D4AF37]">Stage</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
              Our services are designed to support candidates from identifying
              opportunities through preparation for overseas employment.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-xl"
                >
                  {/* Service number */}
                  <span className="absolute right-6 top-5 text-4xl font-bold text-gray-100 transition-colors duration-300 group-hover:text-[#D4AF37]/15">
                    {service.number}
                  </span>

                  {/* Icon */}
                  <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]">
                    <Icon
                      size={26}
                      strokeWidth={1.8}
                      className="text-[#B68D2A] transition-colors duration-300 group-hover:text-[#111111]"
                    />
                  </div>

                  <h3 className="relative mb-3 text-xl font-bold text-[#111111]">
                    {service.title}
                  </h3>

                  <p className="relative text-sm leading-7 text-gray-600">
                    {service.description}
                  </p>

                  {/* Gold accent */}
                  <div className="mt-7 h-[2px] w-10 bg-[#D4AF37] transition-all duration-300 group-hover:w-20" />
                </article>
              );
            })}
          </div>
        </section>

        {/* =========================
            CALL TO ACTION
        ========================== */}
        <section className="mb-20 overflow-hidden rounded-2xl bg-[#111111] px-6 py-14 sm:px-10 lg:px-16">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            
            <div className="max-w-2xl text-center lg:text-left">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37] sm:text-sm">
                Start Your Journey
              </p>

              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Looking for an Overseas{" "}
                <span className="text-[#D4AF37]">Opportunity?</span>
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-gray-400">
                Explore available opportunities and take the next step toward
                your international career with Kawakami Overseas Placements.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                to="/all-jobs/all"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-7 py-3.5 font-semibold text-[#111111] transition-all duration-300 hover:bg-[#E5C14A]"
              >
                Explore Jobs
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-gray-600 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Services;
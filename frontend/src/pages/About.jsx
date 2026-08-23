import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  FileCheck2,
  Globe2,
  HeartHandshake,
  Plane,
  SearchCheck,
  ShieldCheck,
  Target,
  UserCheck,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* =========================================================
   WHY CHOOSE KOP
========================================================= */

const values = [
  {
    icon: ShieldCheck,
    title: "Transparent Recruitment",
    description:
      "A professional and transparent recruitment approach focused on connecting suitable candidates with international employment opportunities.",
  },
  {
    icon: HeartHandshake,
    title: "Candidate Support",
    description:
      "Personalized guidance and support throughout important stages of the overseas employment journey.",
  },
  {
    icon: FileCheck2,
    title: "Documentation Assistance",
    description:
      "Support with documentation, visa-related procedures, and important overseas employment formalities.",
  },
  {
    icon: Globe2,
    title: "Global Opportunities",
    description:
      "Helping skilled professionals explore opportunities beyond borders while providing support throughout the recruitment process.",
  },
];

/* =========================================================
   RECRUITMENT PROCESS
========================================================= */

const recruitmentSteps = [
  {
    number: "01",
    icon: UserCheck,
    title: "Candidate Registration",
    description:
      "Candidates begin by sharing their profile, skills, experience, and employment preferences.",
  },
  {
    number: "02",
    icon: SearchCheck,
    title: "Screening & Evaluation",
    description:
      "Profiles are reviewed and evaluated according to available opportunities and employer requirements.",
  },
  {
    number: "03",
    icon: BriefcaseBusiness,
    title: "Job Matching",
    description:
      "Suitable candidates are connected with relevant international employment opportunities.",
  },
  {
    number: "04",
    icon: FileCheck2,
    title: "Documentation Support",
    description:
      "Selected candidates receive assistance with required documentation, visa procedures, and employment formalities.",
  },
  {
    number: "05",
    icon: Plane,
    title: "Pre-Departure Support",
    description:
      "Candidates receive important guidance and preparation before beginning their overseas employment journey.",
  },
];

const About = () => {
  return (
    <>
      <Navbar />

      <main>
        {/* =================================================
            ABOUT HERO
        ================================================== */}

        <section className="relative overflow-hidden rounded-2xl bg-[#111111] px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24">
          {/* Decorative gold glows */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#D4AF37]/5 blur-3xl" />

          <div className="relative z-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              About KOP
            </p>

            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Connecting Talent With{" "}
              <span className="text-[#D4AF37]">
                Global Opportunities
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
              Kawakami Overseas Placements connects skilled professionals with
              international employment opportunities while providing support
              throughout their overseas recruitment journey.
            </p>
          </div>
        </section>

        {/* =================================================
            WHO WE ARE
        ================================================== */}

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              {/* Left */}
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#B68D2A]">
                  Who We Are
                </p>

                <h2 className="text-3xl font-bold leading-tight text-[#111111] sm:text-4xl lg:text-4xl">
                  Your Partner for an{" "}
                  <span className="text-[#D4AF37]">
                    International Career
                  </span>
                </h2>

                <div className="mt-7 h-[3px] w-20 bg-[#D4AF37]" />

                <p className="mt-7 text-sm font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Kawakami Overseas Placements
                </p>
              </div>

              {/* Right */}
              <div>
                <p className="text-lg leading-8 text-gray-600">
                  Kawakami Overseas Placements is dedicated to connecting
                  skilled professionals with international employers and
                  suitable overseas career opportunities.
                </p>

                <p className="mt-5 leading-8 text-gray-600">
                  Our support extends beyond identifying vacancies. We assist
                  candidates through important stages such as recruitment and
                  screening, documentation, visa procedures, pre-departure
                  preparation, relocation support, and career guidance.
                </p>

                <p className="mt-5 leading-8 text-gray-600">
                  By combining professional recruitment practices with
                  candidate-focused support, KOP aims to create a smoother and
                  more dependable pathway between talent and international
                  employment opportunities.
                </p>

                {/* Highlight statement */}
                <div className="mt-8 rounded-xl border border-gray-200 bg-[#FAFAFA] p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10">
                      <CheckCircle2
                        size={21}
                        strokeWidth={2}
                        className="text-[#B68D2A]"
                      />
                    </div>

                    <p className="font-medium leading-7 text-[#333333]">
                      Our focus is on transparent recruitment, the right job
                      fit, and continued support throughout the candidate's
                      overseas employment journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            MISSION & VISION
        ================================================== */}

        <section className="rounded-2xl bg-[#F7F7F7] px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#B68D2A]">
              Our Purpose
            </p>

            <h2 className="text-3xl font-bold text-[#111111] sm:text-4xl">
              Mission & <span className="text-[#D4AF37]">Vision</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
              Building meaningful connections between skilled professionals
              and international employers through responsible recruitment and
              dependable support.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Mission */}
            <article className="group rounded-2xl bg-[#111111] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#D4AF37]">
                <Target
                  size={27}
                  strokeWidth={1.8}
                  className="text-[#111111]"
                />
              </div>

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                Our Mission
              </p>

              <h3 className="mb-4 text-2xl font-bold text-white">
                Creating Career Pathways
              </h3>

              <p className="leading-8 text-gray-400">
                To connect skilled professionals with international employers
                through transparent recruitment, personalized support, and
                end-to-end assistance throughout the overseas placement
                process.
              </p>
            </article>

            {/* Vision */}
            <article className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-xl sm:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#D4AF37]/10">
                <Eye
                  size={27}
                  strokeWidth={1.8}
                  className="text-[#B68D2A]"
                />
              </div>

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B68D2A]">
                Our Vision
              </p>

              <h3 className="mb-4 text-2xl font-bold text-[#111111]">
                Opportunities Beyond Borders
              </h3>

              <p className="leading-8 text-gray-600">
                To become a trusted global recruitment partner that empowers
                professionals to build successful international careers while
                helping employers access dependable talent.
              </p>
            </article>
          </div>
        </section>

        {/* =================================================
            WHY CHOOSE KOP
        ================================================== */}

        <section className="py-20 sm:py-24">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#B68D2A]">
              Why Choose KOP
            </p>

            <h2 className="text-3xl font-bold leading-tight text-[#111111] sm:text-4xl">
              Support Beyond{" "}
              <span className="text-[#D4AF37]">Recruitment</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
              Overseas employment involves more than finding a vacancy. Our
              approach supports candidates through the important stages of
              their international career journey.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-xl"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10 transition-colors duration-300 group-hover:bg-[#D4AF37]">
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                      className="text-[#B68D2A] transition-colors duration-300 group-hover:text-[#111111]"
                    />
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-[#111111]">
                    {value.title}
                  </h3>

                  <p className="text-sm leading-7 text-gray-600">
                    {value.description}
                  </p>

                  <div className="mt-6 h-[2px] w-8 bg-[#D4AF37] transition-all duration-300 group-hover:w-16" />
                </article>
              );
            })}
          </div>
        </section>

        {/* =================================================
            RECRUITMENT JOURNEY
        ================================================== */}

        <section className="rounded-2xl bg-[#111111] px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              The Recruitment Journey
            </p>

            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              From Application to{" "}
              <span className="text-[#D4AF37]">Opportunity</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-400">
              A structured process helps candidates understand the important
              stages involved in pursuing overseas employment opportunities.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {recruitmentSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="relative rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:bg-white/[0.07]"
                >
                  <span className="absolute right-5 top-4 text-3xl font-bold text-white/10">
                    {step.number}
                  </span>

                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#D4AF37]">
                    <Icon
                      size={21}
                      strokeWidth={1.8}
                      className="text-[#111111]"
                    />
                  </div>

                  <h3 className="mb-3 font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-6 text-gray-400">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* =================================================
            CTA
        ================================================== */}

        <section className="py-20">
          <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#FAFAFA] px-6 py-14 text-center sm:px-10 lg:py-16">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#B68D2A]">
              Your Career. Beyond Borders.
            </p>

            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-[#111111] sm:text-4xl">
              Ready to Explore Your Next{" "}
              <span className="text-[#D4AF37]">
                Career Opportunity?
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-600">
              Explore available positions or contact Kawakami Overseas
              Placements to learn more about our recruitment services and
              overseas employment opportunities.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/all-jobs/all"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-7 py-3.5 font-semibold text-[#111111] transition-all duration-300 hover:bg-[#E5C14A]"
              >
                Explore Jobs
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-[#111111] px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-[#252525]"
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

export default About;
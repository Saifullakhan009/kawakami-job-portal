import React, { useContext, useRef } from "react";
import { Search, MapPin, ShieldCheck, FileCheck, Plane } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SlideUp } from "../utils/Animation";

const Hero = () => {
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const searchHandler = (e) => {
    e.preventDefault();

    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });

    setIsSearched(true);

    if (titleRef.current.value || locationRef.current.value) {
      navigate("/all-jobs/all");
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#111111] px-6 py-16 md:px-12 lg:px-20 lg:py-20">
      
      {/* Decorative gold glow */}
      <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#D4AF37]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">

        {/* Small label */}
        <motion.div
          variants={SlideUp(0.2)}
          initial="hidden"
          animate="visible"
          className="mb-6 inline-flex items-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]"
        >
          Kawakami Overseas Placements
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={SlideUp(0.3)}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          Your Gateway to{" "}
          <span className="text-[#D4AF37]">
            Global Career Opportunities
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={SlideUp(0.4)}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base"
        >
         Connecting skilled professionals with trusted international employers
         and guiding candidates through recruitment, documentation, visa
         processing, and every step of their overseas career journey.
        </motion.p>

        {/* Search */}
        <motion.form
          onSubmit={searchHandler}
          variants={SlideUp(0.5)}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-10 flex w-full max-w-4xl flex-col gap-3 rounded-xl bg-white p-3 shadow-2xl sm:flex-row"
        >
          <div className="flex w-full items-center rounded-lg border border-gray-200 px-4 py-3">
            <Search className="mr-3 shrink-0 text-[#B68D2A]" size={20} />

            <input
              type="text"
              name="job"
              placeholder="Job title or keyword"
              aria-label="Job title or keyword"
              autoComplete="on"
              className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
              ref={titleRef}
            />
          </div>

          <div className="flex w-full items-center rounded-lg border border-gray-200 px-4 py-3">
            <MapPin className="mr-3 shrink-0 text-[#B68D2A]" size={20} />

            <input
              type="text"
              name="location"
              placeholder="Country or location"
              aria-label="Country or location"
              autoComplete="on"
              className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
              ref={locationRef}
            />
          </div>

          <button
            type="submit"
            className="whitespace-nowrap rounded-lg bg-[#D4AF37] px-7 py-3 text-sm font-bold text-[#111111] transition-all duration-300 hover:bg-[#B68D2A] hover:text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"          >
            Search Jobs
          </button>
        </motion.form>

        {/* Trust indicators */}
        <motion.div
          variants={SlideUp(0.6)}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-300"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#D4AF37]" />
            Trusted Recruitment
          </div>

          <div className="flex items-center gap-2">
            <FileCheck size={18} className="text-[#D4AF37]" />
            Documentation Support
          </div>

          <div className="flex items-center gap-2">
            <Plane size={18} className="text-[#D4AF37]" />
            Overseas Assistance
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
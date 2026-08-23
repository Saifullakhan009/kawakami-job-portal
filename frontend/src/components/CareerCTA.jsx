import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, MessageCircle } from "lucide-react";

const CareerCTA = () => {
  const navigate = useNavigate();

  const goToJobs = () => {
    navigate("/all-jobs/all");
    window.scrollTo(0, 0);
  };

  const goToContact = () => {
    navigate("/contact");
    window.scrollTo(0, 0);
  };

  return (
    <section className="mt-24 mb-16">
      <div className="relative overflow-hidden rounded-2xl bg-[#111111] px-6 py-16 sm:px-10 md:py-20 lg:px-16">
        
        {/* Decorative gold glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#D4AF37]/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          
          {/* Small heading */}
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
            Your Next Opportunity Awaits
          </p>

          {/* Main heading */}
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Start Your{" "}
            <span className="text-[#D4AF37]">
              Overseas Career Journey?
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
            Explore international employment opportunities across equestrian
            and diverse industries, or connect with Kawakami Overseas
            Placements for guidance throughout your recruitment journey.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            
            <button
              onClick={goToJobs}
              className="group flex min-w-[180px] items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-7 py-3.5 font-semibold text-[#111111] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E2BD45] hover:shadow-lg"
            >
              <BriefcaseBusiness size={19} />
              Explore Jobs
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <button
              onClick={goToContact}
              className="flex min-w-[180px] items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/60 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              <MessageCircle size={19} />
              Contact KOP
            </button>
          </div>

          {/* Trust line */}
          <div className="mx-auto mt-10 h-px max-w-md bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

          <p className="mt-6 text-sm text-gray-400">
            From specialised equestrian recruitment to global career
            opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CareerCTA;
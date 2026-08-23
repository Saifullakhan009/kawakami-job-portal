import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  BadgeCheck,
  Send,
  User,
  MessageSquare,
} from "lucide-react";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend/API connection will be added later.
    console.log("Contact form submitted");
  };

  return (
    <>
      <Navbar />

      <main>
        {/* =========================
            CONTACT HERO
        ========================== */}
        <section className="rounded-2xl bg-[#111111] px-6 py-16 text-center sm:px-10 sm:py-20">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
            Get In Touch
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            Let's Start Your{" "}
            <span className="text-[#D4AF37]">
              Overseas Career Journey
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl leading-7 text-gray-300">
            Have questions about overseas employment opportunities,
            recruitment, documentation, visa support, or our services?
            Get in touch with Kawakami Overseas Placements.
          </p>
        </section>

        {/* =========================
            CONTACT INTRODUCTION
        ========================== */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#B68D2A]">
              Contact KOP
            </p>

            <h2 className="text-3xl font-bold text-[#111111] sm:text-4xl">
              We're Here to{" "}
              <span className="text-[#D4AF37]">Assist You</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
              Whether you're looking for overseas career opportunities or need
              assistance with the recruitment process, our team is ready to
              guide you.
            </p>
          </div>

          {/* =========================
              CONTACT CARDS
          ========================== */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Phone */}
            <a
              href="tel:+919739521479"
              className="group rounded-2xl border border-gray-200 bg-white p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-xl"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 transition-colors duration-300 group-hover:bg-[#D4AF37]">
                <Phone
                  size={25}
                  className="text-[#B68D2A] transition-colors group-hover:text-[#111111]"
                />
              </div>

              <h3 className="mb-2 text-lg font-bold text-[#111111]">
                Call Us
              </h3>

              <p className="text-sm text-gray-600">+91 9739521479</p>
            </a>

            {/* Email */}
            <a
              href="mailto:kwovpl@gmail.com"
              className="group rounded-2xl border border-gray-200 bg-white p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-xl"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 transition-colors duration-300 group-hover:bg-[#D4AF37]">
                <Mail
                  size={25}
                  className="text-[#B68D2A] transition-colors group-hover:text-[#111111]"
                />
              </div>

              <h3 className="mb-2 text-lg font-bold text-[#111111]">
                Email Us
              </h3>

              <p className="break-all text-sm text-gray-600">
                kwovpl@gmail.com
              </p>
            </a>

            {/* Address */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-xl">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 transition-colors duration-300 group-hover:bg-[#D4AF37]">
                <MapPin
                  size={25}
                  className="text-[#B68D2A] transition-colors group-hover:text-[#111111]"
                />
              </div>

              <h3 className="mb-2 text-lg font-bold text-[#111111]">
                Visit Us
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                100 Feet Main Road,
                <br />
                Sathagalli A Zone,
                <br />
                Mysuru, Karnataka - 570029
              </p>
            </div>

            {/* Website */}
            <a
              href="https://www.kwovpl.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-gray-200 bg-white p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-xl"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 transition-colors duration-300 group-hover:bg-[#D4AF37]">
                <Globe
                  size={25}
                  className="text-[#B68D2A] transition-colors group-hover:text-[#111111]"
                />
              </div>

              <h3 className="mb-2 text-lg font-bold text-[#111111]">
                Website
              </h3>

              <p className="text-sm text-gray-600">www.kwovpl.in</p>
            </a>
          </div>
        </section>

        {/* =========================
            CONTACT FORM
        ========================== */}
        <section className="pb-20 sm:pb-24">
          <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:grid-cols-5">
            {/* Left Information Panel */}
            <div className="bg-[#111111] p-8 sm:p-10 lg:col-span-2">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
                Send An Enquiry
              </p>

              <h2 className="text-3xl font-bold leading-tight text-white">
                Talk to Our{" "}
                <span className="text-[#D4AF37]">Recruitment Team</span>
              </h2>

              <p className="mt-5 leading-7 text-gray-400">
                Tell us how we can assist you. Submit your enquiry and our team
                can get in touch regarding overseas employment opportunities,
                recruitment, documentation, and related services.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10">
                    <Phone size={20} className="text-[#D4AF37]" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a
                      href="tel:+919739521479"
                      className="mt-1 block font-semibold text-white transition-colors hover:text-[#D4AF37]"
                    >
                      +91 9739521479
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10">
                    <Mail size={20} className="text-[#D4AF37]" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a
                      href="mailto:kwovpl@gmail.com"
                      className="mt-1 block font-semibold text-white transition-colors hover:text-[#D4AF37]"
                    >
                      kwovpl@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 sm:p-10 lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name + Phone */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#111111]"
                    >
                      Full Name
                    </label>

                    <div className="flex items-center rounded-lg border border-gray-300 px-4 transition focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37]">
                      <User size={19} className="shrink-0 text-[#B68D2A]" />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Enter your full name"
                        className="w-full bg-transparent px-3 py-3.5 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-[#111111]"
                    >
                      Phone Number
                    </label>

                    <div className="flex items-center rounded-lg border border-gray-300 px-4 transition focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37]">
                      <Phone size={19} className="shrink-0 text-[#B68D2A]" />

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="Enter your phone number"
                        className="w-full bg-transparent px-3 py-3.5 text-sm outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#111111]"
                  >
                    Email Address
                  </label>

                  <div className="flex items-center rounded-lg border border-gray-300 px-4 transition focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37]">
                    <Mail size={19} className="shrink-0 text-[#B68D2A]" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email address"
                      className="w-full bg-transparent px-3 py-3.5 text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Enquiry Type */}
                <div>
                  <label
                    htmlFor="enquiryType"
                    className="mb-2 block text-sm font-semibold text-[#111111]"
                  >
                    Enquiry Type
                  </label>

                  <select
                    id="enquiryType"
                    name="enquiryType"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    <option value="" disabled>
                      Select enquiry type
                    </option>

                    <option value="job-placement">
                      Global Job Placement
                    </option>

                    <option value="recruitment">
                      Recruitment & Screening
                    </option>

                    <option value="visa-documentation">
                      Visa & Documentation Support
                    </option>

                    <option value="pre-departure">
                      Pre-Departure Orientation
                    </option>

                    <option value="relocation">
                      Relocation Assistance
                    </option>

                    <option value="career-guidance">
                      Career Guidance & Training
                    </option>

                    <option value="other">Other Enquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-[#111111]"
                  >
                    Message
                  </label>

                  <div className="flex items-start rounded-lg border border-gray-300 px-4 transition focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37]">
                    <MessageSquare
                      size={19}
                      className="mt-4 shrink-0 text-[#B68D2A]"
                    />

                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      placeholder="Tell us how we can assist you..."
                      className="w-full resize-none bg-transparent px-3 py-3.5 text-sm outline-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-6 py-3.5 font-bold text-[#111111] transition-all duration-300 hover:bg-[#C29B2F] hover:shadow-lg sm:w-auto"
                >
                  Send Enquiry
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* =========================
            LICENSE / TRUST SECTION
        ========================== */}
        <section className="mb-20 rounded-2xl bg-[#111111] px-6 py-12 sm:px-10">
          <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div className="flex flex-col items-center gap-5 md:flex-row">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10">
                <BadgeCheck size={32} className="text-[#D4AF37]" />
              </div>

              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  Authorized Recruitment Agency
                </p>

                <h2 className="text-2xl font-bold text-white">
                  Approved by Ministry of External Affairs, India
                </h2>

                <p className="mt-2 text-gray-400">
                  Kawakami Overseas Placements
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-7 py-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                Recruitment License
              </p>

              <p className="mt-2 text-xl font-bold tracking-wide text-[#D4AF37]">
                RA6093133
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
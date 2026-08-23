import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Globe,
} from "lucide-react";
import { assets } from "../assets/assets";

const Footer = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="overflow-hidden rounded-t-2xl bg-[#0D0D0D] text-white">
      {/* Main Footer */}
      <div className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center gap-3">
              <img
                src={assets.logo}
                alt="Kawakami Overseas Placements"
                className="h-16 w-auto object-contain"
              />
            </div>

            <p className="max-w-sm text-sm leading-7 text-gray-400">
              Connecting skilled professionals with international employment
              opportunities while supporting candidates throughout their
              overseas recruitment journey.
            </p>

            <p className="mt-5 text-sm font-medium leading-6 text-[#D4AF37]">
              From specialised equestrian recruitment to global career
              opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Quick Links
            </p>

            <div className="flex flex-col items-start gap-4">
              {[
                ["Home", "/"],
                ["Jobs", "/all-jobs/all"],
                ["Services", "/services"],
                ["About Us", "/about"],
                ["Contact", "/contact"],
              ].map(([label, path]) => (
                <button
                  key={label}
                  onClick={() => goTo(path)}
                  className="group flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-[#D4AF37]"
                >
                  {label}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Contact Us
            </p>

            <div className="space-y-5 text-sm text-gray-400">
              <a
                href="tel:+919739521479"
                className="flex items-start gap-3 transition-colors duration-300 hover:text-white"
              >
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-[#D4AF37]"
                />
                <span>+91 9739521479</span>
              </a>

              <a
                href="mailto:kwovpl@gmail.com"
                className="flex items-start gap-3 transition-colors duration-300 hover:text-white"
              >
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-[#D4AF37]"
                />
                <span>kwovpl@gmail.com</span>
              </a>

              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#D4AF37]"
                />

                <span className="leading-6">
                  100 Feet Main Road,
                  <br />
                  Sathagalli A Zone,
                  <br />
                  Mysuru, Karnataka
                </span>
              </div>

              <a
                href="https://www.kwovpl.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors duration-300 hover:text-white"
              >
                <Globe
                  size={18}
                  className="mt-0.5 shrink-0 text-[#D4AF37]"
                />
                <span>www.kwovpl.in</span>
              </a>
            </div>
          </div>

          {/* Recruitment Focus */}
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Recruitment Focus
            </p>

            <p className="mb-5 text-sm leading-7 text-gray-400">
              Supporting candidates seeking international employment across
              specialised equestrian roles and diverse industries.
            </p>

            <div className="space-y-3 text-sm text-gray-400">
              <p className="border-l-2 border-[#D4AF37] pl-3">
                Equestrian & Horse Racing
              </p>

              <p className="border-l-2 border-[#D4AF37]/60 pl-3">
                Overseas Employment
              </p>

              <p className="border-l-2 border-[#D4AF37]/30 pl-3">
                Recruitment Support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div className="mx-6 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent sm:mx-10 lg:mx-14" />

      {/* Bottom Footer */}
      <div className="flex flex-col gap-5 px-6 py-7 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-14">
        <p className="text-center text-xs leading-6 text-gray-500 md:text-left">
          © {currentYear} Kawakami Overseas Placements. All rights reserved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <a
            href="#"
            aria-label="Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#111111]"
          >
            <Facebook size={16} />
          </a>

          <a
            href="#"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#111111]"
          >
            <Instagram size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import {
  Briefcase,
  ChevronDown,
  LoaderCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { isLogin, userData, userDataLoading, setIsLogin } =
    useContext(AppContext);

  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
  { name: "Home", path: "/" },
  { name: "Jobs", path: "/all-jobs/all" },
  { name: "Services", path: "/services" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('[aria-label="Toggle menu"]')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    toast.success("Logout successfully");
    navigate("/candidate-login");
    setIsLogin(false);
  };

  return (
    <header className="mb-10 border-b border-gray-200 bg-white">
      <nav>
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="group flex items-center gap-4">
            <img
              className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105"
              src={assets.favicon}
              alt="Kawakami Overseas Placements"
            />

            <div className="hidden leading-tight sm:block">
              <h1 className="text-xl font-extrabold tracking-wide text-[#111111]">
                KAWAKAMI
              </h1>

              <p className="text-xs uppercase tracking-widest text-gray-500">
                Overseas Placements
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-7 lg:flex">
            {menu.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative block py-5 text-sm font-semibold transition-colors duration-300
                    ${
                      isActive
                        ? "text-[#B68D2A]"
                        : "text-gray-700 hover:text-[#B68D2A]"
                    }
                    after:absolute after:bottom-3 after:left-1/2 after:h-[2px]
                    after:-translate-x-1/2 after:bg-[#D4AF37]
                    after:transition-all after:duration-300
                    ${
                      isActive
                        ? "after:w-full"
                        : "after:w-0 hover:after:w-full"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Account Area */}
          {userDataLoading ? (
            <LoaderCircle className="hidden animate-spin text-[#B68D2A] lg:block" />
          ) : isLogin ? (
            <div
              className="relative hidden items-center gap-4 lg:flex"
              ref={profileMenuRef}
            >
              <button
                type="button"
                onClick={toggleProfileMenu}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors duration-300 hover:bg-[#D4AF37]/10 focus:outline-none"
                aria-expanded={isProfileMenuOpen}
              >
                <span className="text-sm font-medium text-gray-700">
                  Hi, {userData?.name || "User"}
                </span>

                <img
                  className="h-9 w-9 rounded-full border border-[#D4AF37]/40 object-cover"
                  src={userData?.image || assets.avatarPlaceholder}
                  alt="User profile"
                  onError={(e) => {
                    e.currentTarget.src = assets.avatarPlaceholder;
                  }}
                />

                <ChevronDown
                  size={16}
                  className={`text-gray-600 transition-transform duration-300 ${
                    isProfileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-12 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                  <Link
                    to="/applications"
                    className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-[#D4AF37]/10 hover:text-[#9A741C]"
                  >
                    <Briefcase size={16} />
                    Applied Jobs
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-[#D4AF37]/10 hover:text-[#9A741C]"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-3 lg:flex">
              <Link
                to="/recruiter-login"
                className="rounded-lg border border-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[#9A741C] transition-all duration-300 hover:bg-[#D4AF37]/10"
              >
                Employer Login
              </Link>

              <Link
                to="/candidate-login"
                className="rounded-lg border border-[#111111] bg-[#111111] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#111111]"
              >
                Candidate Login
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMenu}
            className="rounded-lg p-2 text-[#111111] transition-colors hover:bg-[#D4AF37]/10 hover:text-[#B68D2A] focus:outline-none lg:hidden"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        ref={mobileMenuRef}
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          onClick={toggleMenu}
        />

        {/* Mobile Drawer */}
        <div className="relative flex h-full w-4/5 max-w-sm flex-col border-r border-gray-200 bg-white shadow-2xl">
          {/* Mobile Brand */}
          <div className="flex items-center justify-between border-b border-gray-200 p-5">
            <Link
              to="/"
              onClick={toggleMenu}
              className="flex items-center gap-3"
            >
              <img
                className="h-10 w-10 object-contain"
                src={assets.favicon}
                alt="Kawakami Overseas Placements"
              />

              <div className="leading-tight">
                <h1 className="text-base font-extrabold tracking-wide text-[#111111]">
                  KAWAKAMI
                </h1>

                <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
                  Overseas Placements
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Close menu"
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-[#D4AF37]/10 hover:text-[#B68D2A]"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {/* Mobile Links */}
            <ul className="space-y-2">
              {menu.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `block rounded-lg border-l-2 px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#9A741C]"
                          : "border-transparent text-gray-700 hover:bg-gray-50 hover:text-[#B68D2A]"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Mobile Account Area */}
            {userDataLoading ? (
              <div className="mt-8 flex justify-center">
                <LoaderCircle className="animate-spin text-[#B68D2A]" />
              </div>
            ) : isLogin ? (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="mb-5 flex items-center gap-3">
                  <img
                    className="h-11 w-11 rounded-full border border-[#D4AF37]/40 object-cover"
                    src={userData?.image || assets.avatarPlaceholder}
                    alt="User profile"
                    onError={(e) => {
                      e.currentTarget.src = assets.avatarPlaceholder;
                    }}
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {userData?.name || "User"}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {userData?.email}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/applications"
                      onClick={toggleMenu}
                      className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-[#D4AF37]/10 hover:text-[#9A741C]"
                    >
                      <Briefcase size={16} />
                      Applied Jobs
                    </Link>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-[#D4AF37]/10 hover:text-[#9A741C]"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
                <Link
                  to="/recruiter-login"
                  onClick={toggleMenu}
                  className="block w-full rounded-lg border border-[#D4AF37] px-4 py-3 text-center text-sm font-semibold text-[#9A741C] transition-all duration-300 hover:bg-[#D4AF37]/10"
                >
                  Employer Login
                </Link>

                <Link
                  to="/candidate-login"
                  onClick={toggleMenu}
                  className="block w-full rounded-lg border border-[#111111] bg-[#111111] px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#111111]"
                >
                  Candidate Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Footer */}
          <div className="border-t border-gray-200 p-4">
            <p className="text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Kawakami Overseas Placements
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
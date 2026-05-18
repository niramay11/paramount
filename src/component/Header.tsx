"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Logo from "../../public/paramount_logo.svg";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronUp, PhoneIcon } from "lucide-react";
import Stethscope from "@/assets/Stethscope";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [patientSubmenuOpen, setPatientSubmenuOpen] = useState(false);
  const [physicianSubmenuOpen, setPhysicianSubmenuOpen] = useState(false);
  const [infoSubmenuOpen, setInfoSubmenuOpen] = useState(false);
  const patientSubmenuRef = useRef<HTMLLIElement>(null);
  const physicianSubmenuRef = useRef<HTMLLIElement>(null);
  const infoSubmenuRef = useRef<HTMLLIElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setMenuOpen(false);

  // Close submenus when clicking outside - with better event handling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking on a link or button
      const target = event.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        return;
      }

      if (
        patientSubmenuRef.current &&
        !patientSubmenuRef.current.contains(event.target as Node)
      ) {
        setPatientSubmenuOpen(false);
      }
      if (
        physicianSubmenuRef.current &&
        !physicianSubmenuRef.current.contains(event.target as Node)
      ) {
        setPhysicianSubmenuOpen(false);
      }
      if (
        infoSubmenuRef.current &&
        !infoSubmenuRef.current.contains(event.target as Node)
      ) {
        setInfoSubmenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuOpen
      ) {
        setMenuOpen(false);
        setPatientSubmenuOpen(false);
        setPhysicianSubmenuOpen(false);
        setInfoSubmenuOpen(false);
      }
    };

    // Use a slight delay to ensure the click event completes before checking
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const togglePatientSubmenu = () => {
    setPatientSubmenuOpen(!patientSubmenuOpen);
    setPhysicianSubmenuOpen(false);
    setInfoSubmenuOpen(false);
  };

  const togglePhysicianSubmenu = () => {
    setPhysicianSubmenuOpen(!physicianSubmenuOpen);
    setPatientSubmenuOpen(false);
    setInfoSubmenuOpen(false);
  };

  const toggleInfoSubmenu = () => {
    setInfoSubmenuOpen(!infoSubmenuOpen);
    setPatientSubmenuOpen(false);
    setPhysicianSubmenuOpen(false);
  };

  // Handle mobile navigation with router.push
  const handleMobileNavigation = (href: string) => {
    // Close menus first
    setMenuOpen(false);
    setPatientSubmenuOpen(false);
    setPhysicianSubmenuOpen(false);
    setInfoSubmenuOpen(false);

    // Then navigate
    setTimeout(() => {
      router.push(href);
    }, 10);
  };

  // Handle desktop submenu navigation
  const handleDesktopSubmenuNavigation = (href: string, target?: string) => {
    setPatientSubmenuOpen(false);
    setPhysicianSubmenuOpen(false);
    setInfoSubmenuOpen(false);

    setTimeout(() => {
      if (href.startsWith("http")) {
        window.open(href, target || "");
      } else {
        router.push(href);
      }
    }, 10);
  };

  const patientSubmenu = [
    { href: "/insurance", label: "Insurances" },
    { href: "/test-preparation", label: "Preparing for your test" },
    { href: "/update-billing-insurance", label: "Update my billing info" },
  ];

  const physicianSubmenu = [
    {
      href: "https://paramount.safemedicaldata.com/",
      target: "_blank",
      label: "Physician Portal",
    },
    { href: "/insurance", label: "Insurance" },
    { href: "/test-dictionary", label: "Test Dictionary" },
    { href: "/join-us", label: "Join Us" },
  ];

  const informationSubmenu = [
    { href: "/about", label: "About Us" },
    { href: "/testimonial", label: "Testimonials" },
    { href: "/laboratory-forms", label: "Lab Forms" },
  ];

  return (
    <header className="w-full px-4 sm:px-8 lg:px-[10%] max-w-[1920px] mx-auto py-4 font-inter relative z-50">
      {/* Top Header */}
      <div className="flex items-center justify-between w-full">
        <Link href="/" aria-label="Home">
          <Image
            src={Logo}
            width={100}
            height={100}
            alt="Paramount Logo"
            priority
          />
        </Link>

        <div className="flex flex-col justify-end items-end w-full md:w-auto">
          {/* Desktop Quick Links */}
          <div className="hidden md:flex gap-4 text-sm font-semibold text-gray-600">
            <button
              className="cursor-pointer"
              onClick={() =>
                window.open("https://paramount.safemedicaldata.com/", "_blank")
              }
            >
              PHYSICIAN PORTAL
            </button>
            <button
              className="cursor-pointer"
              onClick={() => router.push("/patient-portal")}
            >
              PATIENT PORTAL
            </button>
            <span className="hidden lg:inline ml-8">
              <a
                href="tel:+19088348034"
                className={`group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-200/50 to-gray-300/50  text-gray-600 hover:from-gray-300/70 hover:to-gray-400/70  transition`}
              >
                <PhoneIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-700 transition" />
                <span className="font-semibold tracking-wide">CALL US</span>
              </a>
            </span>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex flex-row justify-between items-center mt-6 gap-6"
            role="navigation"
            aria-label="Main Navigation"
          >
            <ul className="flex gap-6 text-sm font-semibold text-gray-600">
              {/* Patient with Submenu */}
              <li ref={patientSubmenuRef} className="relative">
                <button
                  className="flex items-center gap-1 cursor-pointer focus:outline-none"
                  onClick={togglePatientSubmenu}
                  aria-expanded={patientSubmenuOpen}
                  aria-haspopup="true"
                >
                  PATIENT
                  {patientSubmenuOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {/* Patient Submenu */}
                {patientSubmenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg cursor-pointer rounded-md border border-gray-200 py-2 z-50">
                    {patientSubmenu.map((item) => (
                      <button
                        key={item.href}
                        onClick={() =>
                          handleDesktopSubmenuNavigation(item.href)
                        }
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </li>

              {/* Physician with Submenu */}
              <li ref={physicianSubmenuRef} className="relative">
                <button
                  className="flex items-center gap-1 cursor-pointer focus:outline-none"
                  onClick={togglePhysicianSubmenu}
                  aria-expanded={physicianSubmenuOpen}
                  aria-haspopup="true"
                >
                  PHYSICIAN
                  {physicianSubmenuOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {/* Physician Submenu */}
                {physicianSubmenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg cursor-pointer rounded-md border border-gray-200 py-2 z-50">
                    {physicianSubmenu.map((item) => (
                      <button
                        key={item.href}
                        onClick={() =>
                          handleDesktopSubmenuNavigation(
                            item.href,
                            item?.target
                          )
                        }
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </li>

              {/* Services (No Submenu) */}
              <li>
                <button onClick={() => router.push("/services")}>
                  SERVICES
                </button>
              </li>

              {/* Information with Submenu */}
              <li ref={infoSubmenuRef} className="relative">
                <button
                  className="flex items-center gap-1 cursor-pointer focus:outline-none"
                  onClick={toggleInfoSubmenu}
                  aria-expanded={infoSubmenuOpen}
                  aria-haspopup="true"
                >
                  INFORMATION
                  {infoSubmenuOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {/* Information Submenu */}
                {infoSubmenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg cursor-pointer rounded-md border border-gray-200 py-2 z-50">
                    {informationSubmenu.map((item) => (
                      <button
                        key={item.href}
                        onClick={() =>
                          handleDesktopSubmenuNavigation(item.href)
                        }
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </li>

              {/* Career (No Submenu) */}
              <li>
                <button onClick={() => router.push("/career")}>CAREER</button>
              </li>

              {/* Contact (No Submenu) */}
              <li>
                <button onClick={() => router.push("/contact")}>CONTACT</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div ref={mobileMenuRef}>
        <nav
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-[1000px] mt-4" : "max-h-0"
          }`}
          role="navigation"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col gap-6 bg-white shadow-md rounded-md p-6 border border-gray-200">
            <ul className="flex flex-col gap-4 text-sm font-semibold text-gray-700">
              {/* Mobile Patient with Submenu */}
              <li className="border-b border-gray-200 pb-2">
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() => setPatientSubmenuOpen(!patientSubmenuOpen)}
                  aria-expanded={patientSubmenuOpen}
                >
                  <span>PATIENT</span>
                  {patientSubmenuOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {/* Mobile Patient Submenu */}
                {patientSubmenuOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-3">
                    {patientSubmenu.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleMobileNavigation(item.href)}
                        className="block w-full text-left py-1 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </li>

              {/* Mobile Physician with Submenu */}
              <li className="border-b border-gray-200 pb-2">
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() => setPhysicianSubmenuOpen(!physicianSubmenuOpen)}
                  aria-expanded={physicianSubmenuOpen}
                >
                  <span>PHYSICIAN</span>
                  {physicianSubmenuOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {/* Mobile Physician Submenu */}
                {physicianSubmenuOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-3">
                    {physicianSubmenu.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleMobileNavigation(item.href)}
                        className="block w-full text-left py-1 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </li>

              {/* Mobile Services */}
              <li className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => handleMobileNavigation("/services")}
                  className="w-full text-left"
                >
                  SERVICES
                </button>
              </li>

              {/* Mobile Information with Submenu */}
              <li className="border-b border-gray-200 pb-2">
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() => setInfoSubmenuOpen(!infoSubmenuOpen)}
                  aria-expanded={infoSubmenuOpen}
                >
                  <span>INFORMATION</span>
                  {infoSubmenuOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {/* Mobile Information Submenu */}
                {infoSubmenuOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-3">
                    {informationSubmenu.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleMobileNavigation(item.href)}
                        className="block w-full text-left py-1 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </li>

              {/* Mobile Career */}
              <li className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => handleMobileNavigation("/career")}
                  className="w-full text-left"
                >
                  CAREER
                </button>
              </li>

              {/* Mobile Contact */}
              <li>
                <button
                  onClick={() => handleMobileNavigation("/contact")}
                  className="w-full text-left"
                >
                  CONTACT
                </button>
              </li>

              {/* Mobile Quick Links */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleMobileNavigation("/physician-portal")}
                  className="text-left text-gray-600 hover:text-gray-900 transition-colors"
                >
                  PHYSICIAN PORTAL
                </button>
                <button
                  onClick={() => handleMobileNavigation("/patient-portal")}
                  className="text-left text-gray-600 hover:text-gray-900 transition-colors"
                >
                  PATIENT PORTAL
                </button>
                <a
                  href="tel:+19088348034"
                  className={`group flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-200/50 to-gray-300/50  text-gray-600 hover:from-gray-300/70 hover:to-gray-400/70  transition`}
                >
                  <PhoneIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-700 transition" />
                  <span className="font-semibold tracking-wide">CALL US</span>
                </a>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

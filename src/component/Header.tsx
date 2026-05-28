"use client";

import Image from "next/image";
import React, {
  useState, useRef, useEffect, useCallback,
  type KeyboardEvent, type FC, type RefCallback,
} from "react";
import Logo from "../../public/paramount_logo.svg";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu, X, ChevronDown, PhoneIcon,
  CreditCardIcon, ClipboardListIcon, PencilIcon,
  ExternalLinkIcon, UserPlusIcon,
  InfoIcon, StarIcon, FileTextIcon, FlaskConicalIcon,
  ArrowRightIcon,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════ */

interface SubmenuItem {
  href:    string;
  label:   string;
  icon:    React.ElementType;
  desc:    string;
  target?: "_blank" | "_self";
}

interface NavItemConfig {
  id:            string;
  label:         string;
  href?:         string;
  sectionLabel?: string;
  submenu?:      SubmenuItem[];
}

/* ═══════════════════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════════════════ */

const NAV_ITEMS: NavItemConfig[] = [
  {
    id: "patient",
    label: "Patient",
    sectionLabel: "Patient Resources",
    submenu: [
      { href: "/insurance",                label: "Insurances",              icon: CreditCardIcon,    desc: "Plans we accept"      },
      { href: "/test-preparation",         label: "Preparing for your test", icon: ClipboardListIcon, desc: "What to expect"        },
      { href: "/update-billing-insurance", label: "Update billing info",     icon: PencilIcon,        desc: "Manage your account"  },
    ],
  },
  {
    id: "physician",
    label: "Physician",
    sectionLabel: "Physician Resources",
    submenu: [
      { href: "https://paramount.safemedicaldata.com/", target: "_blank", label: "Physician Portal", icon: ExternalLinkIcon, desc: "Secure login"        },
      { href: "/test-dictionary", label: "Test Dictionary", icon: FlaskConicalIcon, desc: "All tests available" },
      { href: "/join-us",         label: "Join Us",         icon: UserPlusIcon,     desc: "Work with us"       },
    ],
  },
  { id: "services",    label: "Services",    href: "/services"    },
  {
    id: "information",
    label: "Information",
    sectionLabel: "About Paramount",
    submenu: [
      { href: "/about",            label: "About Us",     icon: InfoIcon,     desc: "Our story & mission"  },
      { href: "/testimonial",      label: "Testimonials", icon: StarIcon,     desc: "Patient experiences"  },
      { href: "/laboratory-forms", label: "Lab Forms",    icon: FileTextIcon, desc: "Download lab forms"   },
    ],
  },
  { id: "career",  label: "Career",  href: "/career"  },
  { id: "contact", label: "Contact", href: "/contact" },
];

/* ═══════════════════════════════════════════════════════════
   ANIMATION VARIANTS
═══════════════════════════════════════════════════════════ */

const dropdownV = {
  hidden:  { opacity: 0, y: -6,  scale: 0.975 },
  visible: { opacity: 1, y: 0,   scale: 1,     transition: { duration: 0.16, ease: "easeOut" as const } },
  exit:    { opacity: 0, y: -4,  scale: 0.975, transition: { duration: 0.11, ease: "easeIn"  as const } },
};

const mobileMenuV = {
  hidden:  { opacity: 0, height: 0       },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.26, ease: "easeOut" as const } },
  exit:    { opacity: 0, height: 0,      transition: { duration: 0.18, ease: "easeIn"  as const } },
};

const mobileSubV = {
  hidden:  { opacity: 0, height: 0       },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.18, ease: "easeOut" as const } },
  exit:    { opacity: 0, height: 0,      transition: { duration: 0.13, ease: "easeIn"  as const } },
};

const hamburgerV = {
  hidden:  { rotate: -90, opacity: 0 },
  visible: { rotate: 0,   opacity: 1, transition: { duration: 0.14 } },
  exit:    { rotate: 90,  opacity: 0, transition: { duration: 0.11 } },
};

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */

const BRAND_GRADIENT = "linear-gradient(135deg, #154565 0%, #793146 100%)";

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#154565]/30 rounded";

/* nav link — pill/capsule style */
function navLinkCls(active: boolean) {
  return [
    "relative group flex items-center gap-1 py-1.5 px-3",
    "font-poppins font-medium text-[13.5px] tracking-[0.01em] cursor-pointer",
    "rounded-lg transition-all duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#154565]/30",
    active
      ? "bg-[#154565]/[0.09] text-[#154565]"
      : "text-[#4a6070] hover:bg-[#154565]/[0.07] hover:text-[#154565]",
  ].join(" ");
}

/* ═══════════════════════════════════════════════════════════
   DropdownItem  — clean, mintexcare-style
═══════════════════════════════════════════════════════════ */

interface DropdownItemProps {
  item:      SubmenuItem;
  onSelect:  () => void;
  itemRef?:  RefCallback<HTMLButtonElement>;
  onKeyDown?: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

const DropdownItem: FC<DropdownItemProps> = ({ item, onSelect, itemRef, onKeyDown }) => (
  <button
    ref={itemRef}
    onClick={onSelect}
    onKeyDown={onKeyDown}
    className="flex items-start gap-3 w-full text-left px-4 py-2.5 hover:bg-[#154565]/[0.045] transition-colors duration-150 group/item focus:outline-none focus-visible:bg-[#154565]/[0.06] focus-visible:outline-none rounded-lg mx-1"
    style={{ width: "calc(100% - 8px)" }}
    role="menuitem"
  >
    <div
      className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-150"
      style={{ background: "rgba(21,69,101,0.07)" }}
      aria-hidden="true"
    >
      <item.icon className="w-3.5 h-3.5 text-[#154565]" />
    </div>
    <div className="min-w-0">
      <p className="text-[13px] font-semibold text-[#0d2b45] group-hover/item:text-[#154565] transition-colors leading-tight font-poppins">
        {item.label}
      </p>
      <p className="text-[11px] text-[#94a3b8] mt-0.5 leading-snug font-poppins font-light">
        {item.desc}
      </p>
    </div>
  </button>
);

/* ═══════════════════════════════════════════════════════════
   DesktopNavItem
═══════════════════════════════════════════════════════════ */

interface DesktopNavItemProps {
  config:     NavItemConfig;
  isOpen:     boolean;
  isActive:   boolean;
  onOpen:     () => void;
  onClose:    () => void;
  onNavigate: (href: string, target?: string) => void;
}

const DesktopNavItem: FC<DesktopNavItemProps> = ({
  config, isOpen, isActive, onOpen, onClose, onNavigate,
}) => {
  const itemRefs  = useRef<(HTMLButtonElement | null)[]>([]);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const focusItem = (idx: number) => itemRefs.current[idx]?.focus();

  const handleTriggerKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); if (!isOpen) onOpen(); else focusItem(0); }
    if (e.key === "Escape")    { onClose(); triggerRef.current?.focus(); }
  };

  const handleItemKey = (e: KeyboardEvent<HTMLButtonElement>, idx: number, max: number) => {
    if (e.key === "ArrowDown")                        { e.preventDefault(); idx < max - 1 ? focusItem(idx + 1) : focusItem(0); }
    if (e.key === "ArrowUp")                          { e.preventDefault(); idx > 0 ? focusItem(idx - 1) : triggerRef.current?.focus(); }
    if (e.key === "Escape")                           { onClose(); triggerRef.current?.focus(); }
    if (e.key === "Tab" && !e.shiftKey && idx === max - 1) { onClose(); }
  };

  /* leaf — no submenu */
  if (!config.submenu) {
    return (
      <li role="none">
        <button onClick={() => onNavigate(config.href!)} className={navLinkCls(isActive)}>
          <span>{config.label}</span>
        </button>
      </li>
    );
  }

  return (
    <li
      className="relative"
      role="none"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        ref={triggerRef}
        onClick={() => (isOpen ? onClose() : onOpen())}
        onKeyDown={handleTriggerKey}
        className={navLinkCls(isActive || isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span>{config.label}</span>
        <ChevronDown
          size={13}
          aria-hidden="true"
          className={`mt-px transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dd"
            variants={dropdownV}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 mt-3 bg-white rounded-2xl py-2 z-50 min-w-[256px] origin-top-left"
            style={{
              boxShadow: "0 8px 40px rgba(21,69,101,0.12), 0 0 0 1px rgba(21,69,101,0.06)",
            }}
            role="menu"
            aria-label={config.sectionLabel ?? config.label}
          >
            {config.sectionLabel && (
              <p className="px-4 pt-1.5 pb-2 text-[10px] font-bold tracking-[0.14em] text-[#94a3b8] uppercase select-none font-sora">
                {config.sectionLabel}
              </p>
            )}
            {config.submenu.map((item, idx) => (
              <DropdownItem
                key={item.href}
                item={item}
                onSelect={() => onNavigate(item.href, item.target)}
                itemRef={(el) => { itemRefs.current[idx] = el; }}
                onKeyDown={(e) => handleItemKey(e, idx, config.submenu!.length)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

/* ═══════════════════════════════════════════════════════════
   MobileNavItem
═══════════════════════════════════════════════════════════ */

interface MobileNavItemProps {
  config:     NavItemConfig;
  isOpen:     boolean;
  onToggle:   () => void;
  onNavigate: (href: string) => void;
}

const MobileNavItem: FC<MobileNavItemProps> = ({ config, isOpen, onToggle, onNavigate }) => {
  const base = "font-poppins font-semibold text-[14px] text-[#0d2b45]";

  if (!config.submenu) {
    return (
      <li className="border-b border-gray-100/80 py-3.5">
        <button onClick={() => onNavigate(config.href!)} className={`w-full text-left ${base} ${focusRing}`}>
          {config.label}
        </button>
      </li>
    );
  }

  return (
    <li className="border-b border-gray-100/80 py-3.5">
      <button
        className={`flex items-center justify-between w-full ${base} ${focusRing}`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{config.label}</span>
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`text-[#793146] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="m-sub"
            variants={mobileSubV}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="mt-3 ml-2 flex flex-col gap-0.5">
              {config.submenu.map(item => (
                <button
                  key={item.href}
                  onClick={() => onNavigate(item.href)}
                  className={`flex items-center gap-2.5 py-2 px-3 rounded-xl text-[13px] font-poppins text-[#4a6070] hover:text-[#154565] hover:bg-[#154565]/[0.05] transition-colors text-left ${focusRing}`}
                >
                  <item.icon className="w-3.5 h-3.5 text-[#154565]/50 flex-shrink-0" aria-hidden="true" />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

/* ═══════════════════════════════════════════════════════════
   Header  — single-row, mintexcare-inspired
═══════════════════════════════════════════════════════════ */

const Header: FC = () => {
  const router    = useRouter();
  const pathname  = usePathname();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [openMobile,   setOpenMobile]   = useState<string | null>(null);
  const [scrolled,     setScrolled]     = useState(false);
  const [navHidden,    setNavHidden]    = useState(false);
  const [showBanner,   setShowBanner]   = useState(true);

  const lastScrollY = useRef(0);
  const wrapperRef  = useRef<HTMLDivElement>(null);

  /* scroll: hide on scroll-down, reveal on scroll-up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 12)                            { setScrolled(false); setNavHidden(false); }
      else if (y > lastScrollY.current + 8)  { setNavHidden(true);  setScrolled(true);  }
      else if (y < lastScrollY.current - 8)  { setNavHidden(false); setScrolled(true);  }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close on route change */
  useEffect(() => {
    setMenuOpen(false); setOpenMobile(null); setOpenDropdown(null);
  }, [pathname]);

  /* global Escape */
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenDropdown(null); setMenuOpen(false); setOpenMobile(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* outside click */
  useEffect(() => {
    if (!menuOpen && !openDropdown) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpenDropdown(null); setMenuOpen(false); setOpenMobile(null);
      }
    };
    const t = setTimeout(() => document.addEventListener("mousedown", handler), 60);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", handler); };
  }, [menuOpen, openDropdown]);

  const navigate = useCallback((href: string, target?: string) => {
    setOpenDropdown(null); setMenuOpen(false); setOpenMobile(null);
    requestAnimationFrame(() => {
      if (href.startsWith("http")) window.open(href, target ?? "_blank");
      else router.push(href);
    });
  }, [router]);

  const isItemActive = useCallback((config: NavItemConfig): boolean => {
    if (config.href)
      return pathname === config.href || (config.href !== "/" && pathname.startsWith(config.href));
    return config.submenu?.some(s => pathname === s.href || pathname.startsWith(s.href)) ?? false;
  }, [pathname]);

  const toggleMobile = (id: string) => setOpenMobile(prev => prev === id ? null : id);

  return (
    <div
      ref={wrapperRef}
      className="sticky top-0 z-50"
      style={{
        transform:  navHidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
      }}
    >

      {/* ── Announcement strip ─────────────────────────────── */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            key="banner"
            initial={{ height: 0,      opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.22 } }}
            exit={{    height: 0,      opacity: 0, transition: { duration: 0.16 } }}
            className="overflow-hidden"
          >
            <div
              className="relative flex items-center justify-center gap-2 px-10 py-2 text-white"
              style={{ background: "linear-gradient(90deg, #0d2b45 0%, #793146 50%, #0d2b45 100%)" }}
            >
              <span className="font-poppins text-[11.5px] font-light opacity-90 tracking-wide">
                Accepting new patients &mdash; CLIA-certified, fast turnaround results.
              </span>
              <button
                onClick={() => navigate("/contact")}
                className="font-poppins text-[11.5px] font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity ml-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 rounded"
              >
                Book now →
              </button>
              <button
                onClick={() => setShowBanner(false)}
                className="absolute right-3.5 p-1 opacity-50 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 rounded"
                aria-label="Dismiss"
              >
                <X size={12} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2 px gradient stripe ────────────────────────────── */}
      <div
        className="h-[2px] w-full"
        style={{ background: "linear-gradient(90deg, #154565 0%, #793146 50%, #154565 100%)" }}
        aria-hidden="true"
      />

      {/* ── Main header ─────────────────────────────────────── */}
      <header
        className="w-full transition-all duration-300"
        style={{
          background:    scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:     scrolled ? "0 1px 32px rgba(21,69,101,0.1)" : "none",
        }}
        role="banner"
      >
        <div className="w-full px-5 sm:px-8 lg:px-[8%] max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between py-3 gap-6">

            {/* Logo */}
            <Link
              href="/"
              aria-label="Paramount Diagnostic Lab — home"
              className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#154565]/40 rounded"
            >
              <Image src={Logo} width={88} height={88} alt="Paramount Diagnostic Lab" priority />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              <ul className="flex items-center gap-1" role="menubar">
                {NAV_ITEMS.map(config => (
                  <DesktopNavItem
                    key={config.id}
                    config={config}
                    isOpen={openDropdown === config.id}
                    isActive={isItemActive(config)}
                    onOpen={() => setOpenDropdown(config.id)}
                    onClose={() => setOpenDropdown(null)}
                    onNavigate={navigate}
                  />
                ))}
              </ul>
            </nav>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
              {/* Phone */}
              <a
                href="tel:+19088348034"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#154565] text-[12.5px] font-poppins font-semibold hover:bg-[#154565]/[0.06] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#154565]/30"
                aria-label="Call Paramount at (908) 834-8034"
              >
                <PhoneIcon className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden lg:inline">(908) 834-8034</span>
              </a>

              {/* Divider */}
              <span className="h-5 w-px bg-gray-200" aria-hidden="true" />

              {/* Book CTA */}
              <motion.button
                onClick={() => navigate("/contact")}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-white text-[12.5px] font-poppins font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                style={{ background: BRAND_GRADIENT }}
                whileHover={{ scale: 1.03, opacity: 0.92 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                aria-label="Book an appointment"
              >
                Book Appointment
                <ArrowRightIcon className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden p-1 text-[#154565] ${focusRing}`}
              onClick={() => setMenuOpen(p => !p)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "x" : "m"}
                  variants={hamburgerV}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="block"
                >
                  {menuOpen
                    ? <X    size={24} aria-hidden="true" />
                    : <Menu size={24} aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>

          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              key="mob-nav"
              id="mobile-nav"
              variants={mobileMenuV}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden border-t border-gray-100"
              aria-label="Mobile navigation"
            >
              <div className="bg-white/98 px-5 pt-4 pb-6 shadow-lg">
                <ul className="flex flex-col">
                  {NAV_ITEMS.map(config => (
                    <MobileNavItem
                      key={config.id}
                      config={config}
                      isOpen={openMobile === config.id}
                      onToggle={() => toggleMobile(config.id)}
                      onNavigate={navigate}
                    />
                  ))}
                </ul>

                {/* Mobile CTA block */}
                <div className="flex flex-col gap-2.5 mt-4 pt-4 border-t border-gray-100">
                  <a
                    href="tel:+19088348034"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#154565]/20 text-[#154565] text-sm font-poppins font-semibold hover:bg-[#154565]/[0.05] transition-colors"
                  >
                    <PhoneIcon className="w-4 h-4" aria-hidden="true" />
                    (908) 834-8034
                  </a>
                  <button
                    onClick={() => navigate("/contact")}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-poppins font-semibold hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    style={{ background: BRAND_GRADIENT }}
                  >
                    Book Appointment
                    <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

export default Header;

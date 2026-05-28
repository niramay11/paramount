import Footer from "@/component/Footer";
import Page from "@/component/Page";
import Image from "next/image";
import React from "react";
import TestimonialForm from "./TestimonialForm";
import Doctor_1 from "../../../public/doctor_1.png";
import Doctor_2 from "../../../public/doctor_2.png";
import Doctor_3 from "../../../public/doctor_3.png";
import Doctor_4 from "../../../public/doctor_4.png";
import Doctor_5 from "../../../public/doctor_5.png";
import Doctor_6 from "../../../public/doctor_6.png";

const TESTIMONIALS = [
  {
    profile: Doctor_1,
    name: "Shefali Saha",
    description: `Paramount Lab is an outstanding Lab. They provide prompt and fast, perfect COVID test results. All staff are humble and knowledgeable. I highly recommend Paramount Lab for infectious tests. God bless!`,
    rating: 5,
  },
  {
    profile: Doctor_2,
    name: "Rahul Mantri",
    description: `Miss Priya was friendly and thoughtful. She explained the test, the expectation, and what to do while waiting for results. I left feeling relaxed and informed. Thanks Priya. Well done!`,
    rating: 5,
  },
  {
    profile: Doctor_3,
    name: "Nayee Maulik",
    description: `I don't leave reviews normally but they really deserve one for going above and beyond. All staff — technical and administrative — were so nice, helpful and sweet. Customer service was extremely prompt.`,
    rating: 5,
  },
  {
    profile: Doctor_4,
    name: "Kavi Physio",
    description: `Priya handled me very well and she is so polite. Thank you for your excellent service — keep going!`,
    rating: 5,
  },
  {
    profile: Doctor_5,
    name: "Naseer Alwadi",
    description: `Nice, cooperative and extremely friendly helpful staff. Accurate and timely results, quick response. Grateful and many thanks from me and my family to Carmen for her help.`,
    rating: 5,
  },
  {
    profile: Doctor_6,
    name: "Anthony DeJesus",
    description: `Very helpful, answered all of my questions regarding testing.`,
    rating: 5,
  },
];

/* Duplicate for seamless infinite scroll */
const ROW_1 = [...TESTIMONIALS, ...TESTIMONIALS];
const ROW_2 = [...[...TESTIMONIALS].reverse(), ...[...TESTIMONIALS].reverse()];

/* ── Card for dark marquee ─────────────────────────────── */
function MarqueeCard({ t }: { t: (typeof TESTIMONIALS)[0] }) {
  return (
    <div
      className="w-72 flex-shrink-0 rounded-2xl p-5 flex flex-col gap-3"
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.11)",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Author row */}
      <div className="flex items-center gap-3">
        <Image
          src={t.profile}
          alt={t.name}
          width={36}
          height={36}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          style={{ border: "2px solid rgba(255,255,255,0.18)" }}
        />
        <div>
          <p className="font-poppins text-[12.5px] font-semibold text-white leading-tight">{t.name}</p>
          <div className="flex gap-px mt-0.5">
            {Array.from({ length: t.rating }).map((_, i) => (
              <span key={i} className="text-amber-400" style={{ fontSize: "11px" }}>★</span>
            ))}
          </div>
        </div>
      </div>

      {/* Quote */}
      <p
        className="font-poppins text-[12.5px] leading-relaxed"
        style={{
          color: "rgba(255,255,255,0.62)",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {t.description}
      </p>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────── */
export default function TestimonialPage() {
  return (
    <Page>

      {/* CSS animations */}
      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .track-l { animation: scroll-left  34s linear infinite; display: flex; width: max-content; }
        .track-r { animation: scroll-right 28s linear infinite; display: flex; width: max-content; }
        .marquee-wrap:hover .track-l,
        .marquee-wrap:hover .track-r { animation-play-state: paused; }
      `}</style>

      {/* ══ HEADER + MARQUEE ════════════════════════════════════ */}
      <section
        className="relative pt-16 pb-12 overflow-hidden marquee-wrap"
        style={{ background: "linear-gradient(160deg, #0d2b45 0%, #154565 55%, #793146 100%)" }}
      >
        {/* Heading block */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">

          {/* Left — eyebrow + heading */}
          <div>
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="block h-px w-8 bg-[#c97a97]" />
              <span className="text-[10.5px] font-bold tracking-[0.14em] text-[#c97a97] uppercase font-inter">
                Patient Stories
              </span>
            </div>
            <h1 className="font-inter font-bold leading-[1.05] text-white" style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}>
              What Our<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #a8d0f0 0%, #e8a0bc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Patients Say
              </span>
            </h1>
          </div>

          {/* Right — description */}
          <p className="text-[15px] text-white/60 leading-relaxed max-w-sm lg:text-right pb-1">
            Real experiences from people we&apos;ve had the privilege to serve at Paramount Diagnostic Lab.
          </p>

        </div>

        {/* Left edge fade */}
        <div
          className="absolute left-0 inset-y-0 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0d2b45, transparent)" }}
        />
        {/* Right edge fade */}
        <div
          className="absolute right-0 inset-y-0 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #793146, transparent)" }}
        />

        {/* Row 1 — scrolls left */}
        <div className="overflow-hidden mb-4">
          <div className="track-l gap-4">
            {ROW_1.map((t, i) => <MarqueeCard key={i} t={t} />)}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="overflow-hidden">
          <div className="track-r gap-4">
            {ROW_2.map((t, i) => <MarqueeCard key={i} t={t} />)}
          </div>
        </div>

        {/* Hover hint */}
        <p className="text-center font-poppins text-[11px] text-white/30 mt-6 tracking-wide">
          hover to pause
        </p>
      </section>

      {/* ══ FORM ════════════════════════════════════════════════ */}
      <section className="relative py-14">
        <div
          className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0"
          style={{ background: "#f0f4f8" }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="block h-px w-8 bg-[#793146]" />
              <span className="text-[10.5px] font-bold tracking-[0.14em] text-[#793146] uppercase font-inter">
                Your Turn
              </span>
            </div>
            <h2 className="text-[1.7rem] font-inter font-bold text-[#0d2b45]">
              Share Your Experience
            </h2>
            <p className="mt-1.5 text-[14px] text-[#4a6070]">
              Your feedback helps us serve the community better.
            </p>
          </div>

          <TestimonialForm />
        </div>
      </section>

      <Footer />
    </Page>
  );
}

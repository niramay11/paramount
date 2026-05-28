"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Doctor_1 from "../../../public/doctor_1.png";
import Doctor_2 from "../../../public/doctor_2.png";
import Doctor_3 from "../../../public/doctor_3.png";
import Doctor_4 from "../../../public/doctor_4.png";
import Doctor_5 from "../../../public/doctor_5.png";
import Doctor_6 from "../../../public/doctor_6.png";

type Testimonial = {
  profile:     StaticImageData;
  name:        string;
  description: string;
  rating:      number;
};

const TESTIMONIALS: Testimonial[] = [
  { profile: Doctor_1, name: "Parthiban",      description: "Last week I was here for a COVID test. The place was neat and clean. Priya was so professional. Thanks Priya madam!", rating: 5 },
  { profile: Doctor_2, name: "Rahul Mantri",   description: "Miss Priya was friendly and thoughtful. She explained the test, the expectation, what to do while waiting for the result. I left feeling relaxed and informed.", rating: 5 },
  { profile: Doctor_3, name: "Nayee Maulik",   description: "I don't leave reviews normally but they really deserve one for going above and beyond. All staff — technical and administrative — were so nice and helpful.", rating: 5 },
  { profile: Doctor_4, name: "Kavi Physio",    description: "Priya mam handled me very well and she is so polite. Thank you for your excellent service, keep going.", rating: 5 },
  { profile: Doctor_5, name: "Naseer Alwadi",  description: "Nice, cooperative and extremely friendly helpful staff. Accurate and timely results. Quick response. Many thanks from me and my family.", rating: 5 },
  { profile: Doctor_6, name: "Anthony DeJesus",description: "Very helpful, answered all of my questions regarding testing. The whole experience was smooth and professional from start to finish.", rating: 5 },
];

const ROW_1 = [...TESTIMONIALS, ...TESTIMONIALS];
const ROW_2 = [...[...TESTIMONIALS].reverse(), ...[...TESTIMONIALS].reverse()];

function MarqueeCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="w-[280px] flex-shrink-0 rounded-2xl p-5 flex flex-col gap-4 bg-white/80"
      style={{
        border:         "1px solid rgba(21,69,101,0.09)",
        boxShadow:      "0 4px 20px rgba(21,69,101,0.07)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Quote mark + stars row */}
      <div className="flex items-start justify-between">
        <span
          className="font-serif leading-none select-none"
          style={{ fontSize: "48px", color: "rgba(21,69,101,0.10)", lineHeight: "0.8" }}
        >
          &ldquo;
        </span>
        <div className="flex gap-px mt-1">
          {Array.from({ length: t.rating }).map((_, i) => (
            <span key={i} className="text-amber-400" style={{ fontSize: "12px" }}>★</span>
          ))}
        </div>
      </div>

      {/* Quote */}
      <p
        className="font-poppins text-[12.5px] leading-relaxed text-[#334e62] flex-1"
        style={{
          display:         "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow:        "hidden",
        }}
      >
        {t.description}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-1 border-t border-gray-100">
        <div
          className="rounded-full flex-shrink-0 p-[2px]"
          style={{ background: "linear-gradient(135deg, #154565 0%, #793146 100%)" }}
        >
          <div className="rounded-full overflow-hidden bg-white w-8 h-8">
            <Image src={t.profile} alt={t.name} width={32} height={32} className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <p className="font-poppins text-[12.5px] font-semibold text-[#0d2b45] leading-tight">{t.name}</p>
          <p className="font-poppins text-[10.5px] text-[#94a3b8] mt-0.5">Verified Patient</p>
        </div>
      </div>
    </div>
  );
}

const Testimonial: React.FC = () => (
  <section
    className="relative py-16 overflow-hidden marquee-home-wrap"
    aria-labelledby="testimonials-heading"
  >
    <style>{`
      @keyframes home-scroll-left {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes home-scroll-right {
        0%   { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
      .home-track-l { animation: home-scroll-left  34s linear infinite; display: flex; width: max-content; }
      .home-track-r { animation: home-scroll-right 28s linear infinite; display: flex; width: max-content; }
      .marquee-home-wrap:hover .home-track-l,
      .marquee-home-wrap:hover .home-track-r { animation-play-state: paused; }
    `}</style>

    {/* ── Centered heading ─────────────────────── */}
    <div className="relative z-10 text-center max-w-2xl mx-auto px-4 mb-10">
      <div className="inline-flex items-center gap-2.5 mb-4">
        <span className="block h-px w-8 bg-[#793146]" />
        <span className="text-[10.5px] font-bold tracking-[0.14em] text-[#793146] uppercase font-inter">
          Patient Voices
        </span>
        <span className="block h-px w-8 bg-[#793146]" />
      </div>
      <h2
        id="testimonials-heading"
        className="font-inter font-bold leading-[1.05] text-[#0d2b45]"
        style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
      >
        What Our{" "}
        <span
          style={{
            background:           "linear-gradient(135deg, #154565 0%, #793146 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
            backgroundClip:       "text",
          }}
        >
          Patients Say
        </span>
      </h2>
      <p className="mt-3 text-[14.5px] text-[#4a6070] leading-relaxed">
        Real experiences from the patients and families we serve every day.
      </p>
    </div>

    {/* Marquee rows — break out of Page px-[10%] padding to reach screen edges */}
    <div className="relative z-10" style={{ width: "100vw", position: "relative", left: "50%", transform: "translateX(-50%)" }}>

      {/* Edge fades */}
      <div
        className="absolute left-0 inset-y-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #c8dce9, transparent)" }}
      />
      <div
        className="absolute right-0 inset-y-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #c0d3e2, transparent)" }}
      />

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden mb-3">
        <div className="home-track-l gap-4">
          {ROW_1.map((t, i) => <MarqueeCard key={i} t={t} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <div className="home-track-r gap-4">
          {ROW_2.map((t, i) => <MarqueeCard key={i} t={t} />)}
        </div>
      </div>
    </div>

    <p className="relative z-10 text-center font-poppins text-[11px] text-[#94a3b8] mt-5 tracking-wide">
      hover to pause
    </p>
  </section>
);

export default Testimonial;

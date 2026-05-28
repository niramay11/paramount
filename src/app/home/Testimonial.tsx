"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import StarRating from "@/component/Rating";
import SectionHeader from "@/component/SectionHeader";
import { STAGGER_SM, cardReveal, VIEWPORT_ONCE } from "@/lib/motion";
import Doctor_1 from "../../../public/doctor_1.png";
import Doctor_2 from "../../../public/doctor_2.png";
import Doctor_3 from "../../../public/doctor_3.png";
import Doctor_4 from "../../../public/doctor_4.png";
import Doctor_5 from "../../../public/doctor_5.png";
import Doctor_6 from "../../../public/doctor_6.png";

/* ─── data ──────────────────────────────────────────── */

type Testimonial = {
  profile:     StaticImageData;
  name:        string;
  role?:       string;
  description: string;
  rating:      number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    profile:     Doctor_1,
    name:        "Parthiban",
    description: "Last week I was here for a COVID test. The place was neat and clean. Priya was so professional. Thanks Priya madam 🙌",
    rating:      5,
  },
  {
    profile:     Doctor_2,
    name:        "Rahul Mantri",
    description: "Miss Priya was friendly and thoughtful. She explained the test, the expectation, what to do while waiting for the result. I left feeling relaxed and informed. Thanks for this positive experience!",
    rating:      5,
  },
  {
    profile:     Doctor_3,
    name:        "Nayee Maulik",
    description: "I don't leave reviews normally but they really deserve one for going above and beyond to make my parents feel comfortable. All staff — technical and administrative — were so nice and helpful.",
    rating:      5,
  },
  {
    profile:     Doctor_4,
    name:        "Kavi Physio",
    description: "Priya mam handled me very well and she is so polite. Thank you for your excellent service, keep going.",
    rating:      5,
  },
  {
    profile:     Doctor_5,
    name:        "Naseer Alwadi",
    description: "Nice, cooperative and extremely friendly helpful staff. Accurate and timely results. Quick response. Recommend to go there. Many thanks from me and my family.",
    rating:      5,
  },
  {
    profile:     Doctor_6,
    name:        "Anthony DeJesus",
    description: "Very helpful, answered all of my questions regarding testing. The whole experience was smooth and professional from start to finish.",
    rating:      5,
  },
];

/* ─── card ──────────────────────────────────────────── */

interface CardProps {
  item:    Testimonial;
  reduced: boolean;
}

const TestimonialCard = ({ item, reduced }: CardProps) => (
  <motion.article
    variants={reduced ? {} : cardReveal}
    whileHover={
      reduced
        ? {}
        : { y: -6, boxShadow: "0 24px 52px rgba(21,69,101,0.13), 0 0 0 1px rgba(21,69,101,0.09)" }
    }
    transition={{ type: "spring", stiffness: 340, damping: 26 }}
    aria-label={`Testimonial from ${item.name}`}
    className="relative flex flex-col rounded-2xl bg-white overflow-hidden h-full"
    style={{
      border:    "1px solid rgba(21,69,101,0.08)",
      boxShadow: "0 4px 28px rgba(21,69,101,0.07)",
    }}
  >
    {/* Top gradient accent */}
    <div
      className="h-[3px] w-full flex-shrink-0"
      style={{ background: "linear-gradient(90deg, #154565 0%, #793146 100%)" }}
      aria-hidden="true"
    />

    <div className="flex flex-col gap-6 p-8 flex-1">

      {/* Stars + quote mark row */}
      <div className="flex items-start justify-between">
        <div
          className="font-serif text-[72px] leading-none select-none"
          style={{ color: "rgba(21,69,101,0.11)", lineHeight: "0.85" }}
          aria-hidden="true"
        >
          &ldquo;
        </div>
        <StarRating rating={item.rating} />
      </div>

      {/* Quote text */}
      <div className="flex-1">
        <blockquote className="font-poppins text-[14.5px] leading-[1.75] text-[#334e62]">
          {item.description}
        </blockquote>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, rgba(21,69,101,0.14) 0%, transparent 75%)" }}
        aria-hidden="true"
      />

      {/* Attribution */}
      <div className="flex items-center gap-4">
        {/* Avatar with gradient ring */}
        <div
          className="rounded-full flex-shrink-0 p-[3px]"
          style={{ background: "linear-gradient(135deg, #154565 0%, #793146 100%)" }}
        >
          <div className="rounded-full overflow-hidden bg-white w-12 h-12">
            <Image
              src={item.profile}
              alt={item.name}
              width={52}
              height={52}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="font-poppins font-bold text-[#0d2b45] text-[14px] leading-tight">
            {item.name}
          </p>
          {item.role && (
            <p className="font-poppins text-[12px] text-[#94a3b8] mt-0.5 font-light">{item.role}</p>
          )}
          <p className="font-poppins text-[11.5px] text-[#94a3b8] mt-0.5 font-light">
            Verified Patient
          </p>
        </div>
      </div>

    </div>
  </motion.article>
);

/* ─── section ───────────────────────────────────────── */

const Testimonial: React.FC = () => {
  const reduced = !!useReducedMotion();

  return (
    <section className="py-20 relative" aria-labelledby="testimonials-heading">

      {/* Background */}
      <div
        className="absolute inset-0 w-screen left-1/2 translate-x-[-50%] h-full z-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #f8fafc 0%, #edf3f9 50%, #f8fafc 100%)",
          }}
        />
        {/* Radial glows */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[480px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(21,69,101,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[480px] h-[360px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom right, rgba(121,49,70,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10">

        <SectionHeader
          id="testimonials-heading"
          eyebrow="Patient Voices"
          heading="What Our Patients Say"
          body="Real experiences from the patients and families we serve every day."
        />

        {/* 3-column card grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          variants={reduced ? {} : STAGGER_SM}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {TESTIMONIALS.map(item => (
            <TestimonialCard key={item.name} item={item} reduced={reduced} />
          ))}
        </motion.div>

        {/* Trust note */}
        <motion.p
          className="text-center font-poppins text-[12.5px] text-[#94a3b8] mt-10"
          initial={reduced ? {} : { opacity: 0 }}
          whileInView={reduced ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          All reviews are from verified patients via Google Reviews
        </motion.p>

      </div>
    </section>
  );
};

export default Testimonial;

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/component/SectionHeader";
import { STAGGER_SM, cardReveal, SPRING_BRISK, VIEWPORT_ONCE } from "@/lib/motion";
import Womenblack     from "@/assets/WomenBlack";
import DnaIcon        from "@/assets/DnaIcon";
import CovidIcon      from "@/assets/CovidIcon";
import FlowCyto       from "@/assets/FlowCytoIcon";
import PodiatryIcon   from "@/assets/PodiatryIcon";
import ToxicologyIcon from "@/assets/ToxicologyIcon";

/* ─── data ──────────────────────────────────────────── */

const SERVICES = [
  {
    icon: Womenblack,
    title: "Women's Health",
    description:
      "Comprehensive health services focused on reproductive health, gynaecological care, and wellness throughout all stages of a woman's life.",
  },
  {
    icon: DnaIcon,
    title: "Routine Blood Tests",
    description:
      "Fast and reliable blood work for monitoring overall health, managing chronic conditions, and preventive care.",
  },
  {
    icon: CovidIcon,
    title: "Covid-19 Tests",
    description:
      "Accurate and timely RT-PCR and antigen testing to ensure your safety and peace of mind.",
  },
  {
    icon: FlowCyto,
    title: "Flow Cytometry",
    description:
      "Advanced cell analysis for complex diagnostics in hematology and immunology.",
  },
  {
    icon: PodiatryIcon,
    title: "Podiatry",
    description:
      "Supporting podiatric care with precise, reliable, and comprehensive lab diagnostics.",
  },
  {
    icon: ToxicologyIcon,
    title: "Toxicology",
    description:
      "Ensuring safety through precise toxicology testing that detects, analyses, and protects every step.",
  },
] as const;

type Service = (typeof SERVICES)[number];

/* ─── card ──────────────────────────────────────────── */

interface ServiceCardProps {
  service: Service;
  reduced: boolean;
}

const ServiceCard = ({ service, reduced }: ServiceCardProps) => (
  <motion.article
    variants={reduced ? {} : cardReveal}
    whileHover={
      reduced
        ? {}
        : { y: -8, boxShadow: "0 28px 56px rgba(0,0,0,0.14)" }
    }
    transition={SPRING_BRISK}
    aria-label={service.title}
    className="group flex flex-col items-center text-center gap-5 rounded-2xl bg-white p-8 h-full"
    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
  >
    {/* Icon — bare, no background container, matching reference */}
    <motion.div
      className="flex items-center justify-center"
      whileHover={reduced ? {} : { scale: 1.12, rotate: -4 }}
      transition={{ type: "spring", stiffness: 340, damping: 20 }}
    >
      {React.createElement(service.icon, {
        className: "w-[76px] h-[76px] [&_*]:fill-[#154565] text-[#154565]",
      })}
    </motion.div>

    {/* Content */}
    <div className="flex-1 flex flex-col gap-2.5">
      <h3 className="font-poppins text-[18px] font-bold text-[#0d2b45] leading-snug">
        {service.title}
      </h3>
      <p className="font-poppins text-[13.5px] font-light text-[#4a6070] leading-relaxed">
        {service.description}
      </p>
    </div>

    {/* Learn more */}
    <div className="flex items-center gap-1.5 text-[12.5px] font-semibold font-sora text-[#793146] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <span>Learn more</span>
      <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
    </div>
  </motion.article>
);

/* ─── decorative background blobs ───────────────────── */

const BgDecor = () => (
  <>
    {/* Large soft circle — top left */}
    <div
      className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, transparent 65%)" }}
    />
    {/* Large soft circle — bottom right */}
    <div
      className="absolute -bottom-20 -right-20 w-[420px] h-[420px] rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 65%)" }}
    />
    {/* Floating molecule dots — scattered */}
    {[
      { top: "12%",  left: "8%",   size: 10, op: 0.25 },
      { top: "22%",  left: "18%",  size: 6,  op: 0.18 },
      { top: "70%",  left: "5%",   size: 8,  op: 0.22 },
      { top: "80%",  left: "14%",  size: 5,  op: 0.15 },
      { top: "10%",  right: "10%", size: 9,  op: 0.22 },
      { top: "30%",  right: "5%",  size: 6,  op: 0.17 },
      { top: "65%",  right: "9%",  size: 11, op: 0.20 },
      { top: "82%",  right: "18%", size: 5,  op: 0.15 },
    ].map((d, i) => (
      <div
        key={i}
        className="absolute rounded-full pointer-events-none"
        style={{
          top:    d.top,
          left:   "left" in d ? d.left : undefined,
          right:  "right" in d ? (d as { right: string }).right : undefined,
          width:  d.size,
          height: d.size,
          background: `rgba(255,255,255,${d.op})`,
        }}
      />
    ))}
    {/* Watermark DNA icon — top right corner */}
    <div className="absolute top-8 right-8 w-64 h-64 pointer-events-none opacity-[0.07]">
      {React.createElement(DnaIcon, {
        className: "w-full h-full [&_*]:fill-white text-white",
      })}
    </div>
    {/* Watermark Flask icon — bottom left corner */}
    <div className="absolute bottom-8 left-8 w-44 h-44 pointer-events-none opacity-[0.07]">
      {React.createElement(ToxicologyIcon, {
        className: "w-full h-full [&_*]:fill-white text-white",
      })}
    </div>
  </>
);

/* ─── section ───────────────────────────────────────── */

const Service = () => {
  const router  = useRouter();
  const reduced = !!useReducedMotion();

  return (
    <section className="py-20 relative" aria-labelledby="services-heading">

      {/* Blue-gray background matching reference screenshot */}
      <div
        className="absolute inset-0 w-screen left-1/2 translate-x-[-50%] h-full z-0 overflow-hidden"
        aria-hidden="true"
        style={{
          background: "linear-gradient(145deg, #c8dce9 0%, #b8ccd9 40%, #c0d3e2 100%)",
        }}
      >
        <BgDecor />
      </div>

      <div className="relative z-10">

        <SectionHeader
          id="services-heading"
          eyebrow="Our Services"
          heading="Our Diagnostic Services"
          body="From routine check-ups to specialized testing, our accredited lab is equipped to meet all your health needs with precision and care."
        />

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          variants={reduced ? {} : STAGGER_SM}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} reduced={reduced} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-14"
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.38, ease: "easeOut" as const }}
        >
          <motion.button
            onClick={() => router.push("/services")}
            className="group relative flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold font-sora text-white overflow-hidden button-bg"
            whileHover={reduced ? {} : { scale: 1.04, opacity: 0.9 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
            transition={SPRING_BRISK}
            aria-label="View all diagnostic services"
          >
            <span>View All Services</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
  
export default Service;

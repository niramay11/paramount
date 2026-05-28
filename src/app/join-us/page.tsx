"use client";

import Page from "@/component/Page";
import Footer from "@/component/Footer";
import Image from "next/image";
import React, { useState } from "react";
import CareerPeople from "../../../public/career_people.png";
import {
  CheckCircleIcon, AlertCircleIcon, ArrowRight,
  DollarSignIcon, HeartIcon, UsersIcon, BriefcaseIcon,
} from "lucide-react";

/* ─── types ─────────────────────────────────────────────── */

type Position = "lab-tech" | "phlebotomist" | "admin" | "other";

type FormState = {
  position: Position;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

const EMPTY: FormState = {
  position: "lab-tech",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

/* ─── constants ─────────────────────────────────────────── */

const POSITIONS: { value: Position; label: string }[] = [
  { value: "lab-tech",     label: "Lab Technician" },
  { value: "phlebotomist", label: "Phlebotomist"   },
  { value: "admin",        label: "Administrative"  },
  { value: "other",        label: "Other"           },
];

const BENEFITS = [
  { Icon: DollarSignIcon, label: "Competitive Pay"   },
  { Icon: HeartIcon,      label: "Work-Life Balance" },
  { Icon: UsersIcon,      label: "Expert Team"       },
  { Icon: BriefcaseIcon,  label: "Career Growth"     },
];

/* ─── styles ─────────────────────────────────────────────── */

const fieldClass =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-[13.5px] font-poppins text-[#0d2b45] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154565]/20 focus:border-[#154565] focus:bg-white transition-all duration-150";

const labelClass =
  "block font-poppins text-[11px] font-semibold tracking-wide text-[#4a6070] uppercase mb-1";

/* ─── page ─────────────────────────────────────────────── */

export default function JoinUsPage() {
  const [form, setForm]                 = useState<FormState>(EMPTY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"" | "success" | "error">("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    if (!form.firstName || !form.lastName || !form.email) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          subject: `Job Application — ${POSITIONS.find((p) => p.value === form.position)?.label}`,
          timestamp: new Date().toISOString(),
        }),
      });
      if (response.ok) { setSubmitStatus("success"); setForm(EMPTY); }
      else setSubmitStatus("error");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>

      {/* ══ HERO — image + text ════════════════════════════════ */}
      <section className="relative pt-12 pb-16">
        <div
          className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0"
          style={{ background: "linear-gradient(180deg, #f0f4f8 0%, #e8eef5 100%)" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="block h-px w-8 bg-[#793146]" />
              <span className="text-[10.5px] font-bold tracking-[0.14em] text-[#793146] uppercase font-inter">
                We&apos;re Hiring
              </span>
            </div>

            <h1 className="text-[2.2rem] sm:text-[2.8rem] font-inter font-bold leading-[1.1] text-[#0d2b45]">
              Build Your Career<br />
              <span className="text-[#154565]">at Paramount</span>
            </h1>

            <p className="mt-4 text-[15px] text-[#4a6070] leading-relaxed max-w-md">
              Join a team of dedicated lab professionals making a real difference
              in patient care every single day.
            </p>

            {/* Benefit pills */}
            <div className="mt-7 flex flex-wrap gap-2">
              {BENEFITS.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white rounded-full px-3.5 py-2 border border-gray-200"
                  style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}
                >
                  <Icon className="w-3.5 h-3.5 text-[#154565]" />
                  <span className="font-poppins text-[12px] font-semibold text-[#0d2b45]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-3xl z-0 opacity-20"
              style={{ background: "linear-gradient(135deg, #154565 0%, #793146 100%)" }}
            />
            <Image
              src={CareerPeople}
              alt="Paramount Lab team"
              width={600}
              height={500}
              className="relative z-10 w-full rounded-2xl object-cover max-h-[420px]"
            />
          </div>
        </div>
      </section>

      {/* ══ FORM ═══════════════════════════════════════════════ */}
      <section className="relative py-14">
        <div
          className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0"
          style={{ background: "#fff" }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-4">

          {/* Section heading */}
          <div className="mb-8">
            <h2 className="text-[1.7rem] font-inter font-bold text-[#0d2b45]">
              Send Your Application
            </h2>
            <p className="mt-1.5 text-[14px] text-[#4a6070]">
              We review every application and respond within 2–3 business days.
            </p>
          </div>

          {/* Status banners */}
          {submitStatus === "success" && (
            <div className="mb-6 flex items-start gap-3 bg-white border border-green-200 rounded-xl px-4 py-3 shadow-sm">
              <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-poppins text-[13px] font-semibold text-green-800">Application submitted!</p>
                <p className="font-poppins text-[12px] text-green-700 mt-0.5">
                  We&apos;ll review it and be in touch shortly.
                </p>
              </div>
            </div>
          )}
          {submitStatus === "error" && (
            <div className="mb-6 flex items-start gap-3 bg-white border border-red-200 rounded-xl px-4 py-3 shadow-sm">
              <AlertCircleIcon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-poppins text-[13px] font-semibold text-red-800">Submission failed</p>
                <p className="font-poppins text-[12px] text-red-700 mt-0.5">
                  Please fill in all required fields and try again.
                </p>
              </div>
            </div>
          )}

          {/* Form card */}
          <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.09)" }}
          >
            {/* thin gradient accent bar */}
            <div
              className="h-[3px]"
              style={{ background: "linear-gradient(135deg, #154565 0%, #793146 100%)" }}
            />

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 flex flex-col gap-5">

              {/* Position */}
              <div>
                <label className={labelClass}>Position of Interest</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {POSITIONS.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, position: value }))}
                      className={`py-1.5 rounded-full text-[12px] font-poppins font-semibold border transition-all duration-200 ${
                        form.position === value
                          ? "bg-[#154565] text-white border-[#154565]"
                          : "bg-white text-[#4a6070] border-gray-300 hover:border-[#154565] hover:text-[#154565]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className={labelClass}>
                    First Name <span className="text-[#793146]">*</span>
                  </label>
                  <input
                    id="firstName" name="firstName" value={form.firstName}
                    onChange={handleInput} placeholder="First name"
                    required className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClass}>
                    Last Name <span className="text-[#793146]">*</span>
                  </label>
                  <input
                    id="lastName" name="lastName" value={form.lastName}
                    onChange={handleInput} placeholder="Last name"
                    required className={fieldClass}
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-[#793146]">*</span>
                  </label>
                  <input
                    id="email" name="email" type="email" value={form.email}
                    onChange={handleInput} placeholder="you@email.com"
                    required className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone</label>
                  <input
                    id="phone" name="phone" type="tel" value={form.phone}
                    onChange={handleInput} placeholder="(555) 000-0000"
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelClass}>Tell Us About Yourself</label>
                <textarea
                  id="message" name="message" value={form.message}
                  onChange={handleInput} rows={4}
                  placeholder="Briefly describe your experience and why you'd like to join our team…"
                  className={`${fieldClass} resize-none`}
                />
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between pt-1">
                <p className="font-poppins text-[11px] text-[#4a6070]">
                  <span className="text-[#793146]">*</span> required fields
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-2.5 rounded-full text-[13px] font-poppins font-semibold text-white flex items-center gap-2 hover:opacity-90 transition-opacity duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #154565 0%, #793146 100%)" }}
                >
                  {isSubmitting ? "Submitting…" : (
                    <>Submit Application <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>

      <Footer />
    </Page>
  );
}

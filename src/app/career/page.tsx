"use client";

import Footer from "@/component/Footer";
import Page from "@/component/Page";
import CustomFileUpload from "@/component/Upload";
import Image from "next/image";
import LabPeople from "../../../public/lab_people.png";
import React, { useState } from "react";
import {
  CheckCircleIcon, AlertCircleIcon, ArrowRight,
  DollarSignIcon, HeartIcon, UsersIcon, BriefcaseIcon,
} from "lucide-react";

/* ─── positions ──────────────────────────────────────── */

const POSITIONS = [
  { value: "",                          label: "Select a position…"                },
  { value: "lab_technician",            label: "Lab Technician"                    },
  { value: "phlebotomist",              label: "Phlebotomist"                      },
  { value: "medical_assistant",         label: "Medical Assistant"                 },
  { value: "administrative",            label: "Administrative / Front Desk"       },
  { value: "billing_specialist",        label: "Billing & Insurance Specialist"    },
  { value: "it_support",               label: "IT Support"                        },
  { value: "data_analyst",             label: "Data Analyst"                      },
  { value: "quality_assurance",        label: "Quality Assurance"                 },
  { value: "other",                    label: "Other"                             },
];

const BENEFITS = [
  { Icon: DollarSignIcon, label: "Competitive Pay"   },
  { Icon: HeartIcon,      label: "Work-Life Balance" },
  { Icon: UsersIcon,      label: "Expert Team"       },
  { Icon: BriefcaseIcon,  label: "Career Growth"     },
];

/* ─── styles shared with other pages ────────────────── */

const fieldClass =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-[13.5px] font-poppins text-[#0d2b45] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154565]/20 focus:border-[#154565] focus:bg-white transition-all duration-150";

const labelClass =
  "block font-poppins text-[11px] font-semibold tracking-wide text-[#4a6070] uppercase mb-1";

/* ─── page ───────────────────────────────────────────── */

export default function CareerPage() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", telephone: "",
    cellNumber: "", email: "", position: "",
    document: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"" | "success" | "error">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (file: File | null) => {
    setFormData(prev => ({ ...prev, document: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const fd = new FormData();
      fd.append("firstName",  formData.firstName);
      fd.append("lastName",   formData.lastName);
      fd.append("telephone",  formData.telephone);
      fd.append("cellNumber", formData.cellNumber);
      fd.append("email",      formData.email);
      fd.append("position",   formData.position);
      fd.append("timestamp",  new Date().toISOString());
      if (formData.document) fd.append("document", formData.document);

      const res = await fetch("/api/application", { method: "POST", body: fd });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ firstName: "", lastName: "", telephone: "", cellNumber: "", email: "", position: "", document: null });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>

      {/* ══ HERO — bg image + 3D rings + form ═════════════════ */}
      <section className="relative min-h-[680px]">

        {/* Background image */}
        <div className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0">
          <Image
            src={LabPeople}
            alt="Paramount Lab team"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(13,43,69,0.93) 0%, rgba(21,69,101,0.88) 50%, rgba(121,49,70,0.82) 100%)" }}
          />
        </div>

        {/* CSS 3D orbital rings */}
        <style>{`
          @keyframes orbit1 { from { transform: perspective(600px) rotateX(72deg) rotateZ(0deg);   } to { transform: perspective(600px) rotateX(72deg) rotateZ(360deg);   } }
          @keyframes orbit2 { from { transform: perspective(600px) rotateX(60deg) rotateZ(120deg); } to { transform: perspective(600px) rotateX(60deg) rotateZ(480deg); } }
          @keyframes orbit3 { from { transform: perspective(600px) rotateX(80deg) rotateZ(240deg); } to { transform: perspective(600px) rotateX(80deg) rotateZ(600deg); } }
          .career-orbit1 { animation: orbit1 18s linear infinite; }
          .career-orbit2 { animation: orbit2 26s linear infinite; }
          .career-orbit3 { animation: orbit3 34s linear infinite; }
        `}</style>

        {/* Orbital rings — decorative, left side */}
        <div className="absolute left-[-120px] top-1/2 -translate-y-1/2 w-[520px] h-[520px] pointer-events-none z-[1] hidden lg:block">
          <div className="career-orbit1 absolute inset-0 rounded-full" style={{ border: "1px solid rgba(168,208,240,0.18)" }} />
          <div className="career-orbit2 absolute inset-[60px] rounded-full" style={{ border: "1px solid rgba(232,160,188,0.15)" }} />
          <div className="career-orbit3 absolute inset-[110px] rounded-full" style={{ border: "1px solid rgba(168,208,240,0.12)" }} />
        </div>

        {/* Content grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 lg:py-20">

          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="block h-px w-8 bg-[#c97a97]" />
              <span className="text-[10.5px] font-bold tracking-[0.14em] text-[#c97a97] uppercase font-inter">
                We&apos;re Hiring
              </span>
            </div>

            <h1
              className="font-inter font-bold leading-[1.05] text-white"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)" }}
            >
              Build Your Career<br />
              <span
                style={{
                  background:           "linear-gradient(135deg, #a8d0f0 0%, #e8a0bc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor:  "transparent",
                  backgroundClip:       "text",
                }}
              >
                at Paramount
              </span>
            </h1>

            <p className="mt-4 text-[15px] text-white/60 leading-relaxed max-w-md">
              Join a team of dedicated lab professionals making a real difference in patient care every single day.
            </p>

            {/* Benefit pills */}
            <div className="mt-7 flex flex-wrap gap-2">
              {BENEFITS.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full px-3.5 py-2"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    border:     "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <Icon className="w-3.5 h-3.5 text-[#a8d0f0]" />
                  <span className="font-poppins text-[12px] font-semibold text-white/90">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form card */}
          <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.22)" }}
          >
            {/* Gradient accent bar */}
            <div className="h-[3px]" style={{ background: "linear-gradient(135deg, #154565 0%, #793146 100%)" }} />

            <div className="p-6 sm:p-7">
              <h2 className="font-inter font-bold text-[1.15rem] text-[#0d2b45] mb-1">Apply Now</h2>
              <p className="font-poppins text-[12px] text-[#4a6070] mb-5">
                We review every application and respond within 2–3 business days.
              </p>

              {/* Status banners */}
              {submitStatus === "success" && (
                <div className="mb-4 flex items-start gap-3 border border-green-200 rounded-xl px-4 py-3 bg-green-50">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-poppins text-[13px] font-semibold text-green-800">Application submitted!</p>
                    <p className="font-poppins text-[12px] text-green-700 mt-0.5">We&apos;ll review it and be in touch shortly.</p>
                  </div>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mb-4 flex items-start gap-3 border border-red-200 rounded-xl px-4 py-3 bg-red-50">
                  <AlertCircleIcon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-poppins text-[13px] font-semibold text-red-800">Submission failed</p>
                    <p className="font-poppins text-[12px] text-red-700 mt-0.5">Please check all fields and try again.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>First Name <span className="text-[#793146]">*</span></label>
                    <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" required className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass}>Last Name <span className="text-[#793146]">*</span></label>
                    <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" required className={fieldClass} />
                  </div>
                </div>

                {/* Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="telephone" className={labelClass}>Telephone</label>
                    <input id="telephone" name="telephone" type="tel" value={formData.telephone} onChange={handleChange} placeholder="(555) 000-0000" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="cellNumber" className={labelClass}>Cell <span className="text-[#793146]">*</span></label>
                    <input id="cellNumber" name="cellNumber" type="tel" value={formData.cellNumber} onChange={handleChange} placeholder="(555) 000-0000" required className={fieldClass} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClass}>Email <span className="text-[#793146]">*</span></label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" required className={fieldClass} />
                </div>

                {/* Position */}
                <div>
                  <label htmlFor="position" className={labelClass}>Position Applied For <span className="text-[#793146]">*</span></label>
                  <select
                    id="position" name="position" value={formData.position}
                    onChange={handleChange} required
                    className={fieldClass}
                    style={{ appearance: "none" }}
                  >
                    {POSITIONS.map(p => (
                      <option key={p.value} value={p.value} disabled={p.value === ""}>{p.label}</option>
                    ))}
                  </select>
                </div>

                {/* Resume upload */}
                <div>
                  <label className={labelClass}>Resume / CV <span className="text-[#793146]">*</span></label>
                  <CustomFileUpload
                    id="document" name="document" label=""
                    accept=".pdf,.doc,.docx"
                    onChange={handleFile}
                    required
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-1">
                  <p className="font-poppins text-[11px] text-[#4a6070]">
                    <span className="text-[#793146]">*</span> required
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-full text-[13px] font-poppins font-semibold text-white flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #154565 0%, #793146 100%)" }}
                  >
                    {isSubmitting ? "Submitting…" : (<>Submit Application <ArrowRight className="w-4 h-4" /></>)}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </Page>
  );
}

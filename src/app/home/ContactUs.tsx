"use client"

import React, { useState } from "react";
import Contact_Dr from "../../../public/contact_dr.png";
import Image from "next/image";
import { PhoneIcon, ArrowUpRightIcon, ClockIcon, MailIcon } from "lucide-react";

/* ─── subject options ──────────────────────────────────── */

const SUBJECTS = [
  { label: "General",       value: "general" },
  { label: "Test Packages", value: "test-packages" },
  { label: "Help & Support",value: "help-support" },
  { label: "Report",        value: "report" },
];

/* ─── shared input class ────────────────────────────────── */

const inputCls =
  "w-full px-4 py-3 rounded-lg border border-gray-200 text-[14px] text-[#374151] bg-white " +
  "focus:outline-none focus:border-[#154565] focus:ring-2 focus:ring-[#154565]/10 " +
  "transition-colors font-sora placeholder:text-gray-400";

const labelCls = "block mb-1.5 text-[12px] font-semibold font-sora text-[#4a6070] uppercase tracking-wide";

/* ─── component ─────────────────────────────────────────── */

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName:  "",
    email:     "",
    phone:     "",
    subject:   "",
    message:   "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const set = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
      });
      const result = await res.json();
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
        console.error("Error:", result.error);
      }
    } catch (err) {
      setSubmitStatus("error");
      console.error("Error submitting form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 relative">

      {/* Light section background */}
      <div
        className="absolute inset-0 w-screen left-1/2 translate-x-[-50%] h-full z-0"
        style={{ background: "#f8fafc" }}
      />

      <div className="relative z-10">

        {/* ── Section heading ── */}
        <div className="flex flex-col items-center gap-3 text-center mb-10">
          <div className="gradient-divider" />
          <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-[#0d2b45]">
            Contact Us
          </h2>
          <p className="font-poppins text-[15px] text-[#4a6070] max-w-xl leading-relaxed">
            Have a question or ready to book your test? We&apos;re here to help.
          </p>
        </div>

        {/* ── Split card ── */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 flex flex-col lg:flex-row">

          {/* ── Left: info panel ── */}
          <div
            className="lg:w-[36%] relative flex flex-col overflow-hidden"
            style={{ background: "linear-gradient(155deg, #0d2b45 0%, #154565 100%)" }}
          >
            {/* Dot texture */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                backgroundSize:  "22px 22px",
              }}
            />

            <div className="relative z-10 p-8 lg:p-10 flex flex-col h-full">
              {/* Eyebrow + heading */}
              <div className="gradient-divider mb-4" />
              <h3 className="font-inter font-bold text-2xl text-white mb-2">
                Get in Touch
              </h3>
              <p className="font-poppins text-sm text-white/65 leading-relaxed mb-8">
                Our team is available Monday through Saturday. We aim to
                respond to all inquiries within one business day.
              </p>

              {/* Contact details */}
              <div className="flex flex-col gap-4">
                <a
                  href="tel:+19088348034"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <PhoneIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/45 uppercase tracking-widest font-inter mb-0.5">Phone</p>
                    <p className="text-sm font-semibold text-white group-hover:text-white/90">+1 908 834 8034</p>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MailIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/45 uppercase tracking-widest font-inter mb-0.5">Email</p>
                    <p className="text-sm font-semibold text-white">info@paramountdx.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/45 uppercase tracking-widest font-inter mb-0.5">Hours</p>
                    <p className="text-sm font-semibold text-white">Mon – Sat: 7 AM – 6 PM</p>
                  </div>
                </div>
              </div>

              {/* Doctor image pinned to the bottom */}
              <div className="mt-auto pt-8 flex justify-center items-end -mb-10">
                <Image
                  src={Contact_Dr}
                  alt="Paramount Diagnostic Lab contact"
                  width={260}
                  height={300}
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* ── Right: form panel ── */}
          <div className="lg:w-[64%] bg-white p-8 lg:p-12">

            {/* Status messages */}
            {submitStatus === "success" && (
              <div className="mb-5 p-3.5 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-sora">
                ✓ Your inquiry has been submitted successfully! We&apos;ll be in touch shortly.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-sora">
                Something went wrong. Please try again or call us directly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className={labelCls}>First Name</label>
                  <input className={inputCls} placeholder="John" name="firstName" value={formData.firstName} onChange={set("firstName")} required />
                </div>
                <div className="flex-1">
                  <label className={labelCls}>Last Name</label>
                  <input className={inputCls} placeholder="Doe"  name="lastName"  value={formData.lastName}  onChange={set("lastName")}  required />
                </div>
              </div>

              {/* Email + phone */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className={labelCls}>Email Address</label>
                  <input className={inputCls} placeholder="john@email.com" name="email" value={formData.email} onChange={set("email")} type="email" required />
                </div>
                <div className="flex-1">
                  <label className={labelCls}>Phone Number</label>
                  <input className={inputCls} placeholder="+1 (000) 000-0000" name="phone" value={formData.phone} onChange={set("phone")} type="tel" required />
                </div>
              </div>

              {/* Subject — pill toggle buttons instead of radio inputs */}
              <div>
                <label className={labelCls}>Subject</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {SUBJECTS.map(s => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, subject: s.value }))}
                      className={`px-4 py-2 rounded-lg text-[12.5px] font-semibold font-sora border transition-all duration-200 ${
                        formData.subject === s.value
                          ? "bg-[#154565] text-white border-[#154565]"
                          : "bg-white text-[#4a6070] border-gray-200 hover:border-[#154565]/40 hover:text-[#154565]"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className={labelCls}>Message</label>
                <textarea
                  className={`${inputCls} resize-none`}
                  placeholder="Tell us how we can help you..."
                  name="message"
                  value={formData.message}
                  onChange={set("message")}
                  rows={4}
                  required
                />
              </div>

              {/* Submit */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 rounded-lg bg-[#154565] text-white text-sm font-semibold font-sora hover:bg-[#0d2b45] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting…" : "Send Message"}
                  {!isSubmitting && <ArrowUpRightIcon className="w-4 h-4" />}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;

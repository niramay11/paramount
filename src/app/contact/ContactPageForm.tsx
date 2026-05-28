"use client";

import React, { useState } from "react";
import { CheckCircleIcon, AlertCircleIcon, ArrowRight } from "lucide-react";

const fieldClass =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-[13.5px] font-poppins text-[#0d2b45] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154565]/20 focus:border-[#154565] focus:bg-white transition-all duration-150";

const labelClass =
  "block font-poppins text-[11px] font-semibold tracking-wide text-[#4a6070] uppercase mb-1";

const ContactPageForm = () => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", telephone: "", email: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | "">("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString(), subject: "general inquiry" }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ firstName: "", lastName: "", telephone: "", email: "", message: "" });
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
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.09)" }}
    >
      {/* Gradient accent bar */}
      <div
        className="h-[3px]"
        style={{ background: "linear-gradient(135deg, #154565 0%, #793146 100%)" }}
      />

      <div className="p-6 sm:p-8">

        {/* Status banners */}
        {submitStatus === "success" && (
          <div className="mb-5 flex items-start gap-3 bg-white border border-green-200 rounded-xl px-4 py-3 shadow-sm">
            <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-poppins text-[13px] font-semibold text-green-800">Message sent!</p>
              <p className="font-poppins text-[12px] text-green-700 mt-0.5">We&apos;ll get back to you within one business day.</p>
            </div>
          </div>
        )}
        {submitStatus === "error" && (
          <div className="mb-5 flex items-start gap-3 bg-white border border-red-200 rounded-xl px-4 py-3 shadow-sm">
            <AlertCircleIcon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-poppins text-[13px] font-semibold text-red-800">Submission failed</p>
              <p className="font-poppins text-[12px] text-red-700 mt-0.5">Please try again.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className={labelClass}>
                First Name <span className="text-[#793146]">*</span>
              </label>
              <input
                id="firstName" name="firstName" value={formData.firstName}
                onChange={handleInputChange} placeholder="First name"
                required className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClass}>
                Last Name <span className="text-[#793146]">*</span>
              </label>
              <input
                id="lastName" name="lastName" value={formData.lastName}
                onChange={handleInputChange} placeholder="Last name"
                required className={fieldClass}
              />
            </div>
          </div>

          {/* Phone + Email row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="telephone" className={labelClass}>
                Phone <span className="text-[#793146]">*</span>
              </label>
              <input
                id="telephone" name="telephone" type="tel" value={formData.telephone}
                onChange={handleInputChange} placeholder="(555) 000-0000"
                required className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email <span className="text-[#793146]">*</span>
              </label>
              <input
                id="email" name="email" type="email" value={formData.email}
                onChange={handleInputChange} placeholder="you@email.com"
                required className={fieldClass}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={labelClass}>
              How Can We Help? <span className="text-[#793146]">*</span>
            </label>
            <textarea
              id="message" name="message" value={formData.message}
              onChange={handleInputChange} rows={4} required
              placeholder="Tell us how we can help you…"
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
              {isSubmitting ? "Sending…" : (
                <>Send Message <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ContactPageForm;

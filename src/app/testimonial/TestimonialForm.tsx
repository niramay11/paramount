"use client";

import React, { useState } from "react";
import { CheckCircleIcon, AlertCircleIcon, ArrowRight, Star } from "lucide-react";

const fieldClass =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-[13.5px] font-poppins text-[#0d2b45] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154565]/20 focus:border-[#154565] focus:bg-white transition-all duration-150";

const labelClass =
  "block font-poppins text-[11px] font-semibold tracking-wide text-[#4a6070] uppercase mb-1";

const TestimonialForm = () => {
  const [formData, setFormData]         = useState({ name: "", email: "", comment: "" });
  const [rating, setRating]             = useState(0);
  const [hoverRating, setHoverRating]   = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"" | "success" | "error">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rating, timestamp: new Date().toISOString() }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", comment: "" });
        setRating(0);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeStars = hoverRating || rating;

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
              <p className="font-poppins text-[13px] font-semibold text-green-800">Thank you!</p>
              <p className="font-poppins text-[12px] text-green-700 mt-0.5">Your review has been submitted.</p>
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

          {/* Interactive star rating */}
          <div>
            <label className={labelClass}>
              Your Rating <span className="text-[#793146]">*</span>
            </label>
            <div className="flex gap-1 mt-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform duration-100 hover:scale-110 focus:outline-none"
                  aria-label={`${star} star`}
                >
                  <Star
                    className="w-7 h-7 transition-colors duration-100"
                    style={{
                      fill:   activeStars >= star ? "#f59e0b" : "none",
                      stroke: activeStars >= star ? "#f59e0b" : "#d1d5db",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name + Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="t-name" className={labelClass}>
                Name <span className="text-[#793146]">*</span>
              </label>
              <input
                id="t-name" name="name" value={formData.name}
                onChange={handleChange} placeholder="Your name"
                required className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="t-email" className={labelClass}>
                Email <span className="text-[#793146]">*</span>
              </label>
              <input
                id="t-email" name="email" type="email" value={formData.email}
                onChange={handleChange} placeholder="you@email.com"
                required className={fieldClass}
              />
            </div>
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="t-comment" className={labelClass}>
              Your Experience <span className="text-[#793146]">*</span>
            </label>
            <textarea
              id="t-comment" name="comment" value={formData.comment}
              onChange={handleChange} rows={4} required
              placeholder="Tell us about your experience at Paramount Diagnostic Lab…"
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
              disabled={isSubmitting || !rating}
              className="px-7 py-2.5 rounded-full text-[13px] font-poppins font-semibold text-white flex items-center gap-2 hover:opacity-90 transition-opacity duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #154565 0%, #793146 100%)" }}
            >
              {isSubmitting ? "Submitting…" : (
                <>Submit Review <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;

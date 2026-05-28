"use client";

import Footer from "@/component/Footer";
import Page from "@/component/Page";
import React, { useState } from "react";
import { CheckCircleIcon, AlertCircleIcon, ShieldCheckIcon, ArrowRight } from "lucide-react";

type FormState = {
  insuranceType: "medicare" | "private";
  accountNumber: string;
  medicareNumber: string;
  dob: string;
  gender: "male" | "female";
  firstName: string;
  lastName: string;
};

const EMPTY: FormState = {
  insuranceType: "medicare",
  accountNumber: "",
  medicareNumber: "",
  dob: "",
  gender: "male",
  firstName: "",
  lastName: "",
};

const fieldClass =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-[13.5px] font-poppins text-[#0d2b45] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154565]/20 focus:border-[#154565] focus:bg-white transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed";

const labelClass =
  "block font-poppins text-[11px] font-semibold tracking-wide text-[#4a6070] uppercase mb-1";

const segBtn = (active: boolean) =>
  `flex-1 py-1.5 rounded-full text-[12.5px] font-poppins font-semibold border transition-all duration-200 ${
    active
      ? "bg-[#154565] text-white border-[#154565]"
      : "bg-white text-[#4a6070] border-gray-300 hover:border-[#154565] hover:text-[#154565]"
  }`;

export default function BillingInsurance() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"" | "success" | "error">("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    if (!form.firstName || !form.lastName || !form.dob || !form.accountNumber) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/billing-insurance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitStatus("success");
        setForm(EMPTY);
      } else {
        setSubmitStatus("error");
        console.error("Error:", result.error);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <section className="relative py-14">
        {/* Page background */}
        <div
          className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0"
          style={{ background: "#f0f4f8" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4">

          {/* Status banners */}
          {submitStatus === "success" && (
            <div className="mb-5 flex items-start gap-3 bg-white border border-green-200 rounded-xl px-4 py-3 shadow-sm">
              <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-poppins text-[13px] font-semibold text-green-800">Submitted successfully!</p>
                <p className="font-poppins text-[12px] text-green-700 mt-0.5">
                  Your insurance information has been updated. We&apos;ll process your request shortly.
                </p>
              </div>
            </div>
          )}
          {submitStatus === "error" && (
            <div className="mb-5 flex items-start gap-3 bg-white border border-red-200 rounded-xl px-4 py-3 shadow-sm">
              <AlertCircleIcon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-poppins text-[13px] font-semibold text-red-800">Submission failed</p>
                <p className="font-poppins text-[12px] text-red-700 mt-0.5">
                  Please check all required fields and try again.
                </p>
              </div>
            </div>
          )}

          {/* Split card */}
          <div
            className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[240px_1fr]"
            style={{ boxShadow: "0 6px 40px rgba(0,0,0,0.11)" }}
          >

            {/* ── Left info panel ── */}
            <div
              className="flex flex-col justify-between p-7"
              style={{
                background: "linear-gradient(160deg, #0d2b45 0%, #154565 55%, #793146 100%)",
              }}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                  <ShieldCheckIcon className="w-5 h-5 text-white" />
                </div>
                <h1 className="font-inter text-[1.35rem] font-bold text-white leading-snug mb-3">
                  Update Billing<br />& Insurance
                </h1>
                <p className="font-poppins text-[12px] text-white/65 leading-relaxed">
                  Keep your records current for accurate billing and seamless laboratory services.
                </p>

                {/* Petri dish illustration */}
                <svg
                  viewBox="0 0 180 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-6 w-full h-16"
                >
                  {/* Dish 1 — larger, left */}
                  <circle cx="44" cy="40" r="36" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />
                  <line x1="8" y1="40" x2="80" y2="40" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8" />
                  <line x1="44" y1="4"  x2="44" y2="76" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8" />
                  {/* cells inside dish 1 */}
                  <circle cx="34" cy="26" r="5.5" stroke="rgba(255,255,255,0.32)" strokeWidth="1" fill="rgba(255,255,255,0.07)" />
                  <circle cx="56" cy="33" r="4"   stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="rgba(255,255,255,0.05)" />
                  <circle cx="30" cy="52" r="3"   fill="rgba(255,255,255,0.18)" />
                  <circle cx="52" cy="54" r="4"   stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                  <circle cx="44" cy="43" r="2.2" fill="rgba(255,255,255,0.24)" />
                  <circle cx="38" cy="36" r="1.5" fill="rgba(255,255,255,0.15)" />

                  {/* Dish 2 — smaller, right, partially clipped */}
                  <circle cx="130" cy="38" r="28" stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" />
                  <line x1="102" y1="38" x2="158" y2="38" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
                  <line x1="130" y1="10" x2="130" y2="66" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
                  {/* cells inside dish 2 */}
                  <circle cx="120" cy="28" r="4"   stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="rgba(255,255,255,0.05)" />
                  <circle cx="138" cy="32" r="2.8" fill="rgba(255,255,255,0.14)" />
                  <circle cx="122" cy="48" r="4.5" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <circle cx="138" cy="48" r="2.5" fill="rgba(255,255,255,0.18)" />
                  <circle cx="131" cy="40" r="1.8" fill="rgba(255,255,255,0.20)" />
                </svg>
              </div>
            </div>

            {/* ── Right form panel ── */}
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 flex flex-col gap-4">

              {/* Insurance Type */}
              <div>
                <label className={labelClass}>Insurance Type</label>
                <div className="flex gap-2">
                  {(["medicare", "private"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, insuranceType: val }))}
                      className={segBtn(form.insuranceType === val)}
                    >
                      {val === "medicare" ? "Medicare" : "All Others"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className={labelClass}>
                    First Name <span className="text-[#793146]">*</span>
                  </label>
                  <input
                    id="firstName" name="firstName" value={form.firstName}
                    onChange={handleInputChange} placeholder="First name"
                    required className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClass}>
                    Last Name <span className="text-[#793146]">*</span>
                  </label>
                  <input
                    id="lastName" name="lastName" value={form.lastName}
                    onChange={handleInputChange} placeholder="Last name"
                    required className={fieldClass}
                  />
                </div>
              </div>

              {/* Account + DOB row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="accountNumber" className={labelClass}>
                    Account No. <span className="text-[#793146]">*</span>
                  </label>
                  <input
                    id="accountNumber" name="accountNumber" value={form.accountNumber}
                    onChange={handleInputChange} placeholder="e.g. 123456"
                    required className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="dob" className={labelClass}>
                    Date of Birth <span className="text-[#793146]">*</span>
                  </label>
                  <input
                    id="dob" name="dob" type="date" value={form.dob}
                    onChange={handleInputChange} required className={fieldClass}
                  />
                </div>
              </div>

              {/* Medicare number */}
              <div>
                <label htmlFor="medicareNumber" className={labelClass}>Medicare Number</label>
                <input
                  id="medicareNumber" name="medicareNumber" value={form.medicareNumber}
                  onChange={handleInputChange} placeholder="Medicare ID"
                  disabled={form.insuranceType !== "medicare"}
                  className={fieldClass}
                />
              </div>

              {/* Gender */}
              <div>
                <label className={labelClass}>Gender</label>
                <div className="flex gap-2">
                  {(["male", "female"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, gender: val }))}
                      className={segBtn(form.gender === val)}
                    >
                      {val === "male" ? "Male" : "Female"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 w-full py-2.5 rounded-full text-[13.5px] font-poppins font-semibold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #154565 0%, #793146 100%)" }}
              >
                {isSubmitting ? "Submitting…" : (
                  <>Submit Request <ArrowRight className="w-4 h-4" /></>
                )}
              </button>

            </form>
          </div>
        </div>
      </section>

      <Footer />
    </Page>
  );
}

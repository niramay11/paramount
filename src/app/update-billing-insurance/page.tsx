"use client";

import Button from "@/component/Button";
import Footer from "@/component/Footer";
import Input from "@/component/Input";
import Page from "@/component/Page";
import Radio from "@/component/Radio";
import React, { useState } from "react";

const BillingInsurance = () => {
  const [form, setForm] = useState({
    insuranceType: "medicare",
    accountNumber: "",
    medicareNumber: "",
    dob: "",
    gender: "male",
    firstName: "",
    lastName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    // Basic validation
    if (!form.firstName || !form.lastName || !form.dob || !form.accountNumber) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/billing-insurance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString()
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form
        setForm({
          insuranceType: "medicare",
          accountNumber: "",
          medicareNumber: "",
          dob: "",
          gender: "male",
          firstName: "",
          lastName: "",
        });
      } else {
        setSubmitStatus("error");
        console.error('Error:', result.error);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      {/* Header */}
      <div className="flex flex-col items-start justify-start my-8 px-4 sm:px-6 lg:px-0">
        <h3 className="font-poppins text-[28px] sm:text-[36px] lg:text-[42px] font-semibold text-black">
          Update My Billing/Insurance Information
        </h3>
        <p className="font-poppins text-sm sm:text-base lg:text-[16px] text-[#707070] font-light mt-2">
          Please Fill Update my Insurance Form.
        </p>
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="mx-auto max-w-5xl px-4 mb-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Your insurance information has been updated successfully!
        </div>
      )}
      {submitStatus === "error" && (
        <div className="mx-auto max-w-5xl px-4 mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          There was an error updating your information. Please check all required fields and try again.
        </div>
      )}

      <section className="mt-12 px-4 sm:px-6 lg:px-0">
        <form onSubmit={handleSubmit} className="w-full max-w-5xl flex flex-col gap-6">
          {/* Insurance Type Radio Buttons */}
          <Radio
            label="Insurance :"
            name="insuranceType"
            options={[
              { label: "MEDICARE", value: "medicare" },
              { label: "ALL OTHERS", value: "private" },
            ]}
            value={form.insuranceType}
            onChange={(value) => handleRadioChange("insuranceType", value)}
          />

          {/* Account Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Account Number"
              id="accountNumber"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleInputChange}
              placeholder="Number"
              required
            />
            <Input
              label="Medicare Number"
              id="medicareNumber"
              name="medicareNumber"
              value={form.medicareNumber}
              onChange={handleInputChange}
              placeholder="Medicare"
              disabled={form.insuranceType !== "medicare"}
            />
            <Input
              label="Date of Birth"
              id="dob"
              name="dob"
              value={form.dob}
              onChange={handleInputChange}
              placeholder="MM/DD/YYYY"
              type="date"
              required
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleInputChange}
              placeholder="First name"
              required
            />
            <Input
              label="Last Name"
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleInputChange}
              placeholder="Last name"
              required
            />
          </div>

          {/* Gender */}
          <Radio
            label="Gender :"
            name="gender"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
            value={form.gender}
            onChange={(value) => handleRadioChange("gender", value)}
          />

          {/* Submit */}
          <div className="flex justify-start">
            <Button 
              type="submit" 
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Now"}
            </Button>
          </div>
        </form>
      </section>

      <Footer />
    </Page>
  );
};

export default BillingInsurance;
"use client"

import React, { useState } from "react";
import Contact_Dr from "../../../public/contact_dr.png";
import Image from "next/image";
import Input from "@/component/Input";
import Textarea from "@/component/Textarea";
import Button from "@/component/Button";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
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
    <section className="flex flex-col-reverse md:flex-row justify-center items-start gap-8 mt-8">
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-start p-4">
        <h3 className="font-poppins text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#154565]">
          Get in Touch
        </h3>
        <p className="font-poppins text-sm sm:text-base lg:text-[16px] text-white font-light mt-2">
          Have a question or ready to book your test? Fill out the form below, and our team will get back to you promptly.
        </p>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Your inquiry has been submitted successfully!
          </div>
        )}
        {submitStatus === "error" && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            There was an error submitting your inquiry. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 w-full flex flex-col gap-8">
          {/* Name Fields */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              label="First Name"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First name"
              darkMode
              required
            />
            <Input
              label="Last Name"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Name"
              darkMode
              required
            />
          </div>

          {/* Email & Phone */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              label="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              type="email"
              darkMode
              required
            />
            <Input
              label="Phone"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              type="tel"
              darkMode
              required
            />
          </div>

          {/* Subject Radio */}
          <div>
            <label className="block mb-2 text-sm font-sora text-white">
              Select Subject? *
            </label>
            <div className="flex flex-wrap gap-4">
              {["general", "test-packages", "help-support", "report"].map(
                (type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 text-sm font-sora text-white"
                  >
                    <input
                      type="radio"
                      name="subject"
                      value={type}
                      checked={formData.subject === type}
                      onChange={handleInputChange}
                      className="accent-[#154565] focus:outline-none"
                      required
                    />
                    {type
                      .replace("-", " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Message */}
          <Textarea
            label="Message"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your message here..."
            rows={6}
            darkMode
            required
          />

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-max px-12" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Inquire Now"}
          </Button>
        </form>
      </div>

      {/* Right Side: Image */}
      <div className="w-full md:w-1/2 p-4 flex justify-center">
        <Image
          width={500}
          height={600}
          src={Contact_Dr}
          alt="contact_dr"
          className="w-full h-auto max-w-[500px]"
        />
      </div>
    </section>
  );
};

export default ContactUs;
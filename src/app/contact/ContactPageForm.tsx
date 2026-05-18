"use client"

import Button from "@/component/Button";
import Input from "@/component/Input";
import Textarea from "@/component/Textarea";
import React, { useState } from "react";

const ContactPageForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | "">("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
          timestamp: new Date().toISOString(),
          subject:"general inquiry"
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          telephone: "",
          email: "",
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
    <div className="w-full lg:w-1/2">
      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Your message has been sent successfully!
        </div>
      )}
      {submitStatus === "error" && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          There was an error sending your message. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="w-full flex flex-col md:flex-row gap-6">
          <Input
            label="First Name"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First name"
            required
          />
          <Input
            label="Last Name"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last name"
            required
          />
        </div>

        <Input
          label="Telephone"
          id="telephone"
          name="telephone"
          value={formData.telephone}
          onChange={handleInputChange}
          placeholder="Telephone"
          type="tel"
          required
        />

        <Input
          label="Email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          type="email"
          required
        />

        <Textarea
          label="How Can We Help?"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="How can we help you?"
          rows={6}
          required
        />

        <Button 
          type="submit" 
          className="w-max px-12" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default ContactPageForm;
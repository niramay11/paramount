"use client";

import Button from "@/component/Button";
import Input from "@/component/Input";
import Textarea from "@/component/Textarea";
import React, { useState } from "react";

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await fetch("/api/testimonial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", comment: "" });
      } else {
        setSubmitStatus("error");
        console.error("Submission failed", result);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full lg:w-1/2 flex flex-col gap-8">
      {/* Status Message */}
      {submitStatus === "success" && (
        <div className="p-3 bg-green-100 text-green-800 border border-green-300 rounded">
          Thank you! Your comment has been submitted.
        </div>
      )}
      {submitStatus === "error" && (
        <div className="p-3 bg-red-100 text-red-800 border border-red-300 rounded">
          Something went wrong. Please try again.
        </div>
      )}

      {/* Name + Email */}
      <div className="w-full flex flex-col md:flex-row gap-8">
        <Input
          label="Name"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Comment */}
      <Textarea
        label="Comment"
        id="comment"
        name="comment"
        placeholder="Your comment here..."
        rows={6}
        value={formData.comment}
        onChange={handleChange}
        required
      />

      {/* Submit Button */}
      <Button className="w-max" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  );
};

export default TestimonialForm;

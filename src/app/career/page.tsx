"use client";

import Button from "@/component/Button";
import Footer from "@/component/Footer";
import Input from "@/component/Input";
import Page from "@/component/Page";
import Select from "@/component/Select";
import CustomFileUpload from "@/component/Upload";
import React, { useState } from "react";

const Positions = [
  { value: "frontend_developer", label: "Frontend Developer" },
  { value: "backend_developer", label: "Backend Developer" },
  { value: "fullstack_developer", label: "Fullstack Developer" },
  { value: "mobile_developer", label: "Mobile Developer" },
  { value: "devops_engineer", label: "DevOps Engineer" },
  { value: "qa_engineer", label: "QA Engineer" },
  { value: "data_engineer", label: "Data Engineer" },
  { value: "data_scientist", label: "Data Scientist" },
  { value: "machine_learning_engineer", label: "Machine Learning Engineer" },
  { value: "ai_engineer", label: "AI Engineer" },
  { value: "cloud_engineer", label: "Cloud Engineer" },
  { value: "security_engineer", label: "Security Engineer" },
  {
    value: "site_reliability_engineer",
    label: "Site Reliability Engineer (SRE)",
  },
  { value: "database_administrator", label: "Database Administrator" },
  { value: "solutions_architect", label: "Solutions Architect" },
  { value: "product_manager", label: "Product Manager" },
  { value: "project_manager", label: "Project Manager" },
  { value: "technical_lead", label: "Technical Lead" },
  { value: "engineering_manager", label: "Engineering Manager" },
  { value: "cto", label: "Chief Technology Officer (CTO)" },
  { value: "ui_ux_designer", label: "UI/UX Designer" },
  { value: "graphic_designer", label: "Graphic Designer" },
  { value: "scrum_master", label: "Scrum Master" },
  { value: "business_analyst", label: "Business Analyst" },
  { value: "systems_analyst", label: "Systems Analyst" },
  { value: "technical_writer", label: "Technical Writer" },
  { value: "support_engineer", label: "Support Engineer" },
  { value: "it_administrator", label: "IT Administrator" },
  { value: "network_engineer", label: "Network Engineer" },
];

const PageComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    cellNumber: "",
    email: "",
    position: "",
    document: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({
      ...prev,
      document: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Create FormData to handle file upload
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("telephone", formData.telephone);
      formDataToSend.append("cellNumber", formData.cellNumber);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("position", formData.position);
      if (formData.document) {
        formDataToSend.append("document", formData.document);
      }
      formDataToSend.append("timestamp", new Date().toISOString());

      const response = await fetch('/api/application', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          telephone: "",
          cellNumber: "",
          email: "",
          position: "",
          document: null,
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
      <div className="flex flex-col items-center justify-center my-8 px-4 sm:px-8 text-center">
        <h3 className="font-poppins text-[28px] sm:text-[36px] lg:text-[42px] font-semibold text-black leading-snug">
          Apply with us now!
        </h3>
        <p className="font-poppins text-sm sm:text-base lg:text-[16px] text-[#707070] font-light mt-4 max-w-2xl">
          If you are interested in becoming a part of our healthcare staff, we
          have various open positions for you!
        </p>
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="mx-auto max-w-4xl px-4 sm:px-8 lg:px-32 mb-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Your application has been submitted successfully!
        </div>
      )}
      {submitStatus === "error" && (
        <div className="mx-auto max-w-4xl px-4 sm:px-8 lg:px-32 mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          There was an error submitting your application. Please try again.
        </div>
      )}

      {/* Form Section */}
      <section className="px-4 sm:px-8 lg:px-32 py-8">
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto flex flex-col gap-6">
          {/* First and Last Name */}
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

          {/* Contact Information */}
          <div className="w-full flex flex-col md:flex-row gap-6">
            <Input
              label="Telephone"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              placeholder="Telephone"
              type="tel"
            />
            <Input
              label="Cell Number"
              id="cellNumber"
              name="cellNumber"
              value={formData.cellNumber}
              onChange={handleInputChange}
              placeholder="Cell number"
              type="tel"
              required
            />
          </div>

          {/* Email and Position */}
          <div className="w-full flex flex-col md:flex-row gap-6">
            <Input
              label="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              type="email"
              required
            />
            <Select
              id="position"
              name="position"
              label="Position Applied For"
              value={formData.position}
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                position: e
              }))}
              options={Positions}
              required
            />
          </div>

          {/* Upload Resume */}
          <CustomFileUpload
            id="document"
            name="document"
            label="Upload Resume/CV"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
          />

          {/* Submit Button */}
          <div className="flex justify-start">
            <Button 
              type="submit" 
              className="w-max px-12" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </section>

      <Footer />
    </Page>
  );
};

export default PageComponent;
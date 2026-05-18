import React from "react";
import LabPeople from "../../../public/lab_people.png";
import Image from "next/image";

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        {/* Left Column - Heading */}
        <div className="lg:w-1/2">
          <h2 className="font-poppins text-[#793146] font-semibold text-3xl sm:text-4xl lg:text-5xl mb-6">
            Why Choose Paramount Diagnostic Lab
          </h2>
          <p className="font-poppins text-black text-sm sm:text-base leading-7 mb-4">
            Choosing the right diagnostic lab impacts patient care. Paramount
            Diagnostic Lab combines expertise, advanced technology, and
            regulatory compliance to deliver reliable results.
          </p>
          <p className="font-poppins text-black text-sm sm:text-base leading-7 mb-4">
            Our CLIA certification and New Jersey licensing ensure the highest
            standards, while our local presence allows faster turnaround times
            and personalized support.
          </p>
          <p className="font-poppins text-black text-sm sm:text-base leading-7">
            Quality is at the core of our operations, with strict controls,
            proficiency testing, and regular inspections, giving healthcare
            providers confidence in every result.
          </p>
        </div>

        {/* Right Column - Optional image or illustration */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <Image
            src={LabPeople}
            alt="Why Choose Us Illustration"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

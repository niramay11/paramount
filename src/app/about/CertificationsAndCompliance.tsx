import React from "react";
import Certification from "../../../public/Certification-compliance.png"
import Image from "next/image";

const CertificationsAndCompliance = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container mx-auto flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-start">
        {/* Left Column - Text */}
        <div className="lg:w-1/2">
          <h2 className="font-poppins text-[#793146] font-semibold text-3xl sm:text-4xl lg:text-5xl mb-6">
            Certifications and Compliance
          </h2>
          <p className="font-poppins text-black text-sm sm:text-base leading-7 mb-4">
            Paramount Diagnostic Lab maintains all required certifications and licenses to operate as a clinical laboratory in New Jersey. We are fully CLIA certified and comply with all New Jersey Department of Health regulations for clinical laboratories.
          </p>
          <p className="font-poppins text-black text-sm sm:text-base leading-7 mb-4">
            Our facility meets the updated 2025 regulatory requirements, including enhanced personnel qualifications and quality monitoring standards. We participate in regular proficiency testing programs and maintain documentation of all quality control measures.
          </p>
          <p className="font-poppins text-black text-sm sm:text-base leading-7">
            Compliance with federal and state regulations ensures healthcare providers can rely on our results for patient care decisions and insurance reimbursement.
          </p>
        </div>

        {/* Right Column - Optional Image */}
        <div className="lg:w-1/2 flex justify-center lg:justify-start">
          <Image
            src={Certification}
            alt="Certifications Illustration"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default CertificationsAndCompliance;

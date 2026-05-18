import Image from "next/image";
import React from "react";
import OurMissionImg from "../../../public/about_scientist.png";
import ChartArrow from "@/assets/ChartArrow";

const OurMission = () => {
  return (
    <section className="py-16 flex flex-col-reverse lg:flex-row items-center gap-24 lg:gap-28">
      {/* Left Content */}
      <div className="w-full lg:w-1/2">
        <h2 className="font-poppins text-[#793146] font-semibold text-3xl sm:text-4xl mb-4">
          Our Mission: Precision, Care, and Community
        </h2>
        <p className="font-poppins text-black text-sm sm:text-base leading-7">
          At Paramount Diagnostic Lab, we go beyond testing — we partner in each
          patient’s healthcare journey. Guided by precision and compassion, we
          combine advanced technology with personalized care to deliver results
          you can trust. Our team continually innovates to stay at the forefront
          of diagnostic excellence while staying deeply connected to the
          community we serve, ensuring faster, reliable, and patient-centered
          care across New Jersey.
        </p>
      </div>

      {/* Right Image with Chart Label */}
      <div className="w-full lg:w-1/2 relative">
        <Image
          className="w-full h-auto rounded-lg object-cover"
          src={OurMissionImg}
          alt="Our Mission"
          priority
        />

        <span className="scientist_circle absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-[-50%] top-[100%] translate-y-[-50%] bg-[#154565] p-6 w-[250px] rounded-2xl text-white shadow-lg">
          <p className="font-poppins font-semibold text-3xl">60%</p>
          <span className="flex items-center gap-2 mt-2">
            <p className="font-poppins text-sm font-light">
              Global management are women
            </p>
            <ChartArrow />
          </span>
        </span>
      </div>
    </section>
  );
};

export default OurMission;

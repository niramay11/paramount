"use client";

import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

const MeetTheTeam = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  // Temporarily empty to hide member accordions
  const teamMembers: any[] = [];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-12 md:py-20 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 w-screen right-1/2 translate-x-[50%] h-full z-0">
        <div
          className="w-1/2 h-full bg-cover bg-center"
          style={{ backgroundImage: 'url("/molecular-structure_2.png")' }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto">
        <div className="flex justify-center flex-col-reverse lg:flex-row gap-8 lg:gap-12 relative z-10">
          {/* Left Column - Team Members */}
          {teamMembers.length > 0 && (
            <div className="lg:w-1/2">
              {teamMembers.map((member, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={index}
                    className={`transition-all duration-300 ease-in-out overflow-hidden 
                      ${isActive ? "bg-[#793146] text-white" : "bg-[#e1e2d9] text-black"}`}
                  >
                    <div
                      className="flex items-center justify-between p-4 md:p-6 cursor-pointer"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h3 className="font-poppins font-semibold text-lg md:text-xl">
                        {member.name}
                      </h3>
                      <PlusIcon
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isActive ? "rotate-45" : "rotate-0"
                        }`}
                      />
                    </div>

                    <div
                      className={`px-4 md:px-6 grid transition-all duration-500 ease-in-out ${
                        isActive
                          ? "grid-rows-[1fr] opacity-100 max-h-[500px] py-4 md:py-6"
                          : "grid-rows-[0fr] opacity-0 max-h-0 py-0"
                      } overflow-hidden`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-poppins font-light text-sm md:text-base">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Right Column - Content */}
          <div className="lg:w-1/2 lg:pl-8 flex flex-col justify-center">
            <h3 className="font-poppins text-[#793146] font-semibold text-2xl sm:text-3xl md:text-4xl">
              Our Team: Expertise You Can Trust
            </h3>
            <p className="text-black leading-7 font-poppins mt-4 text-sm sm:text-base">
              The foundation of our success lies in our exceptional team of
              licensed medical technologists and healthcare professionals. Led
              by an experienced laboratory director, our operations meet the
              highest professional standards. Each member upholds rigorous
              quality protocols and stays updated with the latest advancements
              in laboratory science.
            </p>
            <p className="text-black leading-7 font-poppins mt-4 text-sm sm:text-base">
              Our culture of precision and collaboration ensures accuracy in
              every result. Beyond technical expertise, our professionals work
              closely with healthcare providers to interpret complex findings
              and recommend appropriate testing protocols — building trust
              through reliability, knowledge, and care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;

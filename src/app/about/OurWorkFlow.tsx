import { CalendarRange } from "lucide-react";
import React from "react";

const OurWorkFlow = () => {
  const steps = [
    {
      title: "Booking Test Online",
      description: "Schedule your lab test any time, from any device.",
    },
    {
      title: "Sample Collection",
      description: "Home sample collection at your convenience.",
    },
    {
      title: "Lab Processing",
      description: "High-standard equipment ensures accurate testing.",
    },
    {
      title: "Report Generation",
      description: "Get digital reports within 24 hours.",
    },
    {
      title: "Consultation",
      description: "Discuss results with certified professionals.",
    },
  ];

  return (
    <section className="relative py-16">
      {/* Title and Description */}
      <div className="text-center max-w-3xl mx-auto z-10 relative">
        <h3 className="font-poppins text-[#793146] font-semibold text-2xl sm:text-3xl md:text-4xl">
          Our Work Flow
        </h3>
        <p className="text-black mt-4 text-sm sm:text-base leading-relaxed font-poppins">
          Paramount Diagnostic Lab is a trusted name in accurate, affordable,
          and timely diagnostic testing. With NABL-accredited technology and
          expert pathologists,
        </p>
      </div>

      {/* Background */}
      <div className="absolute inset-0 w-screen left-0 translate-x-[-10%] -rotate-6 h-full z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url("/dna.png")' }}
        />
      </div>

      {/* Steps */}
      <div className="relative z-10 mt-16 flex flex-wrap justify-center md:justify-between  gap-12">
        {steps.slice(0,3).map((step, index) => (
          <div
            key={index}
            className="rounded-full scientist_circle text-white flex justify-center items-center flex-col gap-3 w-[220px] h-[220px] md:w-[250px] md:h-[250px] text-center shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <CalendarRange size={32} />
            <h4 className="font-semibold font-poppins text-lg sm:text-xl">
              {step.title}
            </h4>
            <p className="text-sm font-light max-w-[80%] mx-auto font-poppins">
              {step.description}
            </p>
          </div>
        ))}
      </div>
      <div className="relative z-10 mt-16 flex flex-wrap justify-center md:justify-around gap-12 ">
        {steps.slice(3,5).map((step, index) => (
          <div
            key={index}
            className="rounded-full scientist_circle text-white flex justify-center items-center flex-col gap-3 w-[220px] h-[220px] md:w-[250px] md:h-[250px] text-center shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <CalendarRange size={32} />
            <h4 className="font-semibold font-poppins text-lg sm:text-xl">
              {step.title}
            </h4>
            <p className="text-sm font-light max-w-[80%] mx-auto font-poppins">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurWorkFlow;

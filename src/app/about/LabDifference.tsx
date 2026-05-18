import Image from "next/image";
import React from "react";
import Vector from "../../../public/Vector.png";

const LabDifference = () => {
  const List = [
    {
      title: "Efficacy",
      description:
        "Paramount Diagnostic Lab is a trusted name in accurate, affordable, and timely diagnostic testing.",
    },
    {
      title: "Accuracy",
      description:
        "Our testing processes follow strict quality standards ensuring dependable results every time.",
    },
    {
      title: "Innovation",
      description:
        "We utilize modern tools and AI-driven systems for efficient, tech-forward diagnostics.",
    },
  ];

  return (
    <section className="relative w-full py-28">
      {/* Backgrounds */}
      <div className="absolute inset-0 w-screen left-1/2 translate-x-[-50%] h-full z-0">
        <div
          className="w-1/3 h-full bg-cover bg-center"
          style={{ backgroundImage: 'url("/molecular-structure.png")' }}
        />
      </div>
      <div className="absolute inset-0 w-screen right-1/2 translate-x-[50%] h-full z-0">
        <div
          className="w-1/2 h-full bg-cover bg-center"
          style={{ backgroundImage: 'url("/molecular-structure_2.png")' }}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column */}
        <div className="lg:w-1/2 border-b lg:border-b-0 lg:border-r lg:pr-12">
          <h3 className="font-poppins text-[#793146] font-semibold text-3xl sm:text-4xl">
            Paramount Lab Difference
          </h3>
          <p className="text-black leading-7 font-poppins mt-4 text-sm sm:text-base">
            Paramount Diagnostic Lab is a trusted name in accurate, affordable,
            and timely diagnostic testing. With NABL-accredited processes,
            reliable reporting, and advanced infrastructure, we consistently
            deliver healthcare excellence.
          </p>
        </div>

        {/* Right Column */}
        <ul className="lg:w-1/2 space-y-6">
          {List.map((item, index) => (
            <li key={index} className="flex items-start gap-4">
              <Image
                src={Vector}
                alt={`Icon ${index + 1}`}
                className="w-6 h-6 mt-1"
              />
              <div>
                <h4 className="font-poppins text-[#793146] font-semibold text-xl sm:text-2xl">
                  {item.title}
                </h4>
                <p className="font-poppins text-sm sm:text-base text-black mt-1 leading-6">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LabDifference;

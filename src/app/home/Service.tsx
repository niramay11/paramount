import Womenblack from "@/assets/WomenBlack";
import DnaIcon from "@/assets/DnaIcon";
import CovidIcon from "@/assets/CovidIcon";
import FlowCyto from "@/assets/FlowCytoIcon";
import PodiatryIcon from "@/assets/PodiatryIcon";
import ToxicologyIcon from "@/assets/ToxicologyIcon";
import React from "react";

const Service = () => {
  const services = [
    {
      icon: Womenblack,
      title: "Women’s Health",
      description:
        "Comprehensive health services focused on reproductive health, gynaecological care, and wellness throughout all stages of a woman's life.",
    },
    {
      icon: DnaIcon,
      title: "Routine Blood Tests",
      description:
        "Fast and reliable blood work for monitoring overall health, managing chronic conditions, and preventive care.",
    },
    {
      icon: CovidIcon,
      title: "Covid-19 Tests",
      description:
        "Accurate and timely RT-PCR and antigen testing to ensure your safety and peace of mind.",
    },
    {
      icon: FlowCyto,
      title: "Flow Cytometry",
      description:
        "Advanced cell analysis for complex diagnostics in hematology and immunology.",
    },
    {
      icon: PodiatryIcon,
      title: "Podiatry",
      description:
        "Supporting podiatric care with precise, reliable, and comprehensive lab diagnostics.",
    },
    {
      icon: ToxicologyIcon,
      title: "Toxicology",
      description:
        "Ensuring safety through precise toxicology testing. That detects, analyse, and protects every step.",
    },
  ];

  return (
    <section className="px-4 sm:px-8 lg:px-[10%] py-12">
      {/* Section Heading */}
      <div className="w-full flex flex-col items-center gap-4 text-center">
        <h3 className="font-poppins text-3xl sm:text-4xl lg:text-5xl text-[#154565] font-semibold">
          Our Diagnostic Services
        </h3>
        <p className="font-poppins text-base sm:text-lg text-[#154565] max-w-3xl">
          From routine check-ups to specialized testing, our accredited lab is equipped to meet all your health needs with precision and care.
        </p>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="rounded-2xl group bg-white hover:bg-gradient-to-b from-[#154565] to-[#793146] flex flex-col items-center justify-start gap-4 p-6 shadow-lg transition-all duration-300"
          >
            {React.createElement(service.icon, {
              className:
                "w-24 h-24 text-[#154565] group-hover:[&>*]:fill-white transition-colors duration-300",
            })}

            <h3 className="font-poppins text-xl sm:text-2xl font-semibold text-[#151516] group-hover:text-white text-center">
              {service.title}
            </h3>
            <p className="font-poppins font-light text-sm sm:text-base text-center text-[#151516] group-hover:text-white">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;

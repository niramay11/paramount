'use client'

import Image from "next/image";
import Scientist from "../../../public/scientist.png";
import Button from "@/component/Button";
import { ArrowUpRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter()
  const services = [
    {
      title: "Pay Your Bill",
      description: "Settle your payments online securely and effortlessly.",
      button: "Pay Now",
      path: "/",
    },
    {
      title: "Test Dictionary",
      description:
        "Explore our comprehensive list of available diagnostic tests.",
      button: "Explore",
      path: "/test-dictionary",
    },
    {
      title: "PSC Location",
      description: "Locate a patient service centre conveniently near you .",
      button: "Find Now",
      path: "/contact",
    },
    {
      title: "Lab Form",
      description: "Locate the right lab form in just a few clicks.",
      button: "Search",
      path: "/laboratory-forms",
    },
  ];

  return (
    <section className="py-12 relative">
      {/* Background */}
      <div className="absolute inset-0 w-screen left-1/2 translate-x-[-50%] h-full z-0">
        <div
          className="w-screen h-full bg-cover bg-center max-w-[1920px] mx-auto"
          style={{ backgroundImage: 'url("/dna_banner.png")' }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0">
        {/* Text */}
        <div className="mt-12 lg:mt-[150px] w-full lg:w-1/2 text-center lg:text-left">
          {/* Unified Title Block */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:whitespace-nowrap lg:text-6xl font-inter font-semibold text-[#1F4362] leading-tight">
              Next-Level Lab Care
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-inter font-normal text-[#154565]">
              For Today's Health
            </h2>
          </div>

          {/* Clean Description */}
          <p className="mt-8 text-xl text-gray-600 leading-relaxed font-light">
            State of the art technology that meets certified expertise for
            unwavering diagnostic reliability at Paramount.
          </p>
        </div>

        {/* Scientist Image */}
        <div className="relative w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] mx-auto lg:mx-0">
          <span className="block w-full h-full rounded-full scientist_circle" />
          <Image
            className="absolute top-4 left-1/2 -translate-x-1/2 object-cover"
            src={Scientist}
            alt="scientist"
            width={700}
            height={700}
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="relative z-10 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="group rounded-2xl h-max md:h-[110%] flex flex-col justify-between p-6 bg-white hover:bg-gradient-to-b from-[#154565] to-[#999999] hover:shadow-xl transition-shadow duration-300"
          >
            <div>
              <h2 className="font-semibold font-poppins text-xl sm:text-2xl text-[#154565] group-hover:text-white mb-2">
                {service.title}
              </h2>
              <p className="font-light font-poppins text-sm text-[#494949] group-hover:text-white mb-6">
                {service.description}
              </p>
            </div>
            <Button className="text-center" onClick={()=>router.push(service.path)} >
              <ArrowUpRightIcon className="text-lg" />
              {service.button}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;

import Page from "@/component/Page";
import Image from "next/image";
import React from "react";
import { ArrowRightIcon } from "lucide-react";
import Footer from "@/component/Footer";
import WomenHealth from "../../assets/Women's Health.jpg"
import MolecularTest from "../../assets/Molecular Testing.jpg"
import Podiatry from "../../assets/Podiatry.jpg"
import Chemistry from "../../assets/Chemistry.jpg"
import Immunoassay from "../../assets/Immunoassay.jpg"
import Pathology from "../../assets/Pathology.jpg"
import Toxicology from "../../assets/Toxicology.jpg"
import Biopsy from "../../assets/Biopsy.jpg"
import WoundCare from "../../assets/Wound Care.jpg"
import StoolTest from "../../assets/Stool Testing.jpg"
import Covid from "../../assets/Covid 19.jpg"
import RPP from "../../assets/Rpp.jpg"
import Button from "@/component/Button";

const page = () => {
  const Services = [
    {
      title: "Women's Health",
      description: "Comprehensive testing designed to support women's wellness, fertility, and hormonal balance at every stage of life.",
      image: WomenHealth,
    },
    {
      title: "Molecular Testing",
      description: "Advanced molecular diagnostics for accurate and early detection of infectious and genetic diseases.",
      image: MolecularTest,
    },
    {
      title: "Podiatry",
      description: "Specialized lab testing to diagnose nail, skin, and foot infections for effective podiatric care.",
      image: Podiatry,
    },
    {
      title: "Chemistry",
      description: "Precise biochemical analysis to assess organ function, monitor chronic conditions, and detect early disease markers.",
      image: Chemistry,
    },
    {
      title: "Immunoassay",
      description: "Highly sensitive assays for hormone levels, tumor markers, and infectious diseases to aid in timely diagnosis.",
      image: Immunoassay,
    },
    {
      title: "Pathology",
      description: "Expert tissue and cytology evaluations providing critical insights for accurate diagnosis and treatment planning.",
      image: Pathology,
    },
    {
      title: "Toxicology",
      description: "Reliable drug screening and confirmation testing ensuring accurate, fast, and defensible results.",
      image: Toxicology,
    },
    {
      title: "Biopsy",
      description: "Comprehensive tissue analysis performed by skilled pathologists for early and precise disease detection.",
      image: Biopsy,
    },
    {
      title: "Wound Care",
      description: "Advanced wound culture and sensitivity testing to identify pathogens and guide targeted treatment.",
      image: WoundCare,
    },
    {
      title: "Stool Testing",
      description: "Accurate analysis to detect infections, parasites, and gastrointestinal disorders for optimal digestive health.",
      image: StoolTest,
    },
    {
      title: "COVID-19 (Swab)",
      description: "Rapid and reliable RT-PCR and antigen testing to detect active COVID-19 infection with high accuracy.",
      image: Covid,
    },
    {
      title: "RPP (Respiratory Pathogen Panel)",
      description: "Comprehensive molecular testing to identify multiple respiratory pathogens—including flu, RSV, and COVID-19—in a single test.",
      image: RPP,
    },
  ];

  return (
    <Page className="mt-16 px-4 sm:px-6 lg:px-[10%]">
      {/* Header Section */}
      <section className="flex justify-center text-center">
        <div className="max-w-screen-md">
          <h3 className="font-poppins font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#154565]">
            Our Services
          </h3>
          <p className="font-poppins font-semibold text-xl sm:text-2xl mt-6 text-[#1F4362]">
            Precision. Excellence. Trust in Every Test
          </p>
          <p className="text-[#707070] font-poppins font-light mt-2 px-2">
            At Paramount Diagnostic Lab, we combine advanced medical technology with expert diagnostic precision to deliver results you can trust.
            Our commitment to excellence ensures every test is conducted with the highest standards of accuracy, reliability, and care.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {Services.map((service, index) => (
          <div
            key={index}
            className="rounded-2xl max-h-max overflow-hidden group shadow-lg transition-all duration-300 hover:shadow-2xl"
          >
            <Image
              src={service.image}
              alt={service.title}
              className="w-full h-[250px] object-cover"
            />
            <div className="border border-[#B9B9B9] border-t-0 px-4 py-4 group-hover:bg-black transition-colors duration-300 rounded-b-2xl">
              <div className="flex flex-col gap-2">
                <p className="font-poppins text-xl font-semibold group-hover:text-white text-[#1F4362]">
                  {service.title}
                </p>
                <p className="font-poppins text-sm font-light group-hover:text-white text-[#707070]">
                  {service.description}
                </p>
              </div>
              <div className="w-12 cursor-pointer h-12 mt-4 rounded-full bg-[linear-gradient(180deg,_rgb(21,69,101),_rgb(121,49,70)_100%)] flex items-center justify-center group-hover:bg-white group-hover:bg-none transition">
                <ArrowRightIcon className="text-white group-hover:text-[#154565]" />
              </div>
            </div>
          </div>
        ))}
      </section>

   
      <Footer/>
    </Page>
  );
};

export default page;
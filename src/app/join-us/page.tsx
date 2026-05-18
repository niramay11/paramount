import Page from "@/component/Page";
import Image from "next/image";
import React from "react";
import CareerPeople from "../../../public/career_people.png"; // You'll need to add this image
import Footer from "@/component/Footer";
import {
  BriefcaseIcon,
  ClockIcon,
  DollarSignIcon,
  HeartIcon,
  UsersIcon,
} from "lucide-react";
import ContactPageForm from "../contact/ContactPageForm";

const page = () => {
  return (
    <Page>
      {/* Benefits Section */}
      <section className="mt-20">
        <div className="text-center mb-12">
          <h3 className="font-poppins text-2xl sm:text-3xl font-semibold text-[#154565] mb-4">
             Why Join Us?
          </h3>
          <p className="font-poppins text-gray-600 max-w-2xl mx-auto">
            Discover what sets us apart and makes us the right choice for your
            needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <BenefitItem
            icon={<DollarSignIcon size={24} />}
            title="Cost Effective"
            description="Get the best value for your investment with our competitive pricing."
          />
          <BenefitItem
            icon={<HeartIcon size={24} />}
            title="Quality Assured"
            description="We maintain the highest standards of quality in everything we do."
          />
          <BenefitItem
            icon={<ClockIcon size={24} />}
            title="Time Efficient"
            description="Quick and reliable service that respects your time and schedule."
          />
          <BenefitItem
            icon={<UsersIcon size={24} />}
            title="Expert Support"
            description="Access to knowledgeable professionals who understand your needs."
          />
        </div>
      </section>

      {/* Header */}
      <div className="flex flex-col items-start justify-start my-8 mt-30">
        <h3 className="font-poppins text-[28px] sm:text-[36px] lg:text-[42px] font-semibold text-black">
          Join Our Team
        </h3>
        <p className="font-poppins text-sm sm:text-base lg:text-[16px] text-[#707070] font-light mt-2">
          Submit your application and we'll get back to you soon
        </p>
      </div>

      {/* Main Section */}
      <section className="flex flex-col lg:flex-row items-start w-full mt-8">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 mr-12 flex justify-start">
          <Image
            src={CareerPeople}
            alt="Career People"
            width={1000}
            height={1000}
            className="w-full rounded-2xl object-contain self-start max-h-[650px]"
          />
        </div>

        {/* Right Form */}
        <ContactPageForm />
      </section>

      <Footer />
    </Page>
  );
};

// Reusable benefit item component
const BenefitItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md transition-all">
      <div className="flex justify-center mb-4">
        <span className="flex items-center justify-center w-16 h-16 bg-[#2D4764] rounded-full text-white">
          {icon}
        </span>
      </div>
      <h4 className="font-poppins text-lg font-semibold text-[#154565] mb-2">
        {title}
      </h4>
      <p className="font-poppins text-sm text-gray-600">{description}</p>
    </div>
  );
};

// Reusable job position component
const JobPosition = ({
  title,
  department,
  type,
  location,
  experience,
}: {
  title: string;
  department: string;
  type: string;
  location: string;
  experience: string;
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-[#154565] hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-poppins text-lg font-semibold text-[#154565]">
          {title}
        </h4>
        <span className="bg-[#154565] text-white text-xs px-3 py-1 rounded-full">
          {type}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <BriefcaseIcon size={16} className="mr-2" />
          <span>{department}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <UsersIcon size={16} className="mr-2" />
          <span>{location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <ClockIcon size={16} className="mr-2" />
          <span>Experience: {experience}</span>
        </div>
      </div>

      <button className="w-full mt-4 bg-[#154565] text-white py-2 rounded-lg hover:bg-[#1e5b7b] transition-colors font-poppins font-semibold">
        Apply Now
      </button>
    </div>
  );
};

export default page;

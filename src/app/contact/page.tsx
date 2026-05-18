import Page from "@/component/Page";
import Image from "next/image";
import React from "react";
import SupportPeople from "../../../public/support_people.png";
import Footer from "@/component/Footer";
import {
  GlobeIcon,
  HomeIcon,
  MailIcon,
  PhoneIcon,
  PrinterIcon,
} from "lucide-react";
import ContactPageForm from "./ContactPageForm";

const page = () => {
  return (
    <Page>
      <section className="py-16 flex flex-col lg:flex-row-reverse items-center gap-24 lg:gap-28">
        {/* Left Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="font-poppins text-[#154565] font-semibold text-3xl sm:text-4xl mb-4">
            Your Pickup Location: Your one and only destination
          </h2>
          <h4 className="font-poppins text-gray-500 font-semibold text-2xl sm:text-xl mb-4">
            Book Your Pick Up Now: For Healthcare Support
          </h4>
          <p className="font-poppins text-black text-sm sm:text-base leading-7">
            The hospital is an integral part of comprehensive perfect
            healthcare. The hospital is an integral: Your health and convenience
            are our top priorities, Schedule Your Lab Test Now
          </p>
        </div>

        {/* Right Image with Map */}
        <div className="w-full lg:w-1/2 relative">
          <div className="w-full h-80 lg:h-96 rounded-3xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.2583999999996!2d-74.37738892427344!3d40.43110497143658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3e2b61d9c1a0b%3A0x8c1f5b8a8e8e8e8e!2s2177%20Oak%20Tree%20Rd%2C%20Edison%2C%20NJ%2008820!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Paramount Diagnostic Lab Location - 2177 Oak Tree Rd, Edison, NJ"
              className="rounded-lg"
            />
          </div>

          {/* Optional: Map Label/Overlay */}
          <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md">
            <p className="font-poppins text-sm font-semibold text-[#154565]">
              Our Location
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="mt-20">
        <div className="flex justify-between items-center">
          <ContactItem
            icon={<HomeIcon />}
            text="2177 Oak Tree Rd, STE 208, Edison, NJ 08820-1082"
          />
          <ContactItem
            icon={<MailIcon />}
            text="info@myparamountlab.com"
            isLink
            linkType="email"
          />
        </div>

        <div className="flex justify-around mt-8">
          <ContactItem
            icon={<PhoneIcon />}
            text="908-834-8034"
            isLink
            linkType="tel"
          />
          <ContactItem icon={<PrinterIcon />} text="908-251-5037" />
          <ContactItem
            icon={<GlobeIcon />}
            text="www.myparamountlab.com"
            isLink
            linkType="url"
          />
        </div>
      </section>
      {/* Header */}
      <div className="flex flex-col items-start justify-start my-8 mt-30">
        <h3 className="font-poppins text-[28px] sm:text-[36px] lg:text-[42px] font-semibold text-black">
          Need Support?
        </h3>
        <p className="font-poppins text-sm sm:text-base lg:text-[16px] text-[#707070] font-light mt-2">
          Fill in the form to get in touch
        </p>
      </div>

      {/* Main Section */}
      <section className="flex flex-col lg:flex-row items-start w-full mt-8">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 flex justify-start">
          <Image
            src={SupportPeople}
            alt="Support People"
            width={1000}
            height={1000}
            className="w-full max-w-[500px] object-contain self-start max-h-[650px]"
          />
        </div>

        {/* Right Form */}
        <ContactPageForm />
      </section>

      <Footer />
    </Page>
  );
};

// Reusable contact item component
const ContactItem = ({
  icon,
  text,
  isLink = false,
  linkType,
}: {
  icon: React.ReactNode;
  text: string;
  isLink?: boolean;
  linkType?: "email" | "tel" | "url";
}) => {
  let href = "#";
  if (linkType === "email") href = `mailto:${text}`;
  else if (linkType === "tel") href = `tel:${text}`;
  else if (linkType === "url")
    href = `https://${text.replace(/^https?:\/\//, "")}`;

  const content = (
    <span className="flex items-center justify-start text-base sm:text-lg lg:text-xl font-sora text-[#6D6E71] hover:text-[#2D4764] transition-colors">
      <span className="flex items-center justify-center w-10 h-10 bg-[#2D4764] hover:bg-[#1b324a] rounded-full text-white mr-3 transition-colors">
        {icon}
      </span>
      {text}
    </span>
  );

  return isLink ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
};

export default page;

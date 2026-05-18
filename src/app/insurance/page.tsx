"use client";

import Page from "@/component/Page";
import Image from "next/image";
import React from "react";
import Company_1 from "../../../public/company_1.png";
import Company_2 from "../../../public/company_2.png";
import Company_3 from "../../../public/company_3.png";
import Company_4 from "../../../public/company_4.png";
import Company_5 from "../../../public/company_5.png";
import Company_6 from "../../../public/company_6.png";
import Footer from "@/component/Footer";
import { ArrowDown, MailIcon, PhoneIcon } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Button from "@/component/Button";

const page = () => {
  return (
    <Page>
      {/* Header */}
      <div className="flex flex-col items-center justify-center my-8 px-4 sm:px-8">
        <h3 className="font-poppins text-[28px] sm:text-[36px] text-center lg:text-[42px] font-semibold text-black leading-snug">
          Your Trusted Partner <br /> in Diagnostic Care
        </h3>
        <p className="font-poppins text-sm sm:text-base lg:text-[16px] text-center text-[#707070] font-semibold mt-4 max-w-3xl">
          Maximize Your Healthcare Benefits with Paramount Diagnostic Lab
        </p>
        <p className="font-poppins text-sm sm:text-base lg:text-[16px] text-center text-[#707070] font-light mt-4 max-w-3xl">
          At Paramount Diagnostic Lab, we believe that world-class diagnostic
          testing should be accessible and affordable. We are committed to
          convenience and cost-effectiveness while providing the reliable,
          technology-driven testing services you need for accurate diagnosis and
          treatment planning.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center my-8 px-4 sm:px-8">
        <h4 className="font-poppins text-sm sm:text-base lg:text-[24px] text-center text-black font-semibold mt-4 max-w-3xl px-4 sm:px-8 leading-relaxed">
          We Accept Your Insurance!
        </h4>
        <p className="font-poppins text-sm sm:text-base lg:text-[16px] text-center text-[#707070] font-light max-w-3xl px-4 sm:px-8 mt-2 leading-relaxed">
          We are continuously expanding our network to serve more patients. If
          you don't see your provider listed below, please contact us, we're
          here to help!
        </p>
      </div>

      {/* Carousel */}
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="py-4"
        >
          {[
            Company_1,
            Company_4,
            Company_3,
            Company_5,
            Company_2,
            Company_6,
            Company_1,
            Company_4,
            Company_3,
            Company_5,
            Company_2,
            Company_6,
          ].map((logo, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center h-[120px]"
            >
              <Image
                src={logo}
                alt={`Company ${index + 1}`}
                width={100}
                height={100}
                className="object-contain w-auto h-[80px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Insurance Lists */}
      <section className="my-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Featured National and Regional Partners */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h4 className="font-poppins text-[22px] sm:text-[26px] font-semibold text-black mb-3">
                Featured National and Regional Partners
              </h4>
              <p className="font-poppins text-sm sm:text-base text-[#707070] font-light max-w-2xl mx-auto">
                We are proud to be in-network with many of the nation's leading
                health plans
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  "United Healthcare",
                  "BlueCross BlueShield",
                  "AETNA",
                  "Cigna Healthcare",
                  "OXFORD HEALTH PLANS",
                  "Amerigroup",
                  "WellCare Health Plans",
                ].map((provider, index) => (
                  <div key={index} className="flex items-center py-2">
                    <div className="w-2 h-2 bg-[#1F4362] rounded-full mr-3"></div>
                    <span className="font-poppins text-sm text-[#575757] font-medium">
                      {provider}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Specialty & Network Plans */}
          <div>
            <div className="text-center mb-8">
              <h4 className="font-poppins text-[22px] sm:text-[26px] font-semibold text-black mb-3">
                Specialty & Network Plans
              </h4>
              <p className="font-poppins text-sm sm:text-base text-[#707070] font-light max-w-2xl mx-auto">
                We also work with the following specialized and local networks
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "1199 FUND OFFICE",
                  "ACPN",
                  "AMERICAN CHOICE HEALTHCARE'S ACO REACH",
                  "ANCILLARY",
                  "BCBS OF CONNECTICUT - PPO ONLY PRODUCT",
                ].map((provider, index) => (
                  <div key={index} className="flex items-start py-2">
                    <div className="w-2 h-2 bg-[#2C6B9E] rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="font-poppins text-sm text-[#575757] font-medium leading-relaxed">
                      {provider}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Insurance Process Section */}
      <section className="my-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h3 className="font-poppins text-[28px] sm:text-[36px] font-semibold text-black leading-snug">
              Getting Your Testing Covered: Simple Steps
            </h3>
            <p className="font-poppins text-sm sm:text-base lg:text-[16px] text-[#707070] font-light mt-4 max-w-2xl mx-auto">
              We aim to make the insurance process clear and stress-free.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-poppins text-lg font-semibold text-[#1F4362]">
                  1
                </span>
              </div>
              <h4 className="font-poppins text-lg font-semibold text-black mb-3">
                Check Your Plan
              </h4>
              <p className="font-poppins text-sm text-[#707070] font-light">
                Confirm that Paramount Diagnostic Lab is listed as an in-network
                provider for your specific plan by reviewing your insurance
                documentation or calling your provider directly.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-poppins text-lg font-semibold text-[#1F4362]">
                  2
                </span>
              </div>
              <h4 className="font-poppins text-lg font-semibold text-black mb-3">
                Referral (If Needed)
              </h4>
              <p className="font-poppins text-sm text-[#707070] font-light">
                Check if your plan requires a referral from your physician for
                laboratory services.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-poppins text-lg font-semibold text-[#1F4362]">
                  3
                </span>
              </div>
              <h4 className="font-poppins text-lg font-semibold text-black mb-3">
                Book Your Appointment
              </h4>
              <p className="font-poppins text-sm text-[#707070] font-light">
                You can easily book your appointment online, or your doctor can
                submit a lab order.
              </p>
            </div>
          </div>

          {/* Billing Questions */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h4 className="font-poppins text-[24px] sm:text-[28px] font-semibold text-black mb-4">
              Questions About Billing?
            </h4>
            <p className="font-poppins text-sm sm:text-base text-[#707070] font-light mb-6 max-w-2xl mx-auto">
              We understand that insurance can be confusing. Our dedicated
              Patient Services team is ready to provide the critical insights
              and assistance you need.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-[#1F4362]">
                    <PhoneIcon />
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-poppins text-sm text-[#707070] font-light">
                    Call us directly at
                  </p>
                  <p className="font-poppins text-lg font-semibold text-black">
                    908-834-8034
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-[#1F4362]">
                    <MailIcon />
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-poppins text-sm text-[#707070] font-light">
                    Email us at
                  </p>
                  <p className="font-poppins text-lg font-semibold text-black">
                    info@myparamountlab.com
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="font-poppins text-lg font-semibold text-[#1F4362]">
                Don't delay your care! We look forward to providing you with
                fast and reliable diagnostic services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </Page>
  );
};

export default page;

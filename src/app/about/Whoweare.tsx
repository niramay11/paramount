import Image from "next/image";
import React from "react";
import AboutGirl from "../../../public/about_paramount-girl.png";

const Whoweare = () => {
  return (
    <section className="flex flex-col lg:flex-row w-full gap-6 py-12 items-center">
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <Image
          src={AboutGirl}
          alt="About Paramount Girl"
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Text */}
      <div className="w-full lg:w-1/2 py-6 lg:py-12">
        <h3 className="font-poppins text-[#793146] font-semibold text-center lg:text-left text-3xl sm:text-4xl lg:text-5xl leading-snug">
          <span className="block">Our Story:</span>
          <span className="block text-[#A94C68]">Built on Excellence,</span>
          <span className="block text-[#C85C7B]">Driven by Innovation</span>
        </h3>

        <p className="text-black leading-7 sm:leading-8 font-poppins text-center lg:text-left mt-4 text-sm sm:text-base">
          Paramount Diagnostic Lab was founded with one goal — to deliver
          accurate, reliable, and timely diagnostic results with a human touch.
          Our expert team combines advanced technology with compassionate care,
          ensuring every test result supports better health decisions. We go
          beyond compliance, maintaining the highest standards of quality,
          precision, and trust in everything we do.
        </p>
      </div>
    </section>
  );
};

export default Whoweare;

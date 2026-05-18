import React from "react";

const AboutHero = () => {
  return (
    <section className="relative py-12">
      {/* Background Image */}
      <div className="absolute inset-0 w-screen left-1/2 translate-x-[-50%] h-full z-0">
        <div
          className="w-full h-full bg-cover bg-none md:bg-center"
          style={{ backgroundImage: 'url("/about_hero.png")' }}
        />
      </div>

      {/* Content */}
      <div className="z-10 block relative w-full md:max-w-1/2 py-28">
        <h3 className="font-poppins text-center md:text-left text-[#793146] font-semibold text-3xl  lg:text-4xl">
          About Paramount Diagnostic Lab
        </h3>
        <p className="text-black leading-7 text-center md:text-left sm:leading-8 font-poppins mt-4 text-sm sm:text-base">
          Advancing Healthcare Through Precision Diagnostics in New Jersey At
          Paramount Diagnostic Lab, we believe that accurate diagnostics are the
          cornerstone of effective healthcare. Located in the heart of New
          Jersey, our state-of-the-art facility has been designed with one
          mission in mind: delivering reliable, precise diagnostic services that
          healthcare providers and patients can trust. Since our establishment,
          we have remained committed to setting new standards in clinical
          excellence while maintaining the personal touch that makes healthcare
          truly caring.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;

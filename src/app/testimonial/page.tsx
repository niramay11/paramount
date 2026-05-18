import Footer from "@/component/Footer";
import Page from "@/component/Page";
import Image from "next/image";
import React from "react";
import Profile from "../../../public/profile.png";
import Contact_girl from "../../../public/contact_girl.png";
import TestimonialForm from "./TestimonialForm";
import StarRating from "@/component/Rating";
import Doctor_1 from "../../../public/doctor_1.png";
import Doctor_2 from "../../../public/doctor_2.png";
import Doctor_3 from "../../../public/doctor_3.png";
import Doctor_4 from "../../../public/doctor_4.png";
import Doctor_5 from "../../../public/doctor_5.png";
import Doctor_6 from "../../../public/doctor_6.png";

const page = () => {
  const testimonials = [
    {
      profile: Doctor_1,
      name: "Shefali Saha",
      description: `Q Answer lab is an outstanding Lab. They are providing prompt and fast, perfect COVID test results. They are charging very reasonable and minimal for test.
Overall, all the staffs are very humble, knowledgeable in that field. The management, they really treat their staffs with dignity, respect, treating as their own family. They are allowing us to work while you work, and play while you play.
I highly recommend Q Answer Lab for infectious tests.
God bless Q Answer Lab.`,
      rating: 5,
    },
    {
      profile: Doctor_2,
      name: "Rahul Mantri",
      description: `I was there last week for the covid test. Miss Priya was friendly and thoughtful. She Explained about the test, the expectation, what to do while waiting for the result.I  left from there feeling relaxed and informed. Thanks Priya for this positive experience. Well done!`,
      rating: 5,
    },
    {
      profile: Doctor_3,
      name: "Nayee Maulik",
      description: `I don't leave review normally but they really deserve a great review for going above and beyond to make my parents feel comfortable. All the staff members technical as well as administrative were so nice, helpful and sweet. Customer service was extremely prompt and very knowledgeable.`,
      rating: 5,
    },
    {
      profile: Doctor_4,
      name: "Kavi Physio",
      description: `week before i came here for covid test priya mam handle me very well nd she is so polite thank you mam for you are excellent service keep going.`,
      rating: 5,
    },
    {
      profile: Doctor_5,
      name: "Naseer Alwadi",
      description: `Nice ,cooperative and extremely friendly helpful staff
Accurate and reasonable time results
Quick response
Recommend to go there
Greatful and many thanks from me and my family to Carmen for her help`,
      rating: 5,
    },
    {
      profile: Doctor_6,
      name: "Anthony DeJesus",
      description: `Very helpful, answered all of my questions regarding testing.`,
      rating: 5,
    },
  ];

  return (
    <Page>
      {/* Heading */}
      <section className="py-12 w-full flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <span className="w-full md:w-2/3 text-center">
          <h3 className="font-poppins font-semibold text-3xl">Testimonials</h3>
          <p className="font-sora text-[#6C87AE] mt-2">
            Hear what our patients have to say about their experience at Paramount Diagnostic Lab. 
            We're committed to providing exceptional care and reliable diagnostic services.
          </p>
        </span>
      </section>

      {/* Testimonial Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 lg:px-16">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col gap-6 items-start justify-between p-6 bg-white shadow-[0px_8px_24px_-3px_rgba(3,9,50,0.08)] rounded-2xl hover:shadow-[0px_16px_32px_-3px_rgba(3,9,50,0.12)] transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={testimonial.profile}
                alt={testimonial.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#1F4362]"
              />
              <span>
                <h4 className="font-poppins font-semibold text-lg text-[#154565]">
                  {testimonial.name}
                </h4>
                <div className="mt-1">
                  <StarRating rating={testimonial.rating} />
                </div>
              </span>
            </div>
            <p className="font-poppins text-sm text-gray-600 font-light leading-relaxed italic flex-1">
              "{testimonial.description}"
            </p>
          </div>
        ))}
      </section>

      {/* Form Section */}
      <section className="flex flex-col-reverse lg:flex-row justify-start items-center gap-12 w-full mt-28 px-4 sm:px-8 lg:px-16">
        {/* Contact Form */}
        <TestimonialForm />
        {/* Contact Girl Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={Contact_girl}
            alt="Profile Image"
            width={1000}
            height={1000}
            className="w-full h-auto max-w-[500px] object-contain"
          />
        </div>
      </section>

      <Footer />
    </Page>
  );
};

export default page;
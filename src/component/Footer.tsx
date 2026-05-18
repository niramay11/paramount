import React from "react";
import Phone from "../../public/phone.svg";
import Email from "../../public/email.svg";
import Printer from "../../public/printer.svg";
import Location from "../../public/location.svg";
import Facebook from "../../public/facebook.svg";
import Instagram from "../../public/instagram.svg";
import Twitter from "../../public/twitter.svg";
import Image from "next/image";
import Link from "next/link";
import { FaApplePay, FaPaypal } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="max-w-[1920px] relative mx-auto mt-16 md:mt-32">
      <section className="rounded-t-[24px] footer-bg px-8 lg:px-12 py-8">
        {/* Grid Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
          {/* Contact Info */}
          <div>
            <h3 className="font-poppins text-xl font-semibold mb-4">
              Get In Touch
            </h3>
            <ul className="text-base font-poppins space-y-3">
              <li className="flex items-center">
                <Image src={Phone} alt="phone" className="mr-2 w-5 h-5" />
                908-834-8034
              </li>
              <li className="flex items-center">
                <Image src={Email} alt="email" className="mr-2 w-5 h-5" />
                info@myparamountlab.com
              </li>
              <li className="flex items-center">
                <Image src={Printer} alt="printer" className="mr-2 w-5 h-5" />
                908-251-5037
              </li>
              <li className="flex items-center">
                <Image src={Location} alt="location" className="mr-2 w-5 h-5" />
                2177 Oak Tree Rd, STE 208, Edison, NJ 08820-1082
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-poppins text-xl font-semibold mb-4">Company</h3>
            <ul className="text-base font-poppins space-y-3">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/career">Career</Link>
              </li>
              <li>
                <Link href="/testimonial">Testimonial</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-poppins text-xl font-semibold mb-4">Legal</h3>
            <ul className="text-base font-poppins space-y-3">
              <li>Privacy Policy</li>
              <li>Terms & Services</li>
              <li>HIPAA compliance</li>
            </ul>
          </div>

          {/* Social & Payment */}
          <div>
            <h3 className="font-poppins text-xl font-semibold mb-4">
              Connect With Us
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={Facebook}
                alt="facebook"
                className="w-6 h-6 cursor-pointer"
              />
              <Image
                src={Instagram}
                alt="instagram"
                className="w-6 h-6 cursor-pointer"
              />
              <Image
                src={Twitter}
                alt="twitter"
                className="w-6 h-6 cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <p className="text-sm text-gray-300 font-poppins text-center">
                We accept all major credit cards and digital payments
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                  <FaApplePay className="text-2xl text-black hover:text-gray-700 transition-colors duration-200" />
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                  <FaPaypal className="text-2xl text-blue-500 hover:text-blue-600 transition-colors duration-200" />
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                  <FaCcVisa className="text-2xl text-blue-800 hover:text-blue-900 transition-colors duration-200" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-4 text-center text-sm font-poppins text-white border-white">
          © 2024 Paramount Diagnostic Lab, LLC. All rights reserved.
        </div>
      </section>
    </footer>
  );
};

export default Footer;

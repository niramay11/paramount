import Button from "@/component/Button";
import Footer from "@/component/Footer";
import Page from "@/component/Page";
import React from "react";

const page = () => {
  return (
    <Page>
      {" "}
      {/* Header */}
      <div className="flex flex-col items-start justify-start my-8 px-4 sm:px-6 lg:px-0">
        <h3 className="font-poppins text-[28px] sm:text-[36px] lg:text-[42px] font-semibold text-black">
          Laboratory Forms
        </h3>
      </div>
      <section>
        <div className="flex flex-col items-start justify-start my-8 px-4 sm:px-6 lg:px-0">
          <h3 className="font-poppins text-2xl font-semibold text-black">
            Office Forms
          </h3>
          <p className="font-poppins text-sm sm:text-base lg:text-[16px] text-[#707070] font-light mt-2">
            Complete online form and hit submit
          </p>
        </div>
        <div className="flex gap-8">
          <Button className="w-max">Order Supplies</Button>
          <Button className="w-max">New Account Request</Button>
          <Button className="w-max">Home Visit Request</Button>
          <Button className="w-max">Add-on / ICD-10 Req.</Button>
        </div>
        <div className="flex flex-col items-start justify-start my-8 px-4 sm:px-6 lg:px-0">
          <h3 className="font-poppins text-2xl font-semibold text-black">
            Requisirion Forms
          </h3>
          <p className="font-poppins text-sm sm:text-base lg:text-[16px] text-[#707070] font-light mt-2">
            Complete online form and hit submit
          </p>
        </div>
        <div className="flex gap-8">
          <Button className="w-max">Blood Req.</Button>
          <Button className="w-max">Toxicology Visit Req.</Button>
          <Button className="w-max">Podiatry Req.</Button>
          <Button className="w-max">Women's Health Req.</Button>
          <Button className="w-max">Infectious Diseases Req.</Button>
        </div>
      </section>
      <Footer />
    </Page>
  );
};

export default page;

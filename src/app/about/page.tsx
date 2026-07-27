import type { Metadata } from "next";
import Page from "@/component/Page";
import React from "react";
import AboutHero from "./AboutHero";
import Whoweare from "./Whoweare";
import LabDifference from "./LabDifference";
import OurMission from "./OurMission";
import Footer from "@/component/Footer";
import MeetTheTeam from "./MeetTheTeam";
import OurWorkFlow from "./OurWorkFlow";
import CertificationsAndCompliance from "./CertificationsAndCompliance";
import WhyChooseUs from "./WhyChoseUs";

export const metadata: Metadata = {
  title: "About Us | Paramount Diagnostic Lab, Edison NJ",
  description:
    "Learn about Paramount Diagnostic Lab — a CLIA-certified, CAP-accredited, NJ state-licensed clinical laboratory serving Central New Jersey.",
  alternates: { canonical: "/about" },
};

const page = () => {
  return (
    <Page className="overflow-hidden" >
      {" "}
      <div className="bg-tint" />
      <AboutHero />
      <Whoweare />
      <LabDifference />
      <OurMission />
      <MeetTheTeam />
      <WhyChooseUs />
      <CertificationsAndCompliance/>
      <OurWorkFlow/>
      <Footer/>
    </Page>
  );
};

export default page;

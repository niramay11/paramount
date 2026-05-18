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

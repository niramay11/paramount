import type { Metadata } from "next";
import Page from "@/component/Page";
import Hero from "./home/Hero";
import Service from "./home/Service";
import Testimonial from "./home/Testimonial";
import ContactUs from "./home/ContactUs";
import Footer from "@/component/Footer";

export const metadata: Metadata = {
  title: "Diagnostic Lab in Edison, NJ | Paramount Diagnostic Lab",
  description:
    "CLIA-certified, CAP-accredited diagnostic lab in Edison, NJ. Fast, reliable blood tests, COVID-19 testing, and more. Walk-ins welcome.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <Page>
      <div className="bg-blue max-w-[1920px] mx-auto" />
      <Hero />
      <Service />
      <Testimonial />
      <ContactUs />
      <Footer />
    </Page>
  );
}

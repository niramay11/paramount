import Page from "@/component/Page";
import Hero from "./home/Hero";
import Service from "./home/Service";
import Testimonial from "./home/Testimonial";
import ContactUs from "./home/ContactUs";
import Footer from "@/component/Footer";

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

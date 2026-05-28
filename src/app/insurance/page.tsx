import Page from "@/component/Page";
import Footer from "@/component/Footer";
import InsuranceCarousel from "@/component/InsuranceCarousel";
import SectionHeader from "@/component/SectionHeader";
import { supabaseAdmin } from "@/lib/supabase";
import { MailIcon, PhoneIcon } from "lucide-react";

interface InsProvider {
  id: string;
  name: string;
  category: string;
  sort_order: number;
  image_url?: string | null;
}

export const revalidate = 3600;

export default async function InsurancePage() {
  const { data } = await supabaseAdmin
    .from("insurance_providers")
    .select("id, name, category, sort_order, image_url")
    .order("sort_order")
    .order("name");

  const providers: InsProvider[] = data ?? [];
  const featured  = providers.filter((p) => p.category === "featured");
  const specialty = providers.filter((p) => p.category === "specialty");

  const carouselLogos = providers
    .filter((p) => p.image_url)
    .map((p) => ({ id: p.id, url: p.image_url!, alt: p.name, sort_order: p.sort_order }));

  return (
    <Page>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative pt-12 pb-0">
        <div
          className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0"
          style={{ background: "#f4f8fb" }}
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto px-4 sm:px-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="block h-px w-8 bg-[#793146]" />
            <span className="text-[10.5px] font-bold tracking-[0.14em] text-[#793146] uppercase font-inter">
              CLIA Certified · NJ State Licensed
            </span>
            <span className="block h-px w-8 bg-[#793146]" />
          </div>

          <h1 className="text-[2.2rem] sm:text-[2.7rem] lg:text-[3.1rem] font-inter font-bold leading-[1.12] text-[#0d2b45]">
            Your Trusted Partner{" "}
            <span className="text-[#154565]">in Diagnostic Care</span>
          </h1>

          <p className="mt-4 text-xl font-inter font-light text-[#2a6070]">
            Maximize Your Healthcare Benefits with Paramount Diagnostic Lab
          </p>

          <p className="mt-5 text-[15px] text-[#4a6070] leading-relaxed max-w-2xl">
            At Paramount Diagnostic Lab, we believe that world-class diagnostic
            testing should be accessible and affordable. We are committed to
            convenience and cost-effectiveness while providing the reliable,
            technology-driven testing services you need for accurate diagnosis
            and treatment planning.
          </p>
        </div>

        {/* Carousel — overlaps hero bottom into next section */}
        <div className="relative z-20 mt-10 -mb-16">
          <InsuranceCarousel logos={carouselLogos} />
        </div>
      </section>

      {/* ══════════════════ PROVIDER LISTS ══════════════════ */}
      <section className="pt-32 pb-20 relative">
        <div
          className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0"
          style={{ background: "linear-gradient(145deg, #c8dce9 0%, #b8ccd9 40%, #c0d3e2 100%)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">

          <SectionHeader
            eyebrow="Insurance Partners"
            heading="We Accept Your Insurance!"
            body="We are continuously expanding our network to serve more patients. If you don't see your provider listed below, please contact us — we're here to help!"
          />

          {/* Featured National and Regional Partners */}
          <div className="mb-14">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2.5 mb-2">
                <span className="block h-px w-6 bg-[#793146]" />
                <span className="text-[10.5px] font-bold tracking-[0.14em] text-[#793146] uppercase font-sora">
                  National &amp; Regional
                </span>
              </div>
              <h3 className="font-poppins text-[20px] sm:text-[24px] font-bold text-[#0d2b45]">
                Featured National and Regional Partners
              </h3>
              <p className="font-poppins text-[14px] text-[#4a6070] mt-2">
                We are proud to be in-network with many of the nation&apos;s leading
                health plans
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1">
                {featured.map((provider) => (
                  <div
                    key={provider.id}
                    className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0"
                  >
                    {provider.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={provider.image_url}
                        alt={provider.name}
                        className="w-8 h-8 object-contain flex-shrink-0"
                      />
                    ) : (
                      <div className="w-2 h-2 bg-[#1F4362] rounded-full flex-shrink-0" />
                    )}
                    <span className="font-poppins text-sm text-[#0d2b45] font-medium">
                      {provider.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Specialty & Network Plans */}
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2.5 mb-2">
                <span className="block h-px w-6 bg-[#793146]" />
                <span className="text-[10.5px] font-bold tracking-[0.14em] text-[#793146] uppercase font-sora">
                  Specialty Networks
                </span>
              </div>
              <h3 className="font-poppins text-[20px] sm:text-[24px] font-bold text-[#0d2b45]">
                Specialty &amp; Network Plans
              </h3>
              <p className="font-poppins text-[14px] text-[#4a6070] mt-2">
                We also work with the following specialized and local networks
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1">
                {specialty.map((provider) => (
                  <div
                    key={provider.id}
                    className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0"
                  >
                    {provider.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={provider.image_url}
                        alt={provider.name}
                        className="w-7 h-7 object-contain flex-shrink-0"
                      />
                    ) : (
                      <div className="w-2 h-2 bg-[#2C6B9E] rounded-full flex-shrink-0" />
                    )}
                    <span className="font-poppins text-sm text-[#0d2b45] font-medium leading-relaxed">
                      {provider.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════ STEPS ══════════════════ */}
      <section className="py-20 relative">
        <div
          className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0"
          style={{ background: "#f4f8fb" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8">

          <SectionHeader
            eyebrow="Simple Process"
            heading="Getting Your Testing Covered: Simple Steps"
            body="We aim to make the insurance process clear and stress-free."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "1",
                title: "Check Your Plan",
                body: "Confirm that Paramount Diagnostic Lab is listed as an in-network provider for your specific plan by reviewing your insurance documentation or calling your provider directly.",
              },
              {
                n: "2",
                title: "Referral (If Needed)",
                body: "Check if your plan requires a referral from your physician for laboratory services.",
              },
              {
                n: "3",
                title: "Book Your Appointment",
                body: "You can easily book your appointment online, or your doctor can submit a lab order.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="group relative flex flex-col items-center text-center rounded-2xl bg-white p-8"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
              >
                {/* Gradient top bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#154565] to-[#793146] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5 flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #154565 0%, #793146 100%)" }}
                >
                  <span className="font-poppins text-lg font-bold text-white">{step.n}</span>
                </div>

                <h4 className="font-poppins text-[17px] font-bold text-[#0d2b45] mb-3">
                  {step.title}
                </h4>
                <p className="font-poppins text-[13.5px] font-light text-[#4a6070] leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════ BILLING / CONTACT ══════════════════ */}
      <section className="py-20 relative">
        <div
          className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0"
          style={{ background: "linear-gradient(141.26deg, #154565 0%, #793146 100%)" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 text-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="block h-px w-8 bg-white/40" />
            <span className="text-[10.5px] font-bold tracking-[0.14em] text-white/60 uppercase font-sora">
              We&apos;re Here to Help
            </span>
            <span className="block h-px w-8 bg-white/40" />
          </div>

          <h2 className="font-inter text-[2rem] sm:text-[2.6rem] font-bold text-white leading-tight mb-4">
            Questions About Billing?
          </h2>

          <p className="font-poppins text-[15px] text-white/75 leading-relaxed mb-10 max-w-xl mx-auto">
            We understand that insurance can be confusing. Our dedicated Patient
            Services team is ready to provide the critical insights and assistance
            you need.
          </p>

          {/* Contact cards */}
          <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 mb-10">
            <a
              href="tel:9088348034"
              className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl px-6 py-5 hover:bg-white/20 transition-colors duration-200 flex-1"
            >
              <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <PhoneIcon className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-poppins text-xs text-white/60 mb-0.5">Call us directly at</p>
                <p className="font-poppins text-[17px] font-semibold text-white">908-834-8034</p>
              </div>
            </a>

            <a
              href="mailto:info@myparamountlab.com"
              className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl px-6 py-5 hover:bg-white/20 transition-colors duration-200 flex-1"
            >
              <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MailIcon className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-poppins text-xs text-white/60 mb-0.5">Email us at</p>
                <p className="font-poppins text-[17px] font-semibold text-white">info@myparamountlab.com</p>
              </div>
            </a>
          </div>

          <div className="pt-6 border-t border-white/20">
            <p className="font-poppins text-[16px] font-semibold text-white">
              Don&apos;t delay your care! We look forward to providing you with fast
              and reliable diagnostic services.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </Page>
  );
}

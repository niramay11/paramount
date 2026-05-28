import Page from "@/component/Page";
import React from "react";
import Footer from "@/component/Footer";
import { HomeIcon, MailIcon, PhoneIcon, PrinterIcon, GlobeIcon } from "lucide-react";
import ContactPageForm from "./ContactPageForm";
import MapEmbed from "./MapEmbed";

const INFO = [
  {
    Icon: HomeIcon,
    label: "Address",
    value: "2177 Oak Tree Rd, STE 208\nEdison, NJ 08820",
    href: null,
  },
  {
    Icon: PhoneIcon,
    label: "Phone",
    value: "(908) 834-8034",
    href: "tel:+19088348034",
  },
  {
    Icon: MailIcon,
    label: "Email",
    value: "info@myparamountlab.com",
    href: "mailto:info@myparamountlab.com",
  },
  {
    Icon: PrinterIcon,
    label: "Fax",
    value: "(908) 251-5037",
    href: null,
  },
  {
    Icon: GlobeIcon,
    label: "Website",
    value: "www.myparamountlab.com",
    href: "https://www.myparamountlab.com",
  },
];

export default function ContactPage() {
  return (
    <Page>

      {/* ══ HEADER ════════════════════════════════════════════ */}
      <section className="relative pt-16 pb-12">
        <div
          className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0"
          style={{ background: "#ffffff" }}
        />
        <div className="relative z-10">

          {/* Eyebrow + heading */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="block h-px w-8 bg-[#793146]" />
              <span className="text-[10.5px] font-bold tracking-[0.14em] text-[#793146] uppercase font-inter">
                Contact Us
              </span>
            </div>
            <h1
              className="font-inter font-bold leading-[1.05] text-[#0d2b45]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.4rem)" }}
            >
              Get In{" "}
              <span
                style={{
                  background:           "linear-gradient(135deg, #154565 0%, #793146 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor:  "transparent",
                  backgroundClip:       "text",
                }}
              >
                Touch
              </span>
            </h1>
            <p className="mt-4 text-[15px] text-[#4a6070] leading-relaxed">
              Reach out for appointments, test information, or billing questions — we&apos;re happy to help.
            </p>
          </div>

          {/* Info cards row */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {INFO.map(({ Icon, label, value, href }) => {
              const card = (
                <div
                  className="flex flex-col gap-2.5 p-4 rounded-2xl bg-white group"
                  style={{
                    border:    "1px solid rgba(21,69,101,0.09)",
                    boxShadow: "0 2px 12px rgba(21,69,101,0.06)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #154565 0%, #793146 100%)" }}
                  >
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="font-poppins text-[9.5px] font-bold tracking-[0.13em] text-[#94a3b8] uppercase mb-1">
                      {label}
                    </p>
                    <p className="font-poppins text-[12.5px] font-medium text-[#0d2b45] leading-snug whitespace-pre-line group-hover:text-[#154565] transition-colors">
                      {value}
                    </p>
                  </div>
                </div>
              );
              return href ? (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {card}
                </a>
              ) : (
                <div key={label}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ MAP — full width ══════════════════════════════════ */}
      <section className="relative">
        <div
          className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0"
          style={{ background: "#f8fafc" }}
        />
        <div
          className="relative z-10 w-screen left-1/2 -translate-x-1/2"
          style={{ height: "420px" }}
        >
          <MapEmbed />
          <div className="absolute top-4 left-6 bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-xl shadow-md z-10">
            <p className="font-poppins text-[11px] font-bold text-[#793146] uppercase tracking-wide">Our Location</p>
            <p className="font-poppins text-[12px] text-[#0d2b45] mt-0.5">2177 Oak Tree Rd, Edison NJ</p>
          </div>
        </div>
      </section>

      {/* ══ FORM ══════════════════════════════════════════════ */}
      <section className="relative py-16">
        <div
          className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0"
          style={{ background: "#f0f4f8" }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="block h-px w-8 bg-[#793146]" />
              <span className="text-[10.5px] font-bold tracking-[0.14em] text-[#793146] uppercase font-inter">
                Send a Message
              </span>
            </div>
            <h2 className="text-[1.7rem] font-inter font-bold text-[#0d2b45]">
              How Can We Help?
            </h2>
            <p className="mt-1.5 text-[14px] text-[#4a6070]">
              Fill in the form and we&apos;ll get back to you within one business day.
            </p>
          </div>

          <ContactPageForm />
        </div>
      </section>

      <Footer />
    </Page>
  );
}

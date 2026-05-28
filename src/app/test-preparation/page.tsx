import Page from "@/component/Page";
import Image from "next/image";
import Footer from "@/component/Footer";
import SectionHeader from "@/component/SectionHeader";
import TestHand from "../../../public/test_hand.png";
import {
  FlaskConicalIcon,
  DropletIcon,
  BeakerIcon,
  MicroscopeIcon,
} from "lucide-react";

/* ─── data ─────────────────────────────────────────────── */

const GENERAL_PREP = [
  {
    title: "Consult Your Physician",
    body: "Your doctor will provide specific instructions for your test, and you must follow them exactly.",
  },
  {
    title: "Medications & Supplements",
    body: "Inform your physician or lab professional about all medicines, vitamins, or supplements you are currently taking.",
  },
  {
    title: "Honesty is Key",
    body: "If you weren't able to follow the preparation instructions exactly, tell the lab professional.",
  },
  {
    title: "Avoid Strenuous Activity",
    body: "Strenuous exercise, smoking, and alcohol consumption can temporarily alter your metabolism.",
  },
  {
    title: "Stay Hydrated",
    body: "Unless specifically instructed otherwise, drink plenty of plain water before your test, as this can make it easier to collect a blood or urine sample.",
  },
];

const INSTRUCTIONS = [
  {
    icon: FlaskConicalIcon,
    title: "Fasting Guidelines",
    description:
      "Fasting is a common preparation, often required for 8 to 12 hours before a diagnostic test. Fasting helps ensure the accuracy of tests by preventing nutrients from food from altering the substances measured in your bloodstream.",
    items: [
      "What Fasting Means: Do not eat or drink anything except water for the required number of hours (typically 8 to 12 hours or overnight).",
      "Common Fasting Tests: This preparation is often necessary for tests measuring Blood Glucose, Cholesterol Levels, and Triglycerides.",
      "Allowed Drinks (Unless Directed Otherwise): Plain water is generally permitted. Avoid coffee, tea, alcohol, herbal teas, or vitamin water unless explicitly advised.",
      "After the Test: It's best practice to bring a snack or light meal to have immediately after your fasting test.",
    ],
  },
  {
    icon: DropletIcon,
    title: "Blood Tests (General)",
    description:
      "Proper preparation for blood tests ensures accurate results and a comfortable experience.",
    items: [
      "Hydration: Drink enough water the day before and the morning of your test to make the blood draw easier.",
      "Bring Documentation: Have your personal ID, insurance information, and physician's order ready to ensure accurate patient identification.",
      "Post-Draw Care: Apply light pressure to the site if bleeding occurs, and use an ice pack if bruising develops.",
    ],
  },
  {
    icon: BeakerIcon,
    title: "Urine Samples",
    description:
      "Correct urine sample collection is crucial for accurate test results.",
    items: [
      "Hydration: Drink water about 15 to 20 minutes before your urine test to make collection easier, unless otherwise instructed.",
      "Clean Catch Method (If Required): For a 'clean catch' sample, a health professional will give you instructions to properly cleanse the genital area before you collect the sample mid-stream. This prevents germs from the skin from contaminating the sample.",
      "Collection: Collect the sample into the container without letting the container touch your body.",
    ],
  },
  {
    icon: MicroscopeIcon,
    title: "Stool (Fecal) Tests",
    description:
      "Proper stool sample collection ensures reliable test outcomes.",
    items: [
      "Follow Dietary/Medicine Restrictions: Some fecal tests, like the Fecal Occult Blood Test, may require you to avoid certain foods or medicines beforehand. Follow the instructions provided by your physician.",
      "Sample Collection: The sample should be passed directly into a clean container with a tight cover.",
      "Storage and Labeling: Follow instructions for storage and transport, and ensure the container is properly labeled with your name and the date/time of collection.",
    ],
  },
];

const COMMON_TESTS = [
  "Glucose tolerance, fasting, and two-hour post-prandial blood glucose tests: fasting or eating meals at specific times may be required.",
  "Lipids profile (triglycerides, cholesterol, etc.): fasting for 9-12 hours may be required.",
  "Creatinine: fasting overnight or refraining from eating cooked meat may be required since some studies have shown that eating cooked meat prior to testing can temporarily increase the level of creatinine.",
  "Fecal occult blood test: certain food and/or medication restrictions may be required.",
  "Urine culture: a patient may be instructed not to urinate for at least one hour before the test and/or to drink a glass of water 15-20 minutes before sample collection.",
  "5-HIAA: foods such as avocados, bananas, pineapples, plums, walnuts, tomatoes, kiwi fruit, and eggplant can interfere with 5-HIAA measurement and should be avoided for 3 days prior to and during urine collection; there are also a variety of drugs that can affect the 5-HIAA test.",
  "Cortisol: resting before sample collection may be required and, if a saliva sample is to be collected, it may be necessary to refrain from eating, drinking, or brushing teeth for a period of time prior to the test.",
  "Pap test (pap smear): a woman may be instructed not to douche or tub bathe for 24 hours before the Pap test is to be performed and not to use any vaginal creams or foams for 48 hours prior to the exam; she also may be asked to refrain from sexual intercourse for 24 to 48 hours before the test and not schedule the test during her menstrual period.",
];

/* ─── page ─────────────────────────────────────────────── */

export default function TestPreparationPage() {
  return (
    <Page>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative pt-10 pb-0">
        <div
          className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0"
          style={{ background: "#f4f8fb" }}
        />

        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 min-h-[340px]">

          {/* Left: text */}
          <div className="flex-1 min-w-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="block h-px w-8 bg-[#793146]" />
              <span className="text-[10.5px] font-bold tracking-[0.14em] text-[#793146] uppercase font-inter">
                Patient Education · NJ State Licensed
              </span>
            </div>

            <h1 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.9rem] font-inter font-bold leading-[1.12] text-[#0d2b45]">
              Preparing for Your{" "}
              <span className="text-[#154565]">Test at Paramount</span>
            </h1>

            <p className="mt-5 text-[15px] text-[#4a6070] leading-relaxed max-w-[520px] mx-auto lg:mx-0">
              At Paramount Diagnostic Lab, we understand that accurate results
              are the foundation of your healthcare journey, and proper
              preparation is essential for reliable diagnostic services. As a
              leading local lab in New Jersey, we&apos;re committed to
              patient-centered care and aim for excellence in every test we
              perform.
            </p>
            <p className="mt-4 text-[15px] text-[#4a6070] leading-relaxed max-w-[520px] mx-auto lg:mx-0">
              By following these clear, simple instructions, you contribute
              directly to the high quality of service and precision of your
              results — optimizing your patient journey from appointment booking
              to result delivery.
            </p>
          </div>

          {/* Right: image */}
          <div className="flex-shrink-0 flex justify-center lg:justify-end">
            <Image
              src={TestHand}
              alt="Hand holding medical test sample"
              width={440}
              height={440}
              className="w-full max-w-[340px] sm:max-w-[420px] h-auto object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* ══════════════════ GENERAL PREPARATION ══════════════════ */}
      <section className="py-20 relative">
        <div
          className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0"
          style={{ background: "linear-gradient(145deg, #c8dce9 0%, #b8ccd9 40%, #c0d3e2 100%)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
          <SectionHeader
            eyebrow="Before You Arrive"
            heading="General Preparation for Accurate Results"
            body="Your role in preparing for a test is one of the most important factors in determining the accuracy and reliability of your lab results. Before your scheduled diagnostic test, please keep the following in mind:"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GENERAL_PREP.map((item, i) => (
              <div
                key={i}
                className={`group relative flex flex-col gap-3 rounded-2xl bg-white p-7${i === 4 ? " sm:col-span-2 lg:col-span-1" : ""}`}
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#154565] to-[#793146] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #154565 0%, #793146 100%)" }}
                >
                  <span className="font-inter font-bold text-white text-sm">{i + 1}</span>
                </div>
                <h4 className="font-poppins text-[15px] font-bold text-[#0d2b45]">
                  {item.title}
                </h4>
                <p className="font-poppins text-[13px] font-light text-[#4a6070] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ INSTRUCTION CARDS ══════════════════ */}
      <section className="py-20 relative">
        <div
          className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0"
          style={{ background: "#f4f8fb" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
          <SectionHeader
            eyebrow="Specific Guidance"
            heading="Test-Type Preparation Instructions"
            body="Different tests require different preparation. Follow the relevant section below based on the type of test your physician has ordered."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {INSTRUCTIONS.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="group relative flex flex-col rounded-2xl bg-white p-8"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#154565] to-[#793146] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #154565 0%, #793146 100%)" }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-poppins text-[18px] font-bold text-[#0d2b45] leading-snug">
                      {card.title}
                    </h3>
                  </div>

                  <p className="font-poppins text-[13.5px] font-light text-[#4a6070] leading-relaxed mb-5">
                    {card.description}
                  </p>

                  <ul className="space-y-3">
                    {card.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                          style={{ background: "#154565" }}
                        />
                        <p className="font-poppins text-[13px] text-[#4a6070] font-light leading-relaxed">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ PARTNER IN HEALTH + COMMON TESTS ══════════════════ */}
      <section className="py-20 relative">
        <div
          className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 h-full z-0"
          style={{ background: "linear-gradient(141.26deg, #154565 0%, #793146 100%)" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8">

          {/* Eyebrow + heading */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="block h-px w-8 bg-white/40" />
              <span className="text-[10.5px] font-bold tracking-[0.14em] text-white/60 uppercase font-sora">
                Your Partner in Health
              </span>
              <span className="block h-px w-8 bg-white/40" />
            </div>
            <h2 className="font-inter text-[2rem] sm:text-[2.5rem] font-bold text-white leading-tight mb-5">
              Your Partner in Health
            </h2>
            <p className="font-poppins text-[15px] text-white/75 leading-relaxed max-w-3xl mx-auto mb-4">
              At Paramount Diagnostic Lab in New Jersey, we pride ourselves on
              providing precise results and a transparent, positive experience.
              By paying attention to these preparations, you are actively
              participating in your journey towards better health.
            </p>
            <p className="font-poppins text-[15px] text-white/75 leading-relaxed max-w-3xl mx-auto">
              If you have any questions or concerns about your preparation,
              please contact us right away. Our commitment to quality assurance
              and clear communication is unwavering.
            </p>
          </div>

          {/* Common Tests block */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 sm:p-10">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="block h-px w-6 bg-white/40" />
              <span className="text-[10.5px] font-bold tracking-[0.14em] text-white/60 uppercase font-sora">
                Reference Guide
              </span>
            </div>
            <h3 className="font-poppins text-[20px] sm:text-[22px] font-bold text-white mb-3">
              Common Laboratory Tests Requiring Preparation
            </h3>
            <p className="font-poppins text-[14px] text-white/65 font-light mb-8">
              Examples of some common laboratory tests that require advance preparation include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {COMMON_TESTS.map((test, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0 mt-2" />
                  <p className="font-poppins text-[13px] text-white/80 font-light leading-relaxed">
                    {test}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/15">
              <p className="font-poppins text-[13px] text-white/60 font-light text-center italic leading-relaxed">
                However, be sure to check with your health care provider for specific instructions rather than
                relying on the information on this or any other web site, as different labs may have varying
                testing protocols.
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </Page>
  );
}

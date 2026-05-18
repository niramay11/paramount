import Page from "@/component/Page";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Footer from "@/component/Footer";
import TestHand from "../../../public/test_hand.png";
import clsx from "clsx";
import Button from "@/component/Button";

const INSTRUCTIONS = [
  {
    title: "Fasting Guidelines",
    description: "Fasting is a common preparation, often required for 8 to 12 hours before a diagnostic test. Fasting helps ensure the accuracy of tests by preventing nutrients from food from altering the substances measured in your bloodstream.",
    items: [
      "What Fasting Means: Do not eat or drink anything except water for the required number of hours (typically 8 to 12 hours or overnight).",
      "Common Fasting Tests: This preparation is often necessary for tests measuring Blood Glucose, Cholesterol Levels, and Triglycerides.",
      "Allowed Drinks (Unless Directed Otherwise): Plain water is generally permitted. Avoid coffee, tea, alcohol, herbal teas, or vitamin water unless explicitly advised.",
      "After the Test: It's best practice to bring a snack or light meal to have immediately after your fasting test."
    ],
  },
  {
    title: "Blood Tests (General)",
    description: "Proper preparation for blood tests ensures accurate results and a comfortable experience.",
    items: [
      "Hydration: Drink enough water the day before and the morning of your test to make the blood draw easier.",
      "Bring Documentation: Have your personal ID, insurance information, and physician's order ready to ensure accurate patient identification.",
      "Post-Draw Care: Apply light pressure to the site if bleeding occurs, and use an ice pack if bruising develops."
    ],
  },
  {
    title: "Urine Samples",
    description: "Correct urine sample collection is crucial for accurate test results.",
    items: [
      "Hydration: Drink water about 15 to 20 minutes before your urine test to make collection easier, unless otherwise instructed.",
      "Clean Catch Method (If Required): For a 'clean catch' sample, a health professional will give you instructions to properly cleanse the genital area before you collect the sample mid-stream. This prevents germs from the skin from contaminating the sample.",
      "Collection: Collect the sample into the container without letting the container touch your body."
    ],
  },
  {
    title: "Stool (Fecal) Tests",
    description: "Proper stool sample collection ensures reliable test outcomes.",
    items: [
      "Follow Dietary/Medicine Restrictions: Some fecal tests, like the Fecal Occult Blood Test, may require you to avoid certain foods or medicines beforehand. Follow the instructions provided by your physician.",
      "Sample Collection: The sample should be passed directly into a clean container with a tight cover.",
      "Storage and Labeling: Follow instructions for storage and transport, and ensure the container is properly labeled with your name and the date/time of collection."
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
  "Pap test (pap smear): a woman may be instructed not to douche or tub bathe for 24 hours before the Pap test is to be performed and not to use any vaginal creams or foams for 48 hours prior to the exam; she also may be asked to refrain from sexual intercourse for 24 to 48 hours before the test and not schedule the test during her menstrual period."
];

const page = () => {
  return (
    <Page>
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row justify-start items-center gap-12 w-full mt-16 px-4 sm:px-6 lg:px-12">
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-start">
          <h1 className="font-poppins text-2xl sm:text-3xl lg:text-[32px] font-semibold text-black">
            Preparing for Your Test at Paramount Diagnostic Lab
          </h1>
          <ul className="font-poppins mt-8 pl-6 list-disc space-y-4 text-black text-sm sm:text-base">
            <li>
              At Paramount Diagnostic Lab, we understand that accurate results
              are the foundation of your healthcare journey, and proper
              preparation is essential for reliable diagnostic services. As a
              leading local lab in New Jersey, we're committed to
              patient-centered care and aim for excellence in every test we
              perform. By following these clear, simple instructions, you
              contribute directly to the high quality of service and precision
              of your results
            </li>
            <li>
              Our goal is to optimize your patient journey by ensuring a smooth
              experience from appointment booking to result delivery. We've
              organized this page with relevant keywords and local focus to
              ensure maximum visibility for patients searching for a "diagnostic
              center in New Jersey" or "lab near me".
            </li>
          </ul>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={TestHand}
            alt="Hand holding medical test sample"
            width={500}
            height={500}
            className="w-full h-auto max-w-[500px] object-contain"
            priority
          />
        </div>
      </section>

      {/* General Preparation Section */}
      <section className="my-16 px-4 sm:px-8 lg:px-16">
        <div className=" mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="font-poppins text-2xl sm:text-3xl font-semibold text-black text-center mb-8">
              General Preparation for Accurate Results
            </h2>
            <p className="font-poppins text-sm sm:text-base text-[#707070] font-light text-center mb-8 max-w-3xl mx-auto">
              Your role in preparing for a test is one of the most important factors in determining the accuracy and reliability of your lab results. Before your scheduled diagnostic test, please keep the following in mind:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-[#1F4362] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-black text-sm sm:text-base">Consult Your Physician</h4>
                  <p className="font-poppins text-[#707070] font-light text-sm mt-1">
                    Your doctor will provide specific instructions for your test, and you must follow them exactly.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-[#1F4362] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-black text-sm sm:text-base">Medications and Supplements</h4>
                  <p className="font-poppins text-[#707070] font-light text-sm mt-1">
                    Inform your physician or lab professional about all medicines, vitamins, or supplements you are currently taking.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-[#1F4362] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-black text-sm sm:text-base">Honesty is Key</h4>
                  <p className="font-poppins text-[#707070] font-light text-sm mt-1">
                    If you weren't able to follow the preparation instructions exactly, tell the lab professional.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-[#1F4362] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-black text-sm sm:text-base">Avoid Strenuous Activity</h4>
                  <p className="font-poppins text-[#707070] font-light text-sm mt-1">
                    Strenuous exercise, smoking, and alcohol consumption can temporarily alter your metabolism.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 md:col-span-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-[#1F4362] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-black text-sm sm:text-base">Stay Hydrated</h4>
                  <p className="font-poppins max-w-1/2 text-[#707070] font-light text-sm mt-1">
                    Unless specifically instructed otherwise, drink plenty of plain water before your test, as this can make it easier to collect a blood or urine sample.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instruction Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 sm:px-8 lg:px-16 my-16">
        {INSTRUCTIONS.map((content, index) => (
          <div
            key={`instruction-${index}`}
            className={clsx(
              "border border-[#A6A6A6] p-6 w-[90%] bg-white shadow-sm rounded-lg",
              index % 2 === 1 && "ml-auto"
            )}
          >
            <h2 className="font-poppins text-xl font-semibold text-black mb-4">
              {content.title}
            </h2>
            {content.description && (
              <p className="font-poppins text-sm text-[#707070] font-light mb-4 leading-relaxed">
                {content.description}
              </p>
            )}
            <ul className="font-poppins mt-4 pl-5 list-disc space-y-3 text-black text-sm sm:text-base">
              {content.items.map((item, i) => (
                <li key={`item-${index}-${i}`} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Partner in Health Section */}
      <section className="my-16 px-4 sm:px-8 lg:px-16">
        <div className=" mx-auto">
          <div className="bg-gradient-to-r from-[#1F4362] to-[#2C6B9E] rounded-2xl p-8 sm:p-12 text-white">
            <div className="text-center mb-8">
              <h2 className="font-poppins text-2xl sm:text-3xl font-semibold mb-6">
                Your Partner in Health
              </h2>
              <p className="font-poppins text-sm sm:text-base font-light leading-relaxed max-w-4xl mx-auto">
                At Paramount Diagnostic Lab in New Jersey, we pride ourselves on providing precise results and a transparent, positive experience. We use content marketing and clear guidance like this to educate and engage our target audience. By paying attention to these preparations, you are actively participating in your journey towards better health.
              </p>
            </div>

            <div className="text-center mb-8">
              <p className="font-poppins text-sm sm:text-base font-light leading-relaxed max-w-4xl mx-auto">
                If you have any questions or concerns about your preparation, please contact us right away. Our commitment to quality assurance and clear communication is unwavering.
              </p>
            </div>

            {/* Call to Action Button */}
            <div className="text-center mb-12">
              <button className="bg-white text-[#1F4362] font-poppins font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition-colors shadow-lg">
                Book Your Test Now!
              </button>
            </div>

            {/* Common Tests Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8">
              <h3 className="font-poppins text-xl sm:text-2xl font-semibold text-center mb-6">
                Common Laboratory Tests Requiring Preparation
              </h3>
              <p className="font-poppins text-sm text-center text-white/90 font-light mb-6 max-w-2xl mx-auto">
                Examples of some common laboratory tests that require advance preparation include:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COMMON_TESTS.map((test, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <p className="font-poppins text-sm text-white/90 font-light leading-relaxed">
                      {test}
                    </p>
                  </div>
                ))}
              </div>

              {/* Important Note */}
              <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="font-poppins text-sm text-white/80 font-light text-center italic">
                  However, be sure to check with your health care provider for specific instructions rather than relying on the information on this or any other web site, as different labs may have varying testing protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </Page>
  );
};

export default page;
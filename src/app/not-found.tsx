import Page from "@/component/Page";
import Link from "next/link";
import { HomeIcon, ConstructionIcon, ArrowRightIcon } from "lucide-react";
import Footer from "@/component/Footer";

const NotFoundPage = () => {
  return (
    <Page className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Construction Icon */}
          <div className="mb-8">
            <div className="w-32 h-32 bg-brand rounded-full flex items-center justify-center mx-auto mb-6">
              <ConstructionIcon size={64} className="text-white" />
            </div>
          </div>

          {/* Content */}
          <h1 className="font-poppins font-semibold text-4xl sm:text-5xl text-brand mb-4">
            Coming Soon
          </h1>
          
          <p className="font-poppins text-xl text-gray-600 mb-8">
            We're working on something exciting! This page is currently under construction.
          </p>


          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="flex items-center justify-center gap-2 bg-brand text-white px-8 py-3 rounded-lg hover:bg-[#1e5b7b] transition-colors font-poppins font-semibold"
            >
              <HomeIcon size={20} />
              Return Home
            </Link>
            
            <Link 
              href="/services"
              className="flex items-center justify-center gap-2 border border-brand text-brand px-8 py-3 rounded-lg hover:bg-brand hover:text-white transition-colors font-poppins font-semibold"
            >
              Explore Our Services
              <ArrowRightIcon size={20} />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </Page>
  );
};

export default NotFoundPage;
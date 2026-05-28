"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPinIcon } from "lucide-react";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.2583999999996!2d-74.37738892427344!3d40.43110497143658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3e2b61d9c1a0b%3A0x8c1f5b8a8e8e8e8e!2s2177%20Oak%20Tree%20Rd%2C%20Edison%2C%20NJ%2008820!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus";

export default function MapEmbed() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full relative">
      {active ? (
        <iframe
          src={MAP_SRC}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Paramount Diagnostic Lab Location - 2177 Oak Tree Rd, Edison, NJ"
          className=""
        />
      ) : (
        /* Placeholder shown until iframe is needed */
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#edf3f9]"
          style={{ border: "1px solid rgba(21,69,101,0.10)" }}
        >
          <MapPinIcon className="w-8 h-8 text-[#154565]" />
          <p className="font-poppins text-[13px] text-[#4a6070]">Loading map…</p>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import StarRating from "@/component/Rating";
import Doctor_1 from "../../../public/doctor_1.png";
import Doctor_2 from "../../../public/doctor_2.png";
import Doctor_3 from "../../../public/doctor_3.png";
import Doctor_4 from "../../../public/doctor_4.png";
import Doctor_5 from "../../../public/doctor_5.png";
import Doctor_6 from "../../../public/doctor_6.png";

type TestimonialItem = {
  profile: StaticImageData;
  name: string;
  description: string;
  rating: number;
};

const testimonials: TestimonialItem[] = [
  {
    profile: Doctor_1,
    name: "Parthiban",
    description: `Last week I was here for COVID test. The place was neat and clean.  Priya was so professional. Thanks Priya madam 🙌`,
    rating: 5,
  },
  {
    profile: Doctor_2,
    name: "Rahul Mantri",
    description: `I was there last week for the covid test. Miss Priya was friendly and thoughtful. She Explained about the test, the expectation, what to do while waiting for the result.I  left from there feeling relaxed and informed. Thanks Priya for this positive experience. Well done!`,
    rating: 5,
  },
  {
    profile: Doctor_3,
    name: "Nayee Maulik",
    description: `I don't leave review normally but they really deserve a great review for going above and beyond to make my parents feel comfortable. All the staff members technical as well as administrative were so nice, helpful and sweet. Customer service was extremely prompt and very knowledgeable.`,
    rating: 5,
  },
  {
    profile: Doctor_4,
    name: "Kavi Physio",
    description: `week before i came here for covid test priya mam handle me very well nd she is so polite thank you mam for you are excellent service keep going.`,
    rating: 5,
  },
  {
    profile: Doctor_5,
    name: "Naseer Alwadi",
    description: `Nice ,cooperative and extremely friendly helpful staff
Accurate and reasonable time results
Quick response
Recommend to go there
Greatful and many thanks from me and my family to Carmen for her help`,
    rating: 5,
  },
  {
    profile: Doctor_6,
    name: "Anthony DeJesus",
    description: `Very helpful, answered all of my questions regarding testing.`,
    rating: 5,
  },
];

const Testimonial: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [radiusVW, setRadiusVW] = useState(42); // vw (will be updated)
  const [radiusVH, setRadiusVH] = useState(28); // vh (will be updated)

  // Autoplay with pause on hover/focus
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((p) => (p + 1) % testimonials.length);
    }, 4200);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  // Larger radiuses so avatars don't overlap center card
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Increased radius values (guarantees avatars stay well outside the card)
      setRadiusVW(w < 640 ? 55 : w < 1024 ? 48 : 42);
      setRadiusVH(h < 700 ? 38 : h < 900 ? 32 : 28);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((p) => (p + 1) % testimonials.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const getCirclePosition = (index: number) => {
    const angle = (index / testimonials.length) * 2 * Math.PI - Math.PI / 2; // start at top
    const x = radiusVW * Math.cos(angle);
    const y = radiusVH * Math.sin(angle);
    return { x, y };
  };

  return (
    <section
      className="min-h-[78vh] w-full flex max-w-[1200px] mx-auto items-center justify-center relative py-12 px-4"
      aria-label="Testimonials"
    >
      {/* Soft background bubble image */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div
          className="w-full h-full bg-center bg-cover"
          style={{ backgroundImage: 'url("/bubbles.png")' }}
        />
      </div>

      {/* SAFE CIRCLE: ensures avatars never intrude into the center card */}
      <div className="absolute inset-0 z-10 safe-circle-pointer hidden lg:block">
        {testimonials.map((t, i) => {
          const pos = getCirclePosition(i);
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              onMouseEnter={() => !isActive && setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="absolute z-20 p-0 bg-transparent border-0"
              aria-label={`Show testimonial by ${t.name}`}
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${pos.x.toFixed(2)}vw), calc(-50% + ${pos.y.toFixed(
                  2
                )}vh))`,
                transition: "transform 600ms cubic-bezier(.2,.9,.3,1), filter 300ms",
              }}
            >
              <div
                className={`relative rounded-full shadow-2xl border-4 transition-transform duration-500 transform-gpu ${
                  isActive
                    ? "scale-125 md:scale-[1.35] border-white ring-4 ring-[#cbe7ff]/60"
                    : "scale-100 opacity-90 filter grayscale-0 hover:scale-110"
                }`}
                style={{
                  willChange: "transform, filter",
                }}
              >
                <Image
                  src={t.profile}
                  alt={t.name}
                  className={`rounded-full object-cover w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-28 lg:h-28`}
                  priority={i < 3}
                />
               
              </div>
            </button>
          );
        })}
      </div>

      {/* Center testimonial card */}
      <div
        className="relative z-30 max-w-3xl w-full mx-auto flex flex-col items-center text-center px-6 py-10 rounded-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div className="w-full backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-6 md:p-10 shadow-xl">
          <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl font-poppins leading-relaxed text-slate-800 mb-4 sm:mb-6">
            “{testimonials[activeIndex].description}”
          </blockquote>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-6">
            <div>
              <h4 className="text-[#154565] text-lg sm:text-xl md:text-2xl font-semibold">
                {testimonials[activeIndex].name}
              </h4>
              <div className="mt-1">
                <StarRating rating={testimonials[activeIndex].rating} />
              </div>
            </div>
          </div>
        </div>

        {/* position/dot indicators */}
        <div className="flex gap-2 mt-4 justify-center">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === activeIndex ? "w-4 h-4 bg-[#154565]" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Local styles to enforce safe circle and remove pointer quirks */}
      <style jsx>{`
        /* This padding creates a guaranteed "no-go" zone around the center card.
           Avatars are positioned relative to the full inset-0 container; the padding
           prevents them from being placed too close to the center. Tune the padding
           values if you need more/less distance. */
        .safe-circle-pointer {
          padding: 140px; /* increase to push avatars further out */
          box-sizing: border-box;
          pointer-events: none; /* default: prevent container from intercepting clicks */
        }
        /* But allow avatar buttons to still receive pointer events */
        .safe-circle-pointer button {
          pointer-events: auto;
        }

        /* On very small screens we slightly reduce the safe padding so avatars aren't offscreen */
        @media (max-width: 420px) {
          .safe-circle-pointer {
            padding: 90px;
          }
        }

        @media (min-width: 1600px) {
          .safe-circle-pointer {
            padding: 180px;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonial;

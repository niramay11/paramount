"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Company_1 from "../../public/company_1.png";
import Company_2 from "../../public/company_2.png";
import Company_3 from "../../public/company_3.png";
import Company_4 from "../../public/company_4.png";
import Company_5 from "../../public/company_5.png";
import Company_6 from "../../public/company_6.png";
import { StaticImageData } from "next/image";

export interface CarouselLogo {
  id: string;
  url: string;
  alt: string;
  sort_order: number;
}

interface Props {
  logos: CarouselLogo[];
}

const STATIC_LOGOS: { src: StaticImageData; alt: string }[] = [
  { src: Company_1, alt: "Insurance partner" },
  { src: Company_4, alt: "Insurance partner" },
  { src: Company_3, alt: "Insurance partner" },
  { src: Company_5, alt: "Insurance partner" },
  { src: Company_2, alt: "Insurance partner" },
  { src: Company_6, alt: "Insurance partner" },
];

export default function InsuranceCarousel({ logos }: Props) {
  const useDynamic = logos.length > 0;
  const dynamicSlides = logos.length < 5 ? [...logos, ...logos, ...logos] : [...logos, ...logos];

  return (
    <div className="relative w-full">
      {/* Left fade mask */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(244,248,251,1) 0%, rgba(244,248,251,0) 100%)",
        }}
      />
      {/* Right fade mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, rgba(244,248,251,1) 0%, rgba(244,248,251,0) 100%)",
        }}
      />

      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={3500}
        slidesPerView={2}
        spaceBetween={16}
        breakpoints={{
          480:  { slidesPerView: 3, spaceBetween: 20 },
          768:  { slidesPerView: 4, spaceBetween: 24 },
          1024: { slidesPerView: 5, spaceBetween: 28 },
          1280: { slidesPerView: 6, spaceBetween: 28 },
        }}
        className="py-6"
        style={{ cursor: "default" }}
      >
        {useDynamic
          ? dynamicSlides.map((logo, index) => (
              <SwiperSlide key={`${logo.id}-${index}`}>
                <div className="flex items-center justify-center h-[88px] bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-3 mx-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.url}
                    alt={logo.alt}
                    className="max-h-[56px] w-auto object-contain"
                    style={{ maxWidth: "140px" }}
                  />
                </div>
              </SwiperSlide>
            ))
          : [...STATIC_LOGOS, ...STATIC_LOGOS, ...STATIC_LOGOS].map((logo, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center h-[88px] bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-3 mx-1">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={130}
                    height={56}
                    className="object-contain max-h-[56px] w-auto"
                  />
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}

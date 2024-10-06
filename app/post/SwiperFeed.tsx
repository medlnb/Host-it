"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import LoadImageClient from "@components/LoadImageClient";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function SwiperFeed({ imageUrls }: { imageUrls: string[] }) {
  return (
    <div>
      <div className="flex justify-end text-blue-500 mt-2">
        <MdKeyboardArrowLeft size={30} className="swiper-prev cursor-pointer" />
        <MdKeyboardArrowRight
          size={30}
          className="swiper-next cursor-pointer"
        />
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={7}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2.5,
            spaceBetween: 7,
          },
        }}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        }}
        pagination={{ clickable: true }}
      >
        {imageUrls.map((imag) => (
          <SwiperSlide
            key={imag}
            className="mb-10 md:max-w-[40%] max-w-[75%] px-1 "
          >
            <LoadImageClient
              Css="w-full h-44 md:h-72 object-cover rounded-lg"
              Url={imag}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperFeed;

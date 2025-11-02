import { sliderData } from "../context"; // or import sliderData from "../context"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom"; // ✅ add this if using Link

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {sliderData.map((data) => (
          <SwiperSlide key={data.title}>
            <div className="relative md:h-[85vh] md:w-[90vw] overflow-hidden px-4 md:px-0 md:rounded-2xl mx-auto pb-4">
              <img
                src={data.img}
                alt={data.title}
                className="md:absolute w-full md:h-full object-cover rounded-2xl"
              />
              <div className="md:absolute md:w-[40%] left-20 top-60 px-4 py-5 text-[#222222]">
                <h1 className="text-2xl md:text-5xl font-semibold">{data.title}</h1>
                <p className="md:text-sm font-light tracking-wide pt-2 pb-8 h-[135px] md:h-auto">
                  {data.desc}
                </p>
                <Link
                  to={data.link}
                  className="text-white bg-[#1cac09] text-sm md:text-xs px-4 py-2 rounded-lg"
                >
                  {data.button}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;

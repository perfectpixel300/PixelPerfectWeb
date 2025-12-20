
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

const HeroSlider = () => {

  const [sliderData, setSliderData] = useState([])

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/banners`);
        setSliderData(response.data.banners);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      }
    };
    fetchSliderData();
  }, []);

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
        className="hero"
      >
        {sliderData?.map((data) => (
          <SwiperSlide key={data.title}>
            <div className="relative md:h-[85vh] md:w-[90vw] overflow-hidden px-4 md:px-0 md:rounded-2xl mx-auto pb-4">
              <img
                src={data.image}
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
                  className="text-white bg-[#1cac09] text-sm md:text-xs px-4 py-2 rounded-lg duration-300 hover:bg-[#389e2a]"
                >
                  Follow Link
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

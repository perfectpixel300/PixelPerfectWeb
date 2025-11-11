import { Swiper, SwiperSlide } from "swiper/react";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import { products } from "../context";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import SwiperButtons from "../components/SwiperButtons";

const Home = () => {
  return (
    <>
      <div className="overflow-x-hidden pt-24 md:pt-28">
        <div className="flex flex-col items-center">
          <HeroSlider />
        </div>
        <div className="w-full h-[1px] bg-[#c5c5c5] rounded-full my-10"></div>

        {/* Items Section Begins  */}

        <div className="px-4 md:px-10 flex flex-col">
          <div className="px-10 py-4 rounded-2xl bg-[#eeeeee] ">
            <Swiper
              className="relative w-full"
              breakpoints={{
                320: {
                  slidesPerView: 1.3,
                  spaceBetween: 20,
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
            >
              <SwiperButtons title="Just for you" />
              {products.map((products) => (
                <SwiperSlide className="" key={products.price}>
                  <ProductCard product={products} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

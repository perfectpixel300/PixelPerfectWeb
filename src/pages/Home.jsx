import { Swiper, SwiperSlide } from "swiper/react";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import { products } from "../context";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

const Home = () => {
  return (
    <>
      <div className="overflow-x-hidden">
        <div className="pt-24 md:pt-28 px-1 flex flex-col items-center">
          <HeroSlider />
        </div>
        <div className="w-full h-[1px] bg-[#c5c5c5] rounded-full my-10"></div>
        <div className="px-10 flex flex-col">
          <div className="md:px-20">
            <h1 className="text-2xl py-5">Just for you</h1>
            <Swiper
              freeMode={true}
              modules={[Navigation, Pagination, FreeMode]}
              navigation
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                870: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1080: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
              }}
            >
              {products.map((products) => (
                <SwiperSlide className="w-[200px]" key={products.price}>
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

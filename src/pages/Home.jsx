import { Swiper, SwiperSlide } from "swiper/react";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import { mostSoldProducts, newlyAddedProducts } from "../context";
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
          <div className="px-5 md:px-10 rounded-2xl bg-[#e7e7e7] ">
            <Swiper
              className="relative w-full h-[380px] md:h-[500px] 2xl:h-[570px]"
              modules={[Autoplay]}
              autoplay={{ delay: 4000 }}
              loop={true}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                480: {
                  slidesPerView: 2.7,
                  spaceBetween: 5,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 25,
                },
                1536: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                }
              }}
            >
              <SwiperButtons title="Trending Products" />
              {mostSoldProducts.map((products) => (
                <SwiperSlide className="mt-[140px] xl:mt-[90px]" key={products.price}>
                  <ProductCard product={products} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="px-4 md:px-10 flex flex-col mt-10 md:mt-16">
          <div className="px-5 md:px-10 rounded-2xl bg-[#e7e7e7] ">
            <Swiper
              className="relative w-full h-[380px] md:h-[500px] 2xl:h-[570px]"
              modules={[Autoplay]}
              autoplay={{ delay: 4000 }}
              loop={true}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                480: {
                  slidesPerView: 2.7,
                  spaceBetween: 5,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 25,
                },
                1536: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                }
              }}
            >
              <SwiperButtons title="Newly Added Products" />
              {newlyAddedProducts.map((products) => (
                <SwiperSlide className="mt-[140px] xl:mt-[90px]" key={products.price}>
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

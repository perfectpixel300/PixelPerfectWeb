import { Swiper, SwiperSlide } from "swiper/react";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import SwiperButtons from "../components/SwiperButtons";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  // hello

  const [mostSoldProducts, setMostSoldProducts] = useState([])
  const [newlyAddedProducts, setNewlyAddedProducts] = useState([])


  useEffect(() => {
    
    const base = import.meta.env.VITE_API_URL;

    const mostSoldReq = axios.get(`${base}/products?page=1&limit=6&populate=true`);
    const recentReq = axios.get(`${base}/products/recent?populate=true`);

    Promise.all([mostSoldReq, recentReq])
      .then(([mostRes, recentRes]) => {
        
        setMostSoldProducts(mostRes.data?.products || []);
        setNewlyAddedProducts(recentRes.data?.products || []);
        console.log("mostSold:", mostRes.data?.products);
        console.log("recent:", recentRes.data?.products);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        console.error(err);
      });

    
  }, []);

  return (
    <>
      <div className="overflow-x-hidden pt-24 md:pt-28">
        <div className="flex flex-col items-center">
          <HeroSlider />
        </div>
        <div className="w-full h-[1px] bg-[#c5c5c5] rounded-full my-10"></div>

        {/* Items Section Begins now */}

        <div className="px-4 md:px-10 flex flex-col">
          <div className="px-5 md:px-10 rounded-2xl bg-[#e7e7e7] ">
            <Swiper
              className="relative w-full h-[380px] md:h-[500px] 2xl:h-[600px]"
              modules={[Autoplay]}
              autoplay={{ delay: 4000 }}
              loop={true}
              breakpoints={{
                320: {
                  slidesPerView: 1.8,
                  spaceBetween: 5,
                },
                480: {
                  slidesPerView: 2.7,
                  spaceBetween: 5,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                1280: {
                  slidesPerView: 4.1,
                  spaceBetween: 5,
                },
                1536: {
                  slidesPerView: 4.2,
                  spaceBetween: 10,
                }
              }}
            >
              <SwiperButtons title="Trending Products" />
              {mostSoldProducts?.map((products) => (
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
              className="relative w-full h-[380px] md:h-[500px] 2xl:h-[600px]"
              modules={[Autoplay]}
              autoplay={{ delay: 4000 }}
              loop={true}
              breakpoints={{
                320: {
                  slidesPerView: 1.8,
                  spaceBetween: 5,
                },
                480: {
                  slidesPerView: 2.7,
                  spaceBetween: 5,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                1280: {
                  slidesPerView: 4.1,
                  spaceBetween: 5,
                },
                1536: {
                  slidesPerView: 4.2,
                  spaceBetween: 10,
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

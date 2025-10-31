import { useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider";
import HeroSliderData from "../components/HeroSliderData";
import { sliderData } from "../context";

const Home = () => {
  const [imageCount, setImageCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageCount((count) => {
        return count === 2 ? 0 : count + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex overflow-x-hidden h-[100vh]">
        <div className="w-full h-[70vh] md:h-[100vh] md:w-[100vw] relative flex justify-center items-center object-cover overflow-hidden">
          <HeroSlider className="absolute md:relative top-24 md:top-0 object-cover md:h-full w-full" imageCount={imageCount} />
          <HeroSliderData className="absolute z-10 bottom-10 md:top-[25%] left-[8%] w-full pt-28" sliderData={sliderData[imageCount]} />
        </div>
      </div>
    </>
  );
};

export default Home;

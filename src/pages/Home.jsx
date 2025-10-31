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
      <div className="pt-28 flex flex-col items-center">
        <div className="relative md:h-[85vh] md:w-[90vw] overflow-hidden rounded-2xl">
          <HeroSlider className="absolute  w-full h-full object-cover" imageCount={imageCount} />
          <HeroSliderData className="absolute md:w-[40%] left-20 top-60" sliderData={sliderData[imageCount]} />
        </div>
      </div>
    </>
  );
};

export default Home;

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
      <div className="flex items-center justify-center pt-28">
        <div className="w-[75vw] relative flex justify-center items-center object-cover overflow-hidden">
          <HeroSlider className="object-cover" imageCount={imageCount} />
          <HeroSliderData className="absolute z-10 top-[20%] left-10 w-[40%]" sliderData={sliderData[imageCount]} />
        </div>
      </div>
    </>
  );
};

export default Home;

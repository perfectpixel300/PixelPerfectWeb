import HeroSlider from "../components/HeroSlider";

const Home = () => {
  return (
    <>
      <div className="overflow-x-hidden">
        <div className="pt-24 md:pt-28 px-1 flex flex-col items-center">
          <HeroSlider />
        </div>
        <div className="h-screen w-screen bg-slate-500">

        </div>
      </div>
    </>
  );
};

export default Home;

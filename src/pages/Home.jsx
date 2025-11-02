import HeroSlider from "../components/HeroSlider";

const Home = () => {
  return (
    <>
      <div className="overflow-x-hidden">
        <div className="pt-24 md:pt-28 px-2 md:px-10 flex flex-col items-center">
          <HeroSlider />
        </div>
        <div className="h-screen w-screen bg-slate-500">

        </div>
      </div>
    </>
  );
};

export default Home;

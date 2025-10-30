import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import gsap from "gsap";
import { useRef } from "react";
import { navLinks } from "../context";

const Navbar = () => {
  const lineRef = useRef(null);
  const handleEnter = () => {
    gsap.to(lineRef.current, {
      width: "92%",
    });
  };

  const handleLeave = () => {
    gsap.to(lineRef.current, {
      width: "0%",
    });
  };

  return (
    <>
      <div>
        <div className="w-[100vw] flex items-center py-8 md:py-6 lg:py-[10px] px-10 md:px-14 lg:px-10 fixed bg-[#f1f1f1] gap-2 justify-between lg:justify-around ">
          <div className="flex items-start">
            <Link className="flex items-center justify-center">
              <img className="h-[40px] lg:h-[70px]" src="/logo.png" alt="Pixel Perfect" />
              <div>
                <p className="text-xl lg:text-2xl font-bold flex">PixelPerfect.</p>
                <p className="font-light text-[8px] lg:text-[9px]">
                  Stationery | Gifts | Studio | IT Support
                </p>
              </div>
            </Link>
          </div>
          <div className=" relative hidden md:flex items-center justify-center lg:justify-start" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <div
              ref={lineRef}
              className="absolute w-[0%] h-[2px] bg-[#8B00C2] bottom-0 left-1/2 -translate-x-[50%] rounded-full"
            ></div>
            <label
              htmlFor="search"
              className="outline-[#c0c0c0] outline-1 px-4 py-2 text-sm flex items-center justify-between rounded-full w-full"
            >
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search for products | services"
                className="outline-none"
              />
              <IoSearch className="label-icon cursor-pointer hover:text-[#8B00C2]" />
            </label>
          </div>
          <div className=" hidden lg:flex items-center  justify-center gap-x-4 ">
            {navLinks.map((navLinks, index) => (
              <div className="relative " key={index}>
                <Link to={navLinks.link}>{navLinks.id}</Link>
              </div>
            ))}
          </div>
          <div className=" flex items-center justify-center lg:hidden cursor-pointer">
            <i class="ri-menu-5-line text-3xl"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

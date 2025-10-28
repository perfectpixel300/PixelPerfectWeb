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
        <div className="w-[100vw] flex items-center justify-between py-[10px] px-10 md:px-14 lg:px-24 fixed bg-[#f1f1f1] ">
          <div>
            <Link className="flex items-center justify-center">
              <img className="h-[70px]" src="/logo.png" alt="Pixel Perfect" />
              <div>
                <p className="text-3xl font-bold flex">PixelPerfect.</p>
                <p className="font-light text-[11px]">
                  Stationery | Gifts | Studio | IT Support
                </p>
              </div>
            </Link>
          </div>
          <div className="relative hidden md:flex" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <div
              ref={lineRef}
              className="absolute w-[0%] h-[2px] bg-[#8B00C2] bottom-0 left-1/2 -translate-x-[50%] rounded-full"
            ></div>
            <label
              htmlFor="search"
              className="outline-[#c0c0c0] outline-1 px-3 py-2 text-sm flex items-center rounded-full"
            >
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search for products | services"
                className="outline-none"
              />
              <IoSearch className="label-icon" />
            </label>
          </div>
          <div className="hidden lg:flex gap-4 ">
            {navLinks.map((navLinks, index) => (
              <div className="relative " key={index}>
                <Link to={navLinks.link}>{navLinks.id}</Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-1 lg:hidden">
            <div className="bg-black w-[30px] h-[2px] rounded-full"></div>
            <div className="bg-black w-[30px] h-[2px] rounded-full"></div>
            <div className="bg-black w-[30px] h-[2px] rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

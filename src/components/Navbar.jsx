import { Link, Links } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { navLinks, subNavs } from "../context";

const Navbar = () => {
  const lineRef = useRef(null);
  const burgerRef = useRef(null);
  const crossRef = useRef(null);
  const mobileNavRef = useRef(null);

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

  useEffect(() => {
    gsap.set(mobileNavRef.current, {
      xPercent: 100,
    });
  }, []);

  const handleOpen = () => {
    gsap.to(mobileNavRef.current, {
      xPercent: 0,
      duration: 0.5,
      ease: "power3.in",
    });
  };

  const handleClose = () => {
    gsap.to(mobileNavRef.current, {
      xPercent: 100,
      duration: 0.5,
      ease: "power3.in",
    });
  };

  return (
    <>
      <div className="">
        <div
          className="largeScreen-navbar w-[100vw] flex items-center py-4 md:py-6 lg:py-[10px] 
        px-6 md:px-14 fixed z-50 bg-[#ffffff] gap-2 justify-between "
        >
          <div className="flex items-start">
            <Link to="/" className="flex items-center justify-center">
              <img
                className="h-[40px] lg:h-[70px]"
                src="/logo.png"
                alt="Pixel Perfect"
              />
              <div>
                <p className="text-xl lg:text-2xl font-bold flex">
                  PixelPerfect.
                </p>
                <p className="font-light text-[8px] lg:text-[9px]">
                  Stationery | Gifts | Studio | IT Support
                </p>
              </div>
            </Link>
          </div>
          <div
            className=" relative hidden md:flex items-center justify-center w-1/3"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div
              ref={lineRef}
              className="absolute w-[0%] h-[2px] bg-[#129900] bottom-0 left-1/2 -translate-x-[50%] rounded-full"
            ></div>
            <label
              htmlFor="search"
              className="outline-[#c0c0c0] hover:text-[#129900] outline-1 px-4 py-2 text-sm flex items-center justify-between rounded-full w-full"
            >
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search for products | services"
                className="outline-none w-full"
              />
              <IoSearch className="label-icon cursor-pointer " />
            </label>
          </div>
          <div className=" hidden lg:flex items-center  justify-center gap-x-4 ">
            {navLinks.map((navLinks, index) => (
              <div className="relative " key={index}>
                <Link to={navLinks.link}>{navLinks.id}</Link>
              </div>
            ))}
          </div>
          <div
            ref={burgerRef}
            onClick={handleOpen}
            className=" flex items-center justify-center lg:hidden cursor-pointer"
          >
            <i class="ri-menu-line text-3xl"></i>
          </div>
        </div>

        <div
          ref={mobileNavRef}
          className="mobile-navbar bg-[#222222] text-[#ffffff] h-screen w-screen fixed z-[99999] px-6 md:hidden"
        >
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl">Navigation</h1>
            <div
              className="cursor-pointer"
              ref={crossRef}
              onClick={handleClose}
            >
              <i class="ri-close-large-line text-2xl"></i>
            </div>
          </div>
          <div className="links flex flex-col gap-6 text-2xl pt-10">
            {navLinks.map((navLinks, i) => (
              <Link
                className="flex justify-between px-4 "
                key={i}
                to={navLinks.link}
                onClick={handleClose}
              >
                {navLinks.id}
                <i class="ri-arrow-right-wide-line"></i>
              </Link>
            ))}
          </div>
          <div className="h-[1px] bg-[#9b9b9b] rounded-full w-full my-4"></div>
          <div className="sub-links flex flex-col gap-5 text-2xl py-2 px-4">
            Visit
            {subNavs.map((subNav, i) => (
              <Link className="px-2 text-xl" key={i} to={subNav.link} onClick={handleClose}>
                - {subNav.id}
              </Link>
            ))}
          </div>
          <div className="h-[1px] bg-[#9b9b9b] rounded-full w-full my-4"></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

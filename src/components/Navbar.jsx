import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="w-[100vw] flex items-center justify-between py-8 px-10 md:px-20 lg:px-32 fixed">
        <div>
          <Link className="">
            <p className="text-3xl font-bold">PixelPerfect.</p>
            <p className="font-light text-[11px]">Stationery | Gifts | Studio | IT Support</p>
          </Link>
        </div>
        <div className="hidden md:flex gap-4 ">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/services">Services</Link>
          <Link to="/about-us">About us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 md:hidden">
          <div className="bg-black w-[30px] h-[2px] rounded-full"></div>
          <div className="bg-black w-[30px] h-[2px] rounded-full"></div>
          <div className="bg-black w-[30px] h-[2px] rounded-full"></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

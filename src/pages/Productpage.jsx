import { useEffect, useRef, useState } from 'react'
import PageHeading from '../components/PageHeading'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductsPageInner from './ProductsPageInner'


const Productpage = () => {
  let navigate = useNavigate();
  let location = useLocation()
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef();

  const catLeft = () => {
    scrollRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    })
  };

  const catRight = () => {
    scrollRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    })
  };

  // const test = [
  //   {
  //     _id: 1,
  //     name: "Stationery"
  //   },
  //   {
  //     _id: 2,
  //     name: "Stationery"
  //   },
  //   {
  //     _id: 3,
  //     name: "Stationery"
  //   },
  //   {
  //     _id: 4,
  //     name: "Stationery"
  //   },
  //   {
  //     _id: 5,
  //     name: "Stationery"
  //   },
  //   {
  //     _id: 6,
  //     name: "Stationery"
  //   },
  //   {
  //     _id: 7,
  //     name: "Stationery"
  //   },
  //   {
  //     _id: 8,
  //     name: "Stationery"
  //   },
  //   {
  //     _id: 9,
  //     name: "Stationery"
  //   },
  //   {
  //     _id: 10,
  //     name: "Stationery"
  //   },
  //   {
  //     _id: 11,
  //     name: "Stationery"
  //   },
  //   {
  //     _id: 12,
  //     name: "Stationery"
  //   },
  //   {
  //     _id: 13,
  //     name: "Stationery"
  //   },
  //   {
  //     _id: 14,
  //     name: "Stationery"
  //   }
  // ]

  useEffect(() => {

    axios
      .get(`${import.meta.env.VITE_API_URL}/categories/?limit=20`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  return (
    <>
      {
        (location.pathname === "/products") ? (
          <div className='pt-16 md:pt-12'>
            <PageHeading
              title="Our Products"
              nav="Home"
              link="/"
              desc="Discover high-quality items crafted for everyday use."
            />
          </div>
        ) : ""
      }

      {/* Category Filter */}
      <div className='flex flex-col py-8'>
        <div id='target-id' className='flex flex-col items-center pt-2 md:pt-5 relative'>
          <h1 id='browse-section' className='text-xl md:text-3xl  font-semibold text-center'>
            Browse Our Products
          </h1>

          <div className='flex gap-2 pt-2'>
            <button className="flex cursor-pointer bg-[#e1e1e1] shadow-xs duration-300 hover:bg-[#52b345] hover:text-[#ffffff] w-8 h-8 md:w-10 md:h-10 text-lg md:text-xl rounded-full items-center justify-center" onClick={catLeft}>
              <i className="ri-arrow-left-long-line"></i>
            </button>
            <button className="flex cursor-pointer bg-[#e1e1e1] shadow-xs duration-300 hover:bg-[#52b345] hover:text-[#ffffff] w-8 h-8 md:w-10 md:h-10 text-lg md:text-xl rounded-full items-center justify-center" onClick={catRight}>
              <i className="ri-arrow-right-long-line"></i>
            </button>
          </div>

          <div ref={scrollRef} className='flex capitalize px-4 overflow-x-auto scroll-smooth w-full py-2 gap-2 no-scroller text-[10px] md:text-[15px]'>

            {/* ALL PRODUCTS */}
            <button
              onClick={() => setActiveCategory("all")}
              className={`border cursor-pointer border-[#bbbbbb] shrink-0 px-6 py-2 rounded-md duration-300
              ${activeCategory === "all" ? 'bg-[#52b345] text-white' : 'hover:bg-[#52b345] hover:text-white'}
              `}
            >
              All Products
            </button>

            {/* LIST CATEGORIES */}
            {categories?.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat._id)}
                className={`border cursor-pointer border-[#bbbbbb] shrink-0 px-6 py-2 rounded-md duration-300
                ${activeCategory === cat._id ? 'bg-[#52b345] text-white' : 'hover:bg-[#52b345] hover:text-white'}
                `}
              >
                <i className={`${cat.icon} md:text-xl`}></i> {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className='flex flex-wrap items-center  justify-center gap-2 md:gap-6 mt-6'>
          <ProductsPageInner category={activeCategory} />
        </div>
      </div>
    </>
  );
};

export default Productpage;

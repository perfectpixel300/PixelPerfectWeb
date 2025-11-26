import { useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductsPageInner from './ProductsPageInner'


const Productpage = () => {
  let navigate = useNavigate();
  let location = useLocation()
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    axios
      .get(`${import.meta.env.VITE_API_URL}/categories`)
      .then((res) => {
        setCategories(res.data);
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
      <div className='flex flex-col px-5 md:px-10 py-8'>
        <div className='flex flex-col items-center pt-2 md:pt-5'>
          <h1 className='text-xl md:text-3xl font-semibold text-center'>
            Browse Our Products
          </h1>

          <div className='flex overflow-x-scroll w-full py-4 gap-2 no-scroller md:justify-center text-[10px] md:text-[15px]'>

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
            {categories.map((cat) => (
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
        <div className='flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6'>
          <ProductsPageInner category={activeCategory} />
        </div>
      </div>
    </>
  );
};

export default Productpage;

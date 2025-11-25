import { useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import ProductCard from '../components/ProductCard'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ProductsPageInner from './ProductsPageInner'

const Productpage = () => {
  let navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all')
  const [categories, setCategories] = useState([])



  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/categories`).then((res) => {
      setCategories(res.data);
      
    }).catch(() => {
      navigate("/")
    })
  },[])


  return (
    <>
      <div className='pt-16 md:pt-12'>
        <PageHeading title="Our Products" nav="Home" link="/" desc="Discover high-quality items crafted for everyday use." />
      </div>

      {/* Category Filter */}
      <div className='flex flex-col px-5 md:px-10 py-8'>
        <div className='flex flex-col items-center pt-2 md:pt-5'>
          <h1 className='text-xl md:text-3xl font-semibold text-center'>Browse Our Products</h1>

          <div className='flex overflow-x-scroll  w-full  py-4 gap-2 no-scroller md:justify-center  text-[10px] md:text-[15px]'>
            <button
               
                onClick={() => setActiveCategory("all")}
                className={`border-[1px] border-[#bbbbbb] shrink-0  cursor-pointer duration-300 px-6 py-2 flex items-center justify-center gap-2 rounded-md
                hover:bg-[#52b345] hover:text-white
                `}
              >
                <i className={`md:text-xl`}></i> All Products
              </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat._id)
                }}
                className={`border-[1px] shrink-0 border-[#bbbbbb] cursor-pointer duration-300 px-6 py-2 flex items-center justify-center gap-2 rounded-md
                ${activeCategory === cat.name ? 'bg-[#52b345] text-white' : 'hover:bg-[#52b345] hover:text-white'}
                `}
              >
                <i className={`${cat.icon} md:text-xl`}></i> {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className='flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6'>
          <ProductsPageInner _id={activeCategory} />
        </div>
      </div>
    </>
  )
}

export default Productpage

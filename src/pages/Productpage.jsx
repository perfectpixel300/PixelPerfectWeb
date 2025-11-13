import { useState } from 'react'
import PageHeading from '../components/PageHeading'
import { allProducts, categories } from '../context'
import ProductCard from '../components/ProductCard'

const Productpage = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProducts = activeCategory === 'all'
    ? allProducts
    : allProducts.filter(product => product.category === activeCategory)

  return (
    <>
      <div className='pt-16'>
        <PageHeading title="Our Products" nav="Home" link="/" desc="Discover high-quality items crafted for everyday use." />
      </div>

      {/* Category Filter */}
      <div className='flex flex-col px-5 md:px-10 py-8'>
        <div className='flex flex-col items-center pt-2 md:pt-5'>
          <h1 className='text-xl md:text-3xl font-semibold text-center'>Browse Our Products</h1>

          <div className='flex flex-wrap gap-y-2 items-center justify-center py-4 md:py-8 gap-x-4 text-[10px] md:text-[15px]'>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`border-[1px] border-[#bbbbbb] cursor-pointer duration-300 px-6 py-2 flex items-center justify-center gap-2 rounded-md
                ${activeCategory === cat.name ? 'bg-[#52b345] text-white' : 'hover:bg-[#52b345] hover:text-white'}
                `}
              >
                <i className={`${cat.icon} md:text-xl`}></i> {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className='flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
                  <ProductCard key={index} product={product}/>
            ))
          ) : (
            <p className='text-center text-gray-500 col-span-full'>No products found in this category right now.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Productpage

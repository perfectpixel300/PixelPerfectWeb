import { useEffect, useState } from 'react';
import CacheAxios from '../CacheAxios';
import ProductCard from '../components/ProductCard';

const ProductsPageInner = ({ category }) => {
    const limit = 10;

    // Pagination state per category
    const [categoryPages, setCategoryPages] = useState({});
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const page = categoryPages[category] || 1;

    const fetchProducts = async () => {
        try {
            let url = `${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${limit}&populate=true`;

            if (category !== "all") {
                url += `&category=${category}`;
            }

            const res = await CacheAxios.get(url);

            setProducts(res.data.products || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.error(err);
        }
    };

    // Reset pagination when category changes
    useEffect(() => {
        setCategoryPages((prev) => ({
            ...prev,
            [category]: 1
        }));
    }, [category]);

    // Fetch products whenever page or category changes
    useEffect(() => {
        fetchProducts();
    }, [category, page]);

    const handlePageChange = (newPage) => {
        setCategoryPages((prev) => ({
            ...prev,
            [category]: newPage
        }));
    };

    return (
        <div className='flex flex-col items-center'>
            {/* Products */}
            {
                products.length ? (
                    <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-2'>
                        {products.map((pp) => (
                            <ProductCard key={pp._id} product={pp} />
                        ))}
                    </div>
                ):(
                    <p className='text-gray-500 text-sm py-3'>No Products Found in this category</p>
                )
      }

            {/* Pagination */}
            <div className='flex w-full justify-center gap-4 items-center mt-5 '>
                <button
                    disabled={page <= 1}
                    onClick={() => handlePageChange(page - 1)}
                    className='bg-gray-300 rounded-md p-1 px-3 cursor-pointer disabled:opacity-50'
                >
                    Previous
                </button>

                <span className='border-gray-300 border rounded-md p-1 px-3'>
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page >= totalPages}
                    onClick={() => handlePageChange(page + 1)}
                    className='bg-gray-300 rounded-md p-1 px-3 cursor-pointer disabled:opacity-50'
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductsPageInner;

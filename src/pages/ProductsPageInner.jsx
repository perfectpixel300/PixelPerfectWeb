import React, { useEffect, useState } from 'react'
import CacheAxios from '../CacheAxios'
import ProductCard from '../components/ProductCard';

const ProductsPageInner = ({ _id }) => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;
    const [id, setid] = useState("")
    const [changed, setChanged] = useState(false)

    const fetchProducts = async () => {
        try {
            let url = "";

            if (_id === "all") {
                if (changed) {
                    setPage(1)
                }

                url = `${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${limit}&populate=true`;
                setChanged(false)
            } else {
                console.log("Fetched");
                if (changed) {
                    setPage(1)
                }


                url = `${import.meta.env.VITE_API_URL}/categories/${_id}?page=${page}&limit=${limit}&populate=true`;
                setChanged(false)
            }

            const res = await CacheAxios.get(url);

            setProducts(res.data.products || []);
            setTotalPages(res.data.totalPages || 1);

        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        if (id != _id) {
            setChanged(true)
        }
    }, [_id]);

    useEffect(() => {
        setid(_id)
        fetchProducts();
    }, [_id, page, changed]);

    return (
        <>

            <div className='flex flex-col'>
                {/* Products */}
                <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-2'>
                    {products.map((pp) => (
                        <ProductCard key={pp._id} product={pp} />
                    ))}
                </div>

                {/* Pagination */}
                <div className='flex w-full justify-center gap-4 items-center mt-5'>
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage(prev => prev - 1)}
                        className='bg-gray-200 rounded-md p-1 px-3 cursor-pointer'
                    >
                        Previous
                    </button>

                    <span
                        className='border-gray-200 border rounded-md p-1 px-3'
                    >Page {page} of {totalPages}</span>

                    <button
                        disabled={page >= totalPages}
                        onClick={() => setPage(prev => prev + 1)}
                        className='bg-gray-200 rounded-md p-1 px-3 cursor-pointer'
                    >
                        Next
                    </button>
                </div>
            </div>

        </>
    )
}

export default ProductsPageInner;

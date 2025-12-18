import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNav from './AdminNav'
import { Link } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {

        console.log("Hello");
        const fetchCategories = async () => {
        console.log("Hell XXX");
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories?page=${page}&limit=10`, {
                    params : {
                        _t: Date.now()
                    }
                });
                setCategories(response.data.data);
                setTotalPages(response.data.pagination.totalPages);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, [page]);



    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <div>
            <AdminNav />
            {loading && <div className=" flex items-center min-h-24 justify-center">
                <div className="h-10 w-10 border-t-transparent  animate-spin border-4 rounded-full"></div>
            </div>}

            {loading ? "" : (
                <div className='sm:px-28 px-5'>
                    <h1 className='pt-10 text-xl font-semibold'>All Categories</h1>
                    <div className='borer  grid md:grid-cols-4 gap-2 py-10 list-none'>
                        {categories?.map(cat => (
                            <Link key={cat._id} to={`/admin/categories/${cat._id}`}>
                                <li className='bg-gray-200 capitalize px-3 py-2 rounded-md'>
                                    {cat.name}
                                </li>
                            </Link>
                        ))}
                    </div>

                    <div className='mt-10 text-sm flex items-center justify-center'>
                        <button className={`text-center px-2 py-1 ${page === 1 ? "bg-gray-100 text-gray-400" : "bg-gray-300 text-black cursor-pointer"} rounded-md  `} onClick={handlePrev} disabled={page === 1}>
                            Prev
                        </button>
                        <span className='text-center px-2 py-2 rounded-md border border-gray-300 ' style={{ margin: '0 15px' }}>
                            Page {page} of {totalPages}
                        </span>
                        <button className={`text-center px-2 py-1 ${page === totalPages ? "bg-gray-100 text-gray-400" : "bg-gray-300 text-black cursor-pointer"} rounded-md`} onClick={handleNext} disabled={page === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Categories
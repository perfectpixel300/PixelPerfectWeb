import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import AdminNav from "./AdminNav"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const CategoryDetail = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [category, setCategory] = useState(null)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const errorRef = useRef(null);

    const [totalPages, setTotalPages] = useState(1)
    const limit = 8

    const [message, setMessage] = useState("")

    useGSAP(() => {
        let tl = gsap.timeline()
        tl.to(errorRef.current, {
            opacity: 1,
            duration: 0.4
        })
        tl.to(errorRef.current, {
            opacity: 0,
            duration: 0.3,
            delay: 2
        })
    }, [message])

    useEffect(() => {
        console.log("Hello Cate dets 111")
        const fetchProducts = async () => {
        console.log("Hello Cate dets 5555")

            setLoading(true)
            setError(null)

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories/${id}?populate=true&page=${page}&limit=${limit}`,
                    {
                        params: {
                            _t: Date.now()
                        }
                    }
                )

                setCategory(response.data)
                setProducts(response.data.products)
                setTotalPages(response.data.pagination.totalPages)
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to fetch products"
                )
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchProducts()
    }, [id, page])

    const handleNext = () => {
        if (page < totalPages) setPage(prev => prev + 1)
    }

    const handlePrev = () => {
        if (page > 1) setPage(prev => prev - 1)
    }


const handleDelete = async () => {
    try {
        await axios.delete(
            `${import.meta.env.VITE_API_URL}/categories/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        navigate("/admin/categories");

    } catch (err) {
        console.log("Error:", err);

        setMessage(
            `Error Deleting Category: ${
                err.response?.data?.message || "Unknown error"
            } : ${Date().toString()}`
        );
    }
};





    return (
        <div>

            <div ref={errorRef} className="bg-red-500 pointer-events-none opacity-0 text-white px-3 py-2 absolute top-1 right-1 text-xs rounded-md">
                {message}
            </div>
            <AdminNav />
            {loading && <div className=" flex items-center min-h-24 justify-center">
                <div className="h-10 w-10 border-t-transparent  animate-spin border-4 rounded-full"></div>
            </div>}
            {
                error && <p>
                    Error: {error}
                </p>
            }
            {(loading || error) ? "" : (
                <div className='md:px-28 px-5'>
                    <div className="py-5 font-semibold text-xl flex items-center justify-between">
                        <h1><span className="capitalize">{category?.name}</span> products</h1>
                        <button onClick={handleDelete} className="text-sm bg-red-500 px-4 text-white py-2 cursor-pointer rounded-full">Delete Category</button>
                    </div>

                    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
                        {products.map((p) => (
                            <Link key={p._id} to={`/admin/edit/${p._id}`}>
                                <div key={p._id} className="bg-gray-200 p-4 rounded-lg">
                                    <div>
                                        <img
                                            src={p.image.url}
                                            alt={p.name}
                                            className="h-36 object-cover w-full rounded-md aspect-square"
                                        />
                                    </div>
                                    <h1 className="text-sm font-semibold leading-none mt-2 truncate">{p.name}</h1>
                                    <div className="text-sm mt-3">{p.price != null ? `$${p.price}` : p.priceText || ""}</div>
                                    <div className="text-xs truncate">{p.description}</div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination (same UI as Categories) */}
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

export default CategoryDetail

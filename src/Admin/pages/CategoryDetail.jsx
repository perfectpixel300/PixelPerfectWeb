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
        const fetchProducts = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/categories/${id}?populate=true&page=${page}&limit=${limit}`)

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
            await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${category.name}`);
            navigate("/admin/categories")

        } catch (err) {
            console.log("Error: " + err)
            setMessage(`Error Deleting Category ${Date().toString()}`)
        }
    }





    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>

            <div ref={errorRef} className="bg-red-500 pointer-events-none opacity-0 text-white px-3 py-2 absolute top-1 right-1 text-xs rounded-md">
                {message}
            </div>
            <AdminNav />
            <div className='px-28'>
                <div className="py-5 font-semibold text-xl flex items-center justify-between">
                    <h1>Category Products</h1>
                    <button onClick={handleDelete} className="text-sm bg-red-500 px-4 text-white py-2 cursor-pointer rounded-full">Delete Category</button>
                </div>

                <div className="grid grid-cols-4 gap-2">
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
                <div className="mt-10 flex justify-center">
                    <button
                        className={`w-28 px-2 py-1 rounded-md ${page === 1
                            ? "bg-gray-100 text-gray-400"
                            : "bg-gray-300 text-black"
                            }`}
                        onClick={handlePrev}
                        disabled={page === 1}
                    >
                        Previous
                    </button>

                    <span
                        className="w-28 text-center px-2 py-1 rounded-md border border-gray-300"
                        style={{ margin: "0 15px" }}
                    >
                        Page {page} of {totalPages}
                    </span>

                    <button
                        className={`w-28 px-2 py-1 rounded-md ${page === totalPages
                            ? "bg-gray-100 text-gray-400"
                            : "bg-gray-300 text-black"
                            }`}
                        onClick={handleNext}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryDetail

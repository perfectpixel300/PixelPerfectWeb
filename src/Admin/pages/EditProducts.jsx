import { useRef, useState, useEffect } from "react"
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AdminNav from "./AdminNav";
import { useParams, useNavigate } from "react-router-dom";

const EditProducts = () => {
    const { id } = useParams()

    const navigate = useNavigate();
    // Refs for uncontrolled inputs
    const nameRef = useRef(null)
    const descriptionRef = useRef(null)
    const categoryRef = useRef(null)
    const priceRef = useRef(null)
    const categoryContainer = useRef(null)

    const popupRef = useRef(null)
    const addCategoryInputRef = useRef(null)
    const addCategoryDescriptionRef = useRef(null)
    const messageRef = useRef(null)
    const confirmRef = useRef(null)

    const [message, setMessage] = useState("")
    const [categories, setCategories] = useState([])
    const [categoryDataID, setcategoryDataID] = useState({})
    const [isLoading, setisLoading] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const [inStock, setInStock] = useState(false)
    const deleteHandler = async () => {
        if (!id) {
            setMessage("Invalid product ID")
            return
        }

        try {
            setIsDeleteLoading(true)
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`, { withCredentials: true })
            setMessage(res.data?.message || "Product deleted")
            // hide confirm modal if present
            if (confirmRef?.current) {
                confirmRef.current.classList.remove("flex")
                confirmRef.current.classList.add("hidden")
            }
            // navigate back to admin list after deletion
            navigate("/admin/")
        } catch (err) {
            console.error("Delete product error:", err)
            setMessage(err?.response?.data?.message || "Failed to delete product")
        } finally {
            setIsDeleteLoading(false)
        }
    }

    useGSAP(() => {
        if (message) {
            let tl = gsap.timeline({
                onComplete: () => {
                    setMessage("")
                }
            });

            tl.to(messageRef.current, {
                duration: 0.3,
                opacity: 1,
                display: "flex"
            })
            tl.to(messageRef.current, {
                duration: 0.3,
                opacity: 0,
                delay: 2,
                display: "none"
            })
        }
    }, [message])

    // Fetch product data and optionally initial categories
    useEffect(() => {
        if (!id) return

        const fetchData = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`, { withCredentials: true }),
                    axios.get(`${import.meta.env.VITE_API_URL}/categories`, { withCredentials: true }).catch(() => ({ data: [] }))
                ])
                const product = prodRes.data
                // populate refs
                if (nameRef.current) nameRef.current.value = product.name || ""
                if (descriptionRef.current) descriptionRef.current.value = product.description || ""
                if (priceRef.current) priceRef.current.value = product.price ?? ""
                setInStock(product.inStock)

                // set category values if available
                if (product.category) {
                    // product.category could be object or id depending on backend
                    const catObj = typeof product.category === "object" ? product.category : catRes.data.find(c => c._id === product.category) || {}
                    setcategoryDataID(catObj)
                    if (categoryRef.current && catObj?.name) categoryRef.current.value = catObj.name
                }

                setCategories(catRes.data || [])
            } catch (err) {
                console.error("Failed fetching product:", err)
                setMessage("Failed to load product")
            }
        }

        fetchData()
    }, [id])

    const handleCategorySearch = (e) => {
        categoryContainer.current.classList.remove("hidden")

        const delay = 300; // ms
        const value = e.target.value;

        if (categoryRef.current?._debounce) {
            clearTimeout(categoryRef.current._debounce)
        }

        categoryRef.current._debounce = setTimeout(() => {
            axios.get(`${import.meta.env.VITE_API_URL}/categories/search?query=${value}`, { withCredentials: true })
                .then(res => {
                    setCategories(res.data)
                })
                .catch(err => {
                    console.error(err)
                })

            delete categoryRef.current._debounce
        }, delay)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const name = nameRef.current?.value?.trim() || ""
        const description = descriptionRef.current?.value?.trim() || ""
        const price = priceRef.current?.value || ""

        if (!name) {
            setMessage("Product name is required")
            return
        }

        if (!categoryDataID || !categoryDataID._id) {
            setMessage("Please select a category")
            return
        }

        const payload = {
            name,
            description,
            inStock,
            price,
            category: categoryDataID._id
        }

        try {
            setisLoading(true)
            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/products/${id}`,
                payload,
                { withCredentials: true }
            )
            setisLoading(false)
            setMessage(res.data?.message || "Product updated")
            // optional: navigate back to product list or detail
            navigate("/admin/")
        } catch (err) {
            console.error("Update product error:", err)
            setMessage(err?.response?.data?.message || "Failed to update product")
            setisLoading(false)
        }
    }

    return (
        <>
            <AdminNav />
            <div className="pb-10">
                <h1 ref={messageRef} className="text-sm z-40 bg-[#A0EDA8] font-medium capitalize fixed top-2 p-2 px-4 rounded-xl right-2 text-black hidden opacity-0">{message}</h1>

                <form onSubmit={handleSubmit} className="pt-5 w-full flex flex-col md:flex-row  gap-5 justify-center md:px-0 lg:px-10  px-0 border-t border-gray-200">
                    <div className="md:w-2/4 w-full">
                        <div className="bg-gray-100/50 p-6 rounded-2xl">
                            <div >
                                <h1 className="text-md font-semibold my-3">General Information</h1>
                                <div className="name flex flex-col  gap-2 w-full  py-1">
                                    <label htmlFor="name" className="text-sm font-semibold text-gray-800">Product Name</label>
                                    <input ref={nameRef} className="p-2 duration-500 bg-gray-200 w-full focus:outline-none rounded-lg text-sm" placeholder="eg: Nike Air Max" id="name" type="text" />
                                </div>
                                <div className="description flex flex-col border-t gap-2  w-full border-gray-200 py-1">
                                    <label htmlFor="description" className="text-sm font-semibold text-gray-800">Description</label>
                                    <textarea ref={descriptionRef} className="p-2 no-scroller min-h-36 bg-gray-200 w-full focus:outline-none rounded-lg text-sm" placeholder="A comfortable and stylish running shoe" id="description" rows="3" onInput={(e) => {
                                        e.target.style.height = "auto";
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                    }}></textarea>
                                </div>

                                <div className="stock flex flex-col border-t gap-2 w-full border-gray-200 py-1">
                                    <label htmlFor="stock" className="text-sm font-semibold text-gray-800">Stock</label>
                                   <div className="flex items-center gap-2 pb-2 text-sm">
                                        <div onClick={()=>setInStock(true)} className={(inStock)?"bg-black text-white px-3 py-1 rounded-md cursor-pointer":"bg-gray-300 px-3 py-1 rounded-md cursor-pointer"}>Yes</div>
                                        <div onClick={()=>setInStock(false)} className={(!inStock)?"bg-black text-white px-3 py-1 rounded-md cursor-pointer":"bg-gray-300 px-3 py-1 rounded-md cursor-pointer"}>No</div>
                                    </div>
                                </div>
                                <div className="price flex flex-col border-t gap-2 w-full border-gray-200 py-1">
                                    <label htmlFor="price" className="text-sm font-semibold text-gray-800">Price</label>
                                    <input ref={priceRef} className="p-2  duration-500 bg-gray-200  w-full focus:outline-none rounded-lg text-sm" placeholder="Rs. XXXX" id="price" type="number" />
                                </div>
                            </div>
                            <div className="bg-gray-100/50 rounded-2xl mt-5">
                                <h1 className="text-md font-semibold my-3">Category</h1>

                                <div className="flex gap-4">
                                    <div className="price relative flex flex-col gap-2  w-full border-gray-200 py-1">
                                        <label htmlFor="category" className="text-sm font-semibold text-gray-800">Product Category</label>
                                        <input onChange={handleCategorySearch} ref={categoryRef} className="p-2  duration-500 bg-gray-200  w-full focus:outline-none rounded-lg text-sm" placeholder="Jacket" id="category" type="text" />
                                        <div ref={categoryContainer} className="absolute w-full top-[100%] rounded-md overflow-hidden hidden">
                                            {categories.map((e) => (
                                                <div key={e._id} onClick={() => {
                                                    setcategoryDataID(e)
                                                    categoryContainer.current.classList.add("hidden")
                                                    if (categoryRef.current) categoryRef.current.value = e.name
                                                }} className="bg-gray-300 text-sm p-1 border-gray-200 border-b cursor-pointer">{e.name}</div>
                                            ))}

                                        </div>
                                        <div className="flex">
                                            <span className={categoryDataID?.name ? "bg-black text-xs p-1 rounded-full px-2 text-white" : ""}>{categoryDataID?.name}</span>
                                        </div>
                                    </div>
                                </div>

                                <p onClick={() => {
                                    popupRef.current.classList.remove("hidden")
                                    popupRef.current.classList.add("flex")
                                }} className="mt-3 inline-block cursor-pointer text-sm focus:outline-none rounded-full bg-[#A0EDA8] text-black font-semibold py-2 px-4">
                                    Add Category
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/3 w-full">
                        <div className="bg-gray-100/50 p-3 rounded-2xl">
                            <div className=" gap-2 flex justify-center">
                                <button type="submit" className="cursor-pointer flex  items-center gap-2 bg-[#A0EDA8] text-xs text-black  py-2 px-4 rounded-full">
                                    Update Product
                                    {isLoading ? <div className=" h-6 w-6 rounded-full border-3 animate-spin border-t-black border-b-black border-r-transparent border-l-transparent"></div> : ""}
                                </button>
                                <div onClick={() => {
                                    confirmRef.current.classList.remove("hidden")
                                    confirmRef.current.classList.add("flex")
                                }} className="cursor-pointer flex  items-center gap-2 bg-red-500 text-xs text-black  py-2 px-4 rounded-full">
                                    Delete Product
                                    {isDeleteLoading ? <div className=" h-6 w-6 rounded-full border-3 animate-spin border-t-black border-b-black border-r-transparent border-l-transparent"></div> : ""}

                                </div>
                            </div>

                        </div>
                        <div ref={confirmRef} className=" hidden bg-gray-100/50 mt-2 text-sm rounded-2xl flex-col items-center p-4">
                            <h1 className="text-sm">This action cannot be undone. Continue?</h1>
                            <div className="flex gap-2 mt-4">
                                <div onClick={() => {
                                    confirmRef.current.classList.add("hidden")
                                    confirmRef.current.classList.remove("flex")}} className=" cursor-pointer border p-1 px-3 rounded-full">Cancel</div>
                                <div onClick={deleteHandler} className=" cursor-pointer bg-red-400 p-1 px-3 rounded-full">Confirm</div>
                            </div>
                        </div>
                    </div>
                </form>

                <div ref={popupRef} className="popup fixed top-0 left-0 w-full h-full bg-gray-900/50 z-20 hidden px-8 items-center backdrop-blur-sm justify-center ">
                    <div className="bg-white lg:w-1/4 md:w-1/3 sm:w-1/2 w-full relative pb-8 pt-6 rounded-3xl flex flex-col justify-center ">
                        <div className="flex justify-between items-center px-5">
                            <div className="text-xl font-semibold text-gray-800">
                                Add Category
                                <div className="text-xs tracking-wide font-medium text-gray-400">
                                    Add a new category to your store
                                </div>
                            </div>

                            <div className="cursor-pointer" onClick={() => {
                                popupRef.current.classList.remove("flex")
                                popupRef.current.classList.add("hidden")
                            }}>
                                <i className="ri-close-fill text-xl"></i>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full px-5 mt-5">
                            <input ref={addCategoryInputRef} minLength={3} type="text" placeholder="Category Name" className="p-2 duration-500 bg-gray-200 w-full focus:outline-none rounded-lg text-sm" />
                            <textarea ref={addCategoryDescriptionRef} placeholder="Short Description" className="p-2 duration-500 resize-none h-24 bg-gray-200 w-full focus:outline-none rounded-lg text-xs"></textarea>
                            <button onClick={() => {
                                let category = addCategoryInputRef.current.value;
                                let categoryDesc = addCategoryDescriptionRef.current.value;
                                if (category.trim() !== "") {
                                    axios.post(`${import.meta.env.VITE_API_URL}/categories`, { name: category, description: categoryDesc }, {
                                        withCredentials: true,
                                    })
                                        .then((res) => {
                                            setMessage("Category Created Successfully");
                                            // update local categories so it is immediately selectable
                                            setCategories(prev => [res.data, ...prev])
                                            popupRef.current.classList.remove("flex");
                                            popupRef.current.classList.add("hidden");
                                            addCategoryInputRef.current.value = "";
                                            addCategoryDescriptionRef.current.value = "";
                                        })
                                        .catch(error => {
                                            console.error("Error adding category:", error);
                                            setMessage("Failed to add category")
                                        });
                                } else {
                                    setMessage("Category name cannot be empty")
                                }
                            }} className="bg-[#A0EDA8] text-sm text-black font-semibold py-2 px-4 rounded-full">
                                Add Category
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProducts

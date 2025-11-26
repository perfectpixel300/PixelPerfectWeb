import { useRef, useState, useEffect } from "react"
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AdminNav from "./AdminNav";

const AddProducts = () => {
    // Refs for simple uncontrolled inputs
    const nameRef = useRef(null)
    const descriptionRef = useRef(null)
    const categoryRef = useRef(null)
    const priceRef = useRef(null)
    const categoryContainer = useRef(null)
    const [inStock, setInStock] = useState(false)


    const mainImageRef = useRef(null)
    const otherImagesRef = useRef(null)
    const popupRef = useRef(null)
    const addCategoryInputRef = useRef(null)
    const addCategoryDescriptionRef = useRef(null)
    const messageRef = useRef(null)

    // Preview urls and file storage
    const [mainImagePreview, setMainImagePreview] = useState(null)
    const [mainImageFile, setMainImageFile] = useState(null)

    const [otherImagePreviews, setOtherImagePreviews] = useState([]) // array of object URLs
    const [otherImageFiles, setOtherImageFiles] = useState([]) // array of File objects

    const [message, setMessage] = useState("")
    const [categories, setCategories] = useState([])
    const [categoryDataID, setcategoryDataID] = useState("")
    const [isLoading, setisLoading] = useState(false)

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

    // Cleanup object URLs when previews change or component unmounts
    useEffect(() => {

        return () => {
            if (mainImagePreview) URL.revokeObjectURL(mainImagePreview)
            otherImagePreviews.forEach(url => URL.revokeObjectURL(url))
        }
    }, [mainImagePreview, otherImagePreviews])


    const handleCategorySearch = (e) => {
        categoryContainer.current.classList.remove("hidden")

        // Debounced category search (stores timeout on the input ref so it persists across renders)
        const delay = 300; // ms
        const value = e.target.value;

        if (categoryRef.current?._debounce) {
            clearTimeout(categoryRef.current._debounce)
        }

        categoryRef.current._debounce = setTimeout(() => {
            // Perform the actual search / action here.
            // Example: simple console log or replace with an axios request to fetch matching categories.
            console.log("Searching categories for:", value)

            // Example axios call (optional):
            axios.get(`${import.meta.env.VITE_API_URL}/categories/search?query=${value}`, { withCredentials: true })
                .then(res => {
                    setCategories(res.data)
                })
                .catch(err => {
                    console.error(err)
                })

            // clear stored timeout id
            delete categoryRef.current._debounce
        }, delay)
    }

    const handleMainImageChange = (event) => {
        const file = event.target.files && event.target.files[0]
        if (file) {
            // revoke previous
            if (mainImagePreview) URL.revokeObjectURL(mainImagePreview)
            const url = URL.createObjectURL(file)
            setMainImagePreview(url)
            setMainImageFile(file)
            // clear the input value so same file can be selected again if needed
            mainImageRef.current.value = null
        }
    }

    const handleOtherImagesChange = (event) => {
        const files = event.target.files ? Array.from(event.target.files) : []
        if (files.length) {
            // revoke previous previews
            otherImagePreviews.forEach(url => URL.revokeObjectURL(url))
            const previews = files.map(f => URL.createObjectURL(f))
            setOtherImagePreviews(previews)
            setOtherImageFiles(files)
            // clear the input so user can re-open/select same files later
            otherImagesRef.current.value = null
        } else {
            // if no files selected, clear
            otherImagePreviews.forEach(url => URL.revokeObjectURL(url))
            setOtherImagePreviews([])
            setOtherImageFiles([])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = nameRef.current?.value?.trim() || ""
        const description = descriptionRef.current?.value?.trim() || ""
        const price = priceRef.current?.value || ""
        
        
        // basic validation
        if (!name) {
            setMessage("Product name is required")
            return
        }
        if (!mainImageFile) {
            setMessage("Main image is required")
            return
        }

        // Build FormData for files + fields
        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("inStock", inStock)
        formData.append("price", price)
        formData.append("category", categoryDataID._id)

        // append main image
        formData.append("image", mainImageFile)

        // append other images (if any)
        otherImageFiles.forEach((file) => {
            // backend may expect array under "otherImages[]", adjust as needed
            formData.append("otherImages", file)
        })

        try {
            setisLoading(true)
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/products`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                }
            )
            setisLoading(false)
            setMessage(response.data?.message || "Product created")
            // clear form UI
            nameRef.current.value = ""
            descriptionRef.current.value = ""
            setInStock(false)
            categoryRef.current.value = ""
            priceRef.current.value = ""
            if (mainImagePreview) URL.revokeObjectURL(mainImagePreview)
            otherImagePreviews.forEach(url => URL.revokeObjectURL(url))
            setMainImagePreview(null)
            setMainImageFile(null)
            setOtherImagePreviews([])
            setOtherImageFiles([])
            setcategoryDataID("");

        } catch (err) {
            console.error("Create product error:", err)
            setMessage(err?.response?.data?.message || "Failed to create product")
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
                                    <input ref={priceRef} className="p-2  duration-500 bg-gray-200  w-full focus:outline-none rounded-lg text-sm" placeholder="Rs. XXXX" id="stock" type="number" />
                                </div>
                            </div>
                            <div className="bg-gray-100/50 rounded-2xl mt-5">
                                <h1 className="text-md font-semibold my-3">Category</h1>

                                <div className="flex gap-4">
                                    <div className="price relative flex flex-col gap-2  w-full border-gray-200 py-1">
                                        <label htmlFor="category" className="text-sm font-semibold text-gray-800">Product Category</label>
                                        <input onChange={handleCategorySearch} ref={categoryRef} className="p-2  duration-500 bg-gray-200  w-full focus:outline-none rounded-lg text-sm" placeholder="Jacket" id="category" type="text" />
                                        <div ref={categoryContainer} className="absolute w-full top-[100%] rounded-md overflow-hidden">
                                            {categories.map((e) => (
                                                <div key={e._id} onClick={() => {
                                                    setcategoryDataID(e)
                                                    categoryContainer.current.classList.add("hidden")
                                                }} className="bg-gray-300 text-sm p-1 border-gray-200 border-b cursor-pointer">{e.name}</div>
                                            ))}

                                        </div>
                                        <div className="flex">
                                            <span className={categoryDataID ? "bg-black text-xs p-1 rounded-full px-2 text-white" : ""}>{categoryDataID.name}</span>
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
                        <div className="bg-gray-100/50 p-6 rounded-2xl">
                            <div className="main-image flex flex-col  gap-2  w-full">
                                <label htmlFor="mainImage" className="text-md font-semibold text-gray-800">Upload Image</label>

                                <input
                                    className="p-2 hidden border-2 duration-500 border-gray-300 w-full focus:outline-none rounded-lg text-sm"
                                    id="mainImage"
                                    type="file"
                                    accept="image/*"
                                    ref={mainImageRef}
                                    onChange={handleMainImageChange}
                                />

                                <div className="w-full ">
                                    <button
                                        type="button"
                                        onClick={() => { document.getElementById("mainImage").click() }}
                                        className=" relative  w-full aspect-square focus:outline-none justify-center items-center rounded-2xl border-2 border-dotted border-gray-300 bg-gray-100/50 hover:bg-gray-100 text-gray-800"
                                    >
                                        <div className="preview w-full h-full absolute top-0 z-10">
                                            {
                                                (mainImagePreview ? <img src={mainImagePreview} className="w-full h-full object-cover rounded-2xl scale-[102%]" loading="lazy" style={{ imageRendering: "auto" }} /> : "")
                                            }
                                        </div>
                                        <span className="text-3xl text-gray-500 border-gray-300 leading-none h-14 w-14 text-center content-center border-dotted border-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute rounded-full" >+</span>
                                    </button>
                                </div>
                            </div>

                            <div className="other-images flex flex-col gap-3 pt-3 w-full pb-2">
                                <label className="text-sm font-semibold text-gray-800">Other Images (select multiple)</label>

                                <input
                                    className="p-2 hidden border duration-500 border-gray-300 w-full focus:outline-none rounded-lg text-sm"
                                    id="otherImages"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    ref={otherImagesRef}
                                    onChange={handleOtherImagesChange}
                                />

                                <div className="flex flex-col gap-2 items-center">
                                    <button
                                        type="button"
                                        onClick={() => { document.getElementById("otherImages").click() }}
                                        className="px-3 py-2 rounded-md bg-gray-200 text-sm"
                                    >
                                        Select Other Images
                                    </button>

                                    <div className="grid gap-2 grid-cols-3 overflow-x-auto">
                                        {otherImagePreviews.map((src, idx) => (
                                            <div key={idx} className="w-24 h-24 relative rounded-lg overflow-hidden border">
                                                <img src={src} alt={`other-${idx}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button type="submit" className=" cursor-pointer flex  items-center gap-2 bg-[#A0EDA8] text-sm text-black font-semibold py-2 px-4 rounded-full">
                                    Create Product
                                    {isLoading ? <div className=" h-6 w-6 rounded-full border-3 animate-spin border-t-black border-b-black border-r-transparent border-l-transparent"></div> : ""}
                                </button>
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
                                        .then(() => {
                                            setMessage("Category Created Successfully");
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

export default AddProducts

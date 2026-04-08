import axios from "axios";
import { useState } from "react";

const Banner = ({ image, title, desc, link, id, handleDeleteBanner }) => {
    const [name, setName] = useState(title);
    const [description, setDescription] = useState(desc)
    const [linked, setLinked] = useState(link)

    const [storeName, setStoreName] = useState(title);
    const [storeDesc, setStoreDesc] = useState(desc);
    const [storeLink, setSetstoreLink] = useState(link);

    const [editable, setEditable] = useState(false)

    const [isDeleteLoading, setIsDeleteLoading] = useState(false)



    const rollBack = () => {
        setName(storeName);
        setDescription(storeDesc)
        setLinked(storeLink);
        setEditable(false);
    }

    const startEdit = () => {
        setName(storeName);
        setDescription(storeDesc);
        setLinked(storeLink);
        setEditable(true);
    };


    const handleSave = async () => {
        try {
            console.log({
                title: name,
                desc: description,
                link: linked
            })
            let res = await axios.put(`${import.meta.env.VITE_API_URL}/banners/${id}`, {
                title: name,
                desc: description,
                link: linked
            }, {
                withCredentials: true
            })
            console.log(res)
            setSetstoreLink(res.data.banner.link)
            setStoreDesc(res.data.banner.desc)
            setStoreName(res.data.banner.title)

            setEditable(false)
        } catch (error) {
            console.error('Error saving banner:', error)
        }
    }

    const handleDelete = async () => {
        setIsDeleteLoading(true)
        try {
            let res = await axios.delete(`${import.meta.env.VITE_API_URL}/banners/${id}`, {
                withCredentials: true
            })
            console.log(res)
            if (res.status == 200) {
                handleDeleteBanner(id);
            }
            setIsDeleteLoading(false)
        } catch (error) {
            setIsDeleteLoading(false)
            console.error('Error saving banner:', error)
        }
    }

    return (
        <>
            <div className='h-[80vh] group relative w-full bg-gray-200  rounded-3xl overflow-hidden'>
                <div className='header group-hover:flex flex sm:hidden justify-between py-4  px-4 absolute top-0 w-full z-60 '>
                    <div className='flex items-center gap-1'>
                        {editable && (
                            <button onClick={handleSave} className='text-xs cursor-pointer bg-black flex items-center rounded-full text-white px-1 pl-4 gap-2 py-1'>
                                Save
                                <div className='p-1 h-7 w-7 rounded-full flex items-center justify-center bg-gray-400'>
                                    <i className="ri-upload-fill"></i>
                                </div>
                            </button>
                        )}
                    </div>
                    <div className='flex items-center gap-1'>
                        {editable && (
                            <button onClick={rollBack} className='text-xs cursor-pointer bg-black flex items-center rounded-full text-white px-1 pl-4 gap-2 py-1'>
                                Cancel
                                <div className='p-1 h-7 w-7 rounded-full flex items-center justify-center bg-gray-400'>
                                    <i className="ri-close-line text-xl"></i>
                                </div>
                            </button>
                        )}
                        <button onClick={startEdit} className='text-xs cursor-pointer bg-black flex items-center rounded-full text-white px-1 pl-4 gap-2 py-1'>
                            Edit
                            <div className='p-1 h-7 w-7 rounded-full flex items-center justify-center bg-gray-400'>
                                <i className="ri-quill-pen-fill"></i>
                            </div>
                        </button>
                    </div>
                </div>
                <div className='header  group-hover:flex flex sm:hidden justify-end py-4  px-4 absolute bottom-0 right-0 z-60 '>
                    {editable && (
                        <button onClick={handleDelete} className='text-xs cursor-pointer bg-red-500 flex items-center rounded-full text-white px-1 pl-4 gap-2 py-1'>
                            Delete
                            <div className='p-1 h-7 w-7 rounded-full flex items-center justify-center bg-black'>

                                {
                                    (isDeleteLoading) ? <div className='h-5 w-5 border-2 border-white border-t-transparent animate-spin rounded-full'></div> : <i className="ri-close-line text-xl"></i>
                                }
                            </div>
                        </button>
                    )}
                </div>
                <img src={image} alt={title} className='h-full w-full object-cover opacity-85 -z-10' />
                <div className='text-black absolute  z-50 top-0 left-0 w-full h-full flex flex-col justify-center lg:px-30 md:px-20 px-10'>
                    <input placeholder='Your Title' disabled={!editable} onChange={e => setName(e.target.value)} type="text" value={name} className='md:text-5xl text-3xl pb-4 w-fit field-sizing-content font-semibold no-scroller border-none focus:outline-0' />
                    <textarea placeholder='Your Description' disabled={!editable} onChange={e => setDescription(e.target.value)} type="text" value={description} className='text-sm md:w-1/2 h-40 no-scroller  focus:outline-0' >

                    </textarea>
                    <div className='bg-black absolute bottom-10 focus flex items-center px-1 gap-2 pr-4 py-1 rounded-full text-white'>
                        <div className='p-1 h-7 w-7 rounded-full flex items-center justify-center bg-gray-400'>
                            <i className="ri-arrow-right-up-line"></i>
                        </div>
                        <input disabled={!editable} type="text" value={linked} onChange={e => setLinked(e.target.value)} className='text-xs no-scroller field-sizing-content focus:outline-0 ' />
                    </div>
                </div>
            </div>
        </>
    )
}


export default Banner
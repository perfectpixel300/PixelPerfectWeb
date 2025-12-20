import { useState, useEffect, useRef } from 'react'
import AdminNav from './AdminNav'
import axios from 'axios'
import Banner from './Banner'

const Banners = () => {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [createState, setCreateState] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  const [linked, setLinked] = useState("")
  const [image, setImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)

  const imageInputRef = useRef("");




  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/banners`)
        const data = await response.json()
        setBanners(data.banners)
        console.log(data.banners)
      } catch (error) {
        console.error('Error fetching banners:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBanners()
  }, [])

  const cancelCreate = () => {
    setDescription("");
    setName("");
    setLinked("");
    setImage("");
    setImagePreview(null);
    setCreateState(false);
  }

  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      // revoke previous
      if (imagePreview) URL.revokeObjectURL(imagePreview)
      const url = URL.createObjectURL(file)
      setImagePreview(url)
      setImage(file)
      imageInputRef.current.value = null
    }
  }


  const handleUpload = async () => {
    setIsLoading(true)
    if (!name || !image || !linked || !description) {
      alert('Please fill all fields')
      setIsLoading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append('title', name)
      formData.append('desc', description)
      formData.append('link', linked)
      formData.append('image', image)

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/banners`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
      )

      setBanners([...banners, response.data.banner])
      cancelCreate()
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('Error uploading banner:', error)
      alert('Failed to create banner')
    }
  }

  const handleDeleteBanner = (id) => {
    setBanners(banners.filter(banner => banner._id !== id))
  }

  return (
    <>
      <AdminNav />
      <div className="md:px-20 px-5 ">
        <div className='bg-gray-200 p-2 flex justify-between items-center rounded-2xl'>
          <h1 className='px-4 font-semibold uppercase'>All Banners</h1>
          <div className='flex items-center gap-1'>
            {
              createState && <div onClick={cancelCreate} className='bg-black cursor-pointer text-white p-2 px-3 rounded-xl text-xs'>Cancel</div>
            }
            <div onClick={() => setCreateState(true)} className='bg-black cursor-pointer text-white p-2 px-3 rounded-xl text-xs'>Create new Banner</div>
          </div>
        </div>
        {
          createState && (
            <>
              <div className='h-[80vh] mt-5 group relative w-full bg-gray-200  rounded-3xl overflow-hidden'>
                <div className='header group-hover:flex  justify-end flex sm:hidden  py-4  px-4 absolute top-0 w-full z-60 '>

                  <button onClick={handleUpload} className='text-xs cursor-pointer bg-black flex items-center rounded-full text-white px-1 pl-4 gap-2 py-1'>
                    Save
                    <div className=' h-7 w-7 rounded-full flex items-center justify-center bg-gray-400'>
                      {
                        (isLoading) ? <div className='h-5 w-5 border-2 border-black border-t-transparent animate-spin rounded-full'></div> : <i className="ri-save-line text-black text-xl"></i>
                      }
                    </div>
                  </button>
                </div>

                <img src={imagePreview} className='h-full w-full object-cover opacity-85 -z-10' />
                <div className='text-black absolute  z-50 top-0 left-0 w-full h-full flex flex-col justify-center lg:px-30 md:px-20 px-10'>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder='Your Title' type="text" className='md:text-5xl text-3xl pb-4 w-fit field-sizing-content font-semibold no-scroller border-none focus:outline-0' />
                  <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder='Your Description' type="text" className='text-sm md:w-1/2 h-40 no-scroller  focus:outline-0' >

                  </textarea>
                  <div className='absolute flex flex-col gap-1 bottom-10'>
                    <input ref={imageInputRef} onChange={handleImageChange} type="file" className='hidden' />
                    <div onClick={() => imageInputRef.current.click()} className='bg-black cursor-pointer focus flex items-center px-1 gap-2 pr-4 py-1 rounded-full text-white'>
                      <div className='p-1 h-7 w-7 rounded-full flex items-center justify-center bg-gray-400'>
                        <i className="ri-image-circle-line"></i>
                      </div>
                      <p className='text-xs no-scroller text-gray-500 field-sizing-content focus:outline-0 '>Click to Insert Image</p>
                    </div>
                    <div className='bg-black  focus flex items-center px-1 gap-2 pr-4 py-1 rounded-full text-white'>

                      <div className='p-1 h-7 w-7 rounded-full flex items-center justify-center bg-gray-400'>
                        <i className="ri-arrow-right-up-line"></i>
                      </div>
                      <input value={linked} onChange={e => setLinked(e.target.value)} placeholder='Your Link Here' type="text" className='text-xs no-scroller field-sizing-content focus:outline-0 ' />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }
        <div className='flex flex-col gap-4  pt-5 pb-10'>
          {loading && <p>Loading...</p>}
          {banners.length == 0 && <p className='text-gray-400 text-sm text-center mt-10'>No Banners to List</p>}
          {banners?.map(banner => (
            <Banner handleDeleteBanner={handleDeleteBanner} key={banner._id} title={banner.title} id={banner._id} image={banner.image} desc={banner.desc} link={banner.link} />
          ))}
        </div>
      </div>
    </>
  )
}




export default Banners
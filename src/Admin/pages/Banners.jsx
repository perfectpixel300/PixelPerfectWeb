import { useState, useEffect } from 'react'
import AdminNav from './AdminNav'
import axios from 'axios'

const Banners = () => {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <>
      <AdminNav />
      <div className="md:px-20 px-5 ">
        <div className='flex flex-col gap-4 py-10'>
          {loading && <p>Loading...</p>}
          {banners.length == 0 && <p className='text-gray-400 text-sm text-center mt-10'>No Banners to List</p>}
          {banners?.map(banner => (
            <Banner key={banner._id} title={banner.title} id={banner._id} image={banner.image} desc={banner.desc} link={banner.link} />
          ))}
        </div>
      </div>
    </>
  )
}



const Banner = ({ image, title, desc, link, id }) => {
  const [name, setName] = useState(title);
  const [description, setDescription] = useState(desc)
  const [linked, setLinked] = useState(link)

  const [storeName, setStoreName] = useState(title);
  const [storeDesc, setStoreDesc] = useState(desc);
  const [storeLink, setSetstoreLink] = useState(link);

  const [editable, setEditable] = useState(false)



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

  return (
    <>
      <div className='h-[80vh] group relative w-full bg-gray-200  rounded-3xl overflow-hidden'>
        <div className='header group-hover:flex flex sm:hidden justify-between py-4 lg:px-30 md:px-20 px-4 absolute top-0 w-full z-60 '>
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

export default Banners
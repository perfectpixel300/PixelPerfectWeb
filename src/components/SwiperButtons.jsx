import { useSwiper } from 'swiper/react'
import { Link } from "react-router-dom";

const SwiperButtons = ({ title }) => {
    const swiper = useSwiper();

    return (
        <div className="flex w-full items-start py-4 justify-between absolute top-0 z-10">
            <div className='w-[200px] md:w-auto'>
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className='text-xs text-[#52b345] pt-1'>for more products click all products.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <div className='flex gap-2'>
                    <button className="flex cursor-pointer bg-[#f1f1f1] shadow-xs duration-300 hover:bg-[#52b345] hover:text-[#ffffff] w-8 h-8 md:w-10 md:h-10 text-lg md:text-xl rounded-full items-center justify-center" onClick={() => swiper.slidePrev()}>
                        <i class="ri-arrow-left-long-line"></i>
                    </button>
                    <button className="flex cursor-pointer bg-[#f1f1f1] shadow-xs duration-300 hover:bg-[#52b345] hover:text-[#ffffff] w-8 h-8 md:w-10 md:h-10 text-lg md:text-xl rounded-full items-center justify-center" onClick={() => swiper.slideNext()}>
                        <i class="ri-arrow-right-long-line"></i>
                    </button>
                </div>
                <div className="">
                    <Link className='flex w-full md:w-[120px] items-center justify-center text-center text-[#222222] hover:text-[#ffffff] bg-[#f1f1f1] shadow-xs duration-300 hover:bg-[#52b345] text-xs px-2 py-3 md:px-4 rounded-lg' to="/products">All products</Link>
                </div>
            </div>
        </div>
    )
}

export default SwiperButtons
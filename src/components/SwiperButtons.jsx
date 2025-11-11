import { useSwiper } from 'swiper/react'
import { Link } from "react-router-dom";

const SwiperButtons = ({ title }) => {
    const swiper = useSwiper();

    return (
        <div className="flex w-full items-center py-4 justify-between absolute top-0 z-10">
            <div className='w-[200px] md:w-auto'>
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className='text-xs text-[#52b345] pl-1'>for more products click all products.</p>
            </div>
            <div className="flex gap-2">
                <button className="hidden md:flex cursor-pointer bg-[#e2e2e2] duration-300 hover:bg-[#52b345] hover:text-[#ffffff] w-10 h-10 text-xl rounded-full items-center justify-center" onClick={() => swiper.slidePrev()}>
                    <i class="ri-arrow-left-long-line"></i>
                </button>
                <button className="hidden md:flex cursor-pointer bg-[#e2e2e2] duration-300 hover:bg-[#52b345] hover:text-[#ffffff] w-10 h-10 text-xl rounded-full items-center justify-center" onClick={() => swiper.slideNext()}>
                    <i class="ri-arrow-right-long-line"></i>
                </button>
                <div className="flex w-[70px] md:w-[120px] items-center justify-center text-center text-[#222222] hover:text-[#ffffff] bg-[#e2e2e2] duration-300 hover:bg-[#52b345] text-xs px-2 py-1 md:px-4 md:py-2 rounded-lg">
                    <Link to="/products">All products</Link>
                </div>
            </div>
        </div>
    )
}

export default SwiperButtons
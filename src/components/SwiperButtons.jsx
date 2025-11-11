import { useSwiper } from 'swiper/react'

const SwiperButtons = ({ title }) => {
    const swiper = useSwiper();

    return (
        <div className="flex w-full items-center py-4 justify-between absolute top-0 z-10">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <div className="flex gap-2">
                <button className="cursor-pointer bg-[#dddddd] w-10 h-10 text-xl rounded-full" onClick={() => swiper.slidePrev()}>
                    <i class="ri-arrow-left-long-line"></i>
                </button>
                <button className="cursor-pointer bg-[#dddddd] w-10 h-10 text-xl rounded-full" onClick={() => swiper.slideNext()}>
                    <i class="ri-arrow-right-long-line"></i>
                </button>
            </div>
        </div>
    )
}

export default SwiperButtons
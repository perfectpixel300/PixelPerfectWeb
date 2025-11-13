import { Link } from "react-router-dom"
import background from "../assets/background.jpg"

const PageHeading = ({ title, desc, nav, link }) => {
    return (
        <div>
            <div className="w-full h-[180px] md:h-[240px] md:mt-10 shadow-lg overflow-hidden relative cursor-default text-shadow-lg">
                <img className="w-full h-full object-cover" src={background} alt="background" />
                <div className="absolute flex gap-2 md:gap-5 items-center z-10 bottom-8 left-5 md:left-10 text-white w-full">
                    <Link to={link} className="text-2xl md:text-5xl font-bold hover:text-[#52b345] duration-300">{nav}</Link>
                    <div className="h-[70px] md:h-[120px] rounded-full w-[3px] md:w-[5px] bg-white"></div>
                    <div className="">
                        <h1 className="text-3xl md:text-6xl font-bold"> {title}</h1>
                        <p className="text-sm w-[90%] md:text-xl font-light">{desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageHeading
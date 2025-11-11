import { Link } from "react-router-dom"
import background from "../assets/background.jpg"

const PageHeading = ({ title, desc }) => {
    return (
        <div>
            <div className="w-full h-[15vh] md:h-[30vh] overflow-hidden relative cursor-default">
                <img className="w-full object-cover" src={background} alt="background" />
                <div className="absolute flex gap-5 items-center z-10 bottom-2 left-5 md:left-10 text-black w-full">
                    <Link to="/" className="text-2xl md:text-5xl font-bold hover:text-[#52b345] duration-300">Home</Link>
                    <div className="h-[70px] md:h-[120px] rounded-full w-[5px] bg-black"></div>
                    <div>
                        <h1 className="text-3xl md:text-6xl font-bold"> {title}</h1>
                        <p className="text-sm w-[90%] md:text-xl font-light">{desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageHeading
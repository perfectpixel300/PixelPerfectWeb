import background from "../assets/background.jpg"

const PageHeading = ({title, desc}) => {
    return (
        <div>
            <div className="w-full h-[15vh] md:h-[30vh] overflow-hidden relative cursor-default">
                <img className="w-full object-cover" src={background} alt="background" />
                <div className="absolute z-10 bottom-2 left-5 md:left-10 text-[#222222] w-full">
                    <h1 className="text-3xl md:text-6xl">{title}</h1>
                    <p className="text-sm w-[90%] md:text-xl pl-1 font-light">{desc}</p>
                </div>
            </div>
        </div>
    )
}

export default PageHeading
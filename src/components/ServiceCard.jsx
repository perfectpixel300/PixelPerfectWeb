const ServiceCard = ({ service }) => {
    return (
        <div className="h-[250px] w-full md:w-[250px] relative border border-[#bbbbbb] cursor-default rounded-3xl text-[#222222] hover:shadow-md shadow-[#444444] duration-300">
            <i className={`${service.icon} text-3xl absolute top-14 left-4 border-[1px] w-12 h-12 flex items-center justify-center text-[#222222] border-[#bbbbbb] rounded-full p-1`}></i>
            <div className="absolute top-32 px-4 flex flex-col gap-1">
                <h1 className="text-xl text-[#222222]">{service.name}</h1>
                <p className="text-xs font-light text-[#444444]">{service.description}</p>
            </div>
        </div>
    )
}

export default ServiceCard
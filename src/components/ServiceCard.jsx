const ServiceCard = ({ service }) => {
    return (
        <div className="h-[250px] w-[300px] relative bg-gradient-to-b from-[#33D5BC] to-[#f1fffd] rounded-3xl text-[#222222]">
            <i className={`${service.icon} text-4xl absolute top-5 left-4`}></i>
            <div className="absolute top-32 px-4 flex flex-col gap-1">
                <h1 className="text-xl">{service.name}</h1>
                <p className="text-xs font-light">{service.description}</p>
            </div>
        </div>
    )
}

export default ServiceCard
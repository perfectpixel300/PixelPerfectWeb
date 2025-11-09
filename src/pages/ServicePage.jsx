import background from "../assets/background.jpg"
import ServiceCard from "../components/ServiceCard"
import { services } from "../context"

const ServicePage = () => {
  return (
    <>
      <div className="pt-16">
        <div className="">
          <div className="w-full h-[15vh] md:h-[30vh] overflow-hidden relative cursor-default">
            <img className="w-full object-cover" src={background} alt="background" />
            <div className="absolute z-10 bottom-2 left-5 md:left-10 text-[#222222] w-full">
              <h1 className="text-3xl md:text-6xl">Our Services</h1>
              <p className="text-sm w-[90%] md:text-xl pl-1 font-light">From paper to pixels — we bring creativity to life.</p>
            </div>
          </div>
          <div className="px-10">
            <p className="pt-20 md:pl-20 text-3xl">What we offer</p>
            <div className="flex flex-col md:flex-row flex-wrap py-5 gap-2 md:gap-5 items-center justify-center">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServicePage
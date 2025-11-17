import PageHeading from "../components/PageHeading"
import ServiceCard from "../components/ServiceCard"
import { services } from "../context"

const ServicePage = () => {
  return (
    <>
      <div className="pt-16 md:pt-12">
        <div className="">
          <PageHeading title="Our Services" nav="Home" link="/" desc="Get professional solutions tailored to your needs." />
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
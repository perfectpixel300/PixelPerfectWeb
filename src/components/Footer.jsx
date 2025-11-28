import { Link } from "react-router-dom"
import { navLinks, socials } from "../context"
import esewa from "../assets/esewa.png"
import khalti from "../assets/khalti.png"
import fonePay from "../assets/phonePay.png"


const Footer = () => {
    return (
        <>
            <div className="w-full overflow-x-hidden flex flex-col items-center relative mt-10 md:mt-14">


                <div className="bg-[#000000] text-[#ffffff] p-6 md:px-10 px-4  w-[95%] rounded-4xl rounded-bl-none rounded-br-none flex flex-col md:flex-row items-start  justify-end md:justify-between md:gap-10 ">
                    <div className="flex flex-col gap-4 ">
                        <div className="flex items-start">
                            <Link to="/" className="flex items-center justify-center">
                                <img
                                    className="h-[60px] lg:h-[60px]"
                                    src="/logo.png"
                                    alt="Pixel Perfect"
                                />
                                <p className="text-lg md:text-2xl">Pixel Perfect Studio and Stationery | Gifts | Printing Press</p>
                            </Link>
                        </div>
                        <Link target="_blank" to={"https://maps.app.goo.gl/Ahn3jxWb9XwTppEB7"}>
                            <div className="flex gap-9 font-light items-center tracking-wide  text-sm pl-5">

                                <div>
                                    <p>Mahalaxmi-08</p>
                                    <p>Devisthan, 44708</p>
                                    <p>Lubhu, Lalitpur</p>
                                </div>
                                <div className="flex flex-col  gap-2">
                                    <div className="h-12 w-12 bg-white rounded-xl p-1">
                                        <img className="" src="/maps-logo.png" alt="PerfectPixel in Map" />
                                    </div>
                                    <p className="text-xs leading-none text-left">Click Here <br /> for Location</p>
                                </div>
                            </div>
                        </Link>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-10 text-sm pl-5">
                            <div className="flex flex-col">
                                <p className="text-[#999999] py-1 font-semibold">Phone</p>
                                <Link to="tel:+977-9845991878" target="_blank">+977-9845991878</Link>
                                <Link to="tel:+977-9805633013" target="_blank">+977-9805633013</Link>
                            </div>
                            <div>
                                <p className="text-[#999999] py-1 font-semibold">Email</p>
                                <p>perfectpixel300@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:h-1/2 pt-5 md:pt-0 pl-5 md:pl-0 gap-14">
                        <div className="flex flex-col">
                            <p className="pb-1 text-[#999999]  font-semibold">Quick Links</p>
                            {navLinks.map((navLinks, index) => (
                                <div className="font-light text-sm" key={index}>
                                    <Link to={navLinks.link}>{navLinks.id}</Link>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <p className="pb-1 text-[#999999] font-semibold">Socials</p>
                            {socials.map((navLinks, index) => (
                                <div className="font-light text-sm" key={index}>
                                    <Link to={navLinks.link} target="_blank">{navLinks.id}</Link>
                                </div>
                            ))}
                        </div>
                        <div className="hidden [@media(min-width:1000px)]:flex items-center gap-3 font-semibold flex-col">
                            <p className="cursor-default">We Accept</p>
                            <div className="flex flex-col gap-2">
                                <div className="bg-white rounded-lg h-[40px] w-[150px] flex items-center justify-center" >
                                    <img className="object-cover h-[30px]" src={esewa} alt="esewa.img" />
                                </div>
                                <div className="bg-white rounded-lg h-[40px] w-[150px] flex items-center justify-center" >
                                    <img className="object-cover h-[30px]" src={fonePay} alt="fonepay.img" />
                                </div>
                                <div className="bg-white rounded-lg h-[40px] w-[150px] flex items-center justify-center" >
                                    <img className="object-cover h-[30px]" src={khalti} alt="khalti.img" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:hidden items-center gap-3 font-semibold flex-col pt-10 w-full">
                        <p className="cursor-default">We Accept</p>
                        <div className="flex gap-2">
                            <div className="bg-white rounded-lg h-[40px] w-[80px] flex items-center justify-center" >
                                <img className="object-cover h-[20px]" src={esewa} alt="esewa.img" />
                            </div>
                            <div className="bg-white rounded-lg h-[40px] w-[80px] flex items-center justify-center" >
                                <img className="object-cover h-[20px]" src={fonePay} alt="fonepay.img" />
                            </div>
                            <div className="bg-white rounded-lg h-[40px] w-[80px] flex items-center justify-center" >
                                <img className="object-cover h-[20px]" src={khalti} alt="khalti.img" />
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
        </>
    )
}

export default Footer
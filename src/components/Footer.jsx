import { Link } from "react-router-dom"
import { navLinks, socials } from "../context"
import esewa from "../assets/esewa.png"
import khalti from "../assets/khalti.png"
import fonePay from "../assets/phonePay.png"


const Footer = () => {
    return (
        <>
            <div className="md:h-screen w-full overflow-x-hidden flex flex-col items-center relative mt-10 md:mt-40">
                <div className="hidden md:flex border border-[#b4b4b4] h-[300px] md:h-[50%] w-[80%] z-10 rounded-4xl bg-gradient-to-r from-purple-500 via-[#222222] to-[#000000]">
                    <div className="hidden md:flex flex-col text-[#ffffff] h-full justify-center w-1/2 px-10">
                        <h1 className="text-2xl font-bold">Our Store Location</h1>
                        <p className="text-sm">We’re easy to find and always ready to welcome you!</p>
                        <p className="text-sm mt-4 py-2 cursor-default w-[100px] rounded-lg flex items-center justify-center bg-[#ffffff] text-[#222222]">Visit Us!</p>
                    </div>
                    <div className="md:w-1/2 p-4 md:p-5 w-full">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.445272180274!2d85.37673757479882!3d27.641692228385462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb11007a3e994b%3A0x95a46c02f158603d!2sPixel%20Perfect%20Studio%20and%20Stationery!5e0!3m2!1sen!2snp!4v1762785618676!5m2!1sen!2snp"
                            width="100%"
                            height="100%"
                            allowFullScreen=""
                            loading="lazy"
                            className="border-0"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Store Location"
                        ></iframe>
                    </div>
                </div>
                <div className="bg-[#000000] text-[#ffffff] md:h-[70%] w-[95%] rounded-4xl md:absolute bottom-2 flex flex-col md:flex-row items-start md:items-end justify-end md:justify-between pt-12 md:pt-0 pb-12 px-5 md:px-10 md:gap-10 ">
                    <div className="flex flex-col gap-4 md:h-1/2">
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
                        <div className="flex flex-col font-light tracking-wide text-[#999999] text-sm pl-5 cursor-default">
                            <p>J94H+MP3</p>
                            <p>Mahalaxmi-08</p>
                            <p>Devisthan 44708</p>
                            <p>Lubhu, Lalitpur</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-10 text-sm pl-5">
                            <div className="flex flex-col">
                                <p className="text-[#999999] py-1 font-semibold">Phone</p>
                                <Link>+977-9845991878</Link>
                                <Link>+977-9805633013</Link>
                            </div>
                            <div>
                                <p className="text-[#999999] py-1 font-semibold">Email</p>
                                <p>perfectpixel300@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:h-1/2 pt-5 md:pt-0 pl-5 md:pl-0 gap-10">
                        <div className="flex flex-col">
                            <p className="pb-1 text-[#999999] font-semibold">Quick Links</p>
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
                <div className="flex md:hidden w-screen px-2 py-5">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.445272180274!2d85.37673757479882!3d27.641692228385462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb11007a3e994b%3A0x95a46c02f158603d!2sPixel%20Perfect%20Studio%20and%20Stationery!5e0!3m2!1sen!2snp!4v1762785618676!5m2!1sen!2snp"
                        width="100%"
                        height="300px"
                        allowFullScreen=""
                        loading="lazy"
                        className="border-0"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Store Location"
                    ></iframe>
                </div>
            </div>
            <h1 className="w-full cursor-default flex items-center justify-center py-2 underline underline-offset-4 font-semibold text-[#222222]">© PixelPerfect. All Rights Reserved.</h1>
        </>
    )
}

export default Footer
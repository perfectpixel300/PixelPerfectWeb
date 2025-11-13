import React from 'react'
import { Link } from 'react-router-dom'
import gmail from "../assets/gmailAnimated.png"
import whatsapp from "../assets/whatsappAnimated.png"
import messenger from "../assets/messengerAnimated.png"

const HoverButton = () => {
    return (
        <div className='fixed bottom-0 z-[99] right-1/2 translate-x-1/2 md:translate-x-0 md:right-0 '>
            <div className='flex flex-row md:flex-col'>
                <Link className='w-[70px] h-[70px] ' to="https://wa.me/9845991878?text=Hello!%20I%20want%20to%20know%20more%20about%20your%20products/services." target='_blank'>
                    <img className='h-full w-full object-cover' src={whatsapp} alt="whatsapp" />
                </Link>
                <Link className='w-[70px] h-[70px] ' to="https://m.me/pixelperfectstationery?text=Hello!%20I%20want%20to%20know%20more%20about%20your%20products/services." target='_blank'>
                    <img className='h-full w-full object-cover' src={messenger} alt="messenger" />
                </Link>
                <Link className='w-[70px] h-[70px] flex md:hidden' to="mailto:perfectpixel300@gmail.com" target='_blank'>
                    <img className='h-full w-full object-cover' src={gmail} alt="gmail" />
                </Link>
                <Link className='w-[70px] h-[70px] hidden md:flex' to="https://mail.google.com/mail/?view=cm&fs=1&to=perfectpixel300@gmail.com" target='_blank'>
                    <img className='h-full w-full object-cover' src={gmail} alt="gmail" />
                </Link>
            </div>
        </div>
    )
}

export default HoverButton
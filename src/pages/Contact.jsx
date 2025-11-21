import React from 'react'
import PageHeading from '../components/PageHeading'

const Contact = () => {
  return (
    <>
      <div className='pt-16 md:pt-12'>
        <PageHeading title="Contact" nav="Home" link="/" desc="Connect with us for custom gifts, prints, or tech support." />
        <div className='px-4 md:px-10 py-10'>
          <div className='flex w-full flex-col items-center justify-center'>
            <p className='text-sm md:text-xl text-center w-2/3 '>Contact us for any questions. We're here to help you find exactly what you need.</p>
            <div className='flex p-5 w-full md:w-1/2'>
              <form className='flex w-full justify-center items-center flex-col gap-4' action="https://formsubmit.co/perfectpixel300@gmail.com" method="POST">
                <input className='bg-[#DCD8CE] focus:outline-[1px] outline-[#dddddd] focus:bg-[#F3F0EA] duration-300 w-full rounded-lg px-5 py-4' type="text" name="name" id="name" placeholder='Full name*' />
                <div className='flex flex-col md:flex-row gap-4 w-full'>
                  <input className='bg-[#DCD8CE] focus:outline-[1px] outline-[#dddddd] focus:bg-[#F3F0EA] duration-300 rounded-lg px-5 py-4 md:w-1/2' type="email" name="email" id="email" placeholder='Email*' />
                  <input className='bg-[#DCD8CE] focus:outline-[1px] outline-[#dddddd] focus:bg-[#F3F0EA] duration-300 rounded-lg px-5 py-4 md:w-1/2' type="tel" name="phone" id="phone" placeholder='Phone*' />
                </div>
                <textarea className='bg-[#DCD8CE] focus:outline-[1px] outline-[#dddddd] focus:bg-[#F3F0EA] duration-300 w-full rounded-lg px-5 py-4 resize-none h-[200px]' placeholder='Your message*' name="message" id="message" />
                <div className='flex w-full gap-3 md:gap-2 px-2'>
                  <input className='w-[15px] cursor-pointer checked:accent-[#52b345]' type="checkbox" name="terms" id="terms" />
                  <label className='cursor-pointer font-extralight text-sm' htmlFor="terms">I agree to share my details for communication and support.</label>
                </div>
                <button className="bg-[#52b345] text-[#ffffff] text-lg md:text-xl p-3 flex items-center justify-center rounded-xl mt-6 cursor-pointer font-semibold w-1/2">Send Form</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
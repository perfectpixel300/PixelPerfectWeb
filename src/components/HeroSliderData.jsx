import React from 'react'
import { Link } from 'react-router-dom'

const HeroSliderData = ({className, sliderData}) => {
  return (
    <div className={className}>
        <h1 className='md:text-5xl font-semibold'>{sliderData.title}</h1>
        <p className='md:text-sm font-light tracking-wider pt-4 pb-10'>{sliderData.desc}</p>
        <Link className='text-[#ffffff] bg-[#1cac09] text-xs px-4 py-2 rounded-lg' >{sliderData.button}</Link>
    </div>
  )
}

export default HeroSliderData
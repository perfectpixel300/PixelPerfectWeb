import React from 'react'
import { Link } from 'react-router-dom'

const HeroSliderData = ({className, sliderData}) => {
  return (
    <div className={className}>
        <h1 className='text-2xl md:text-5xl font-semibold'>{sliderData.title}</h1>
        <p className='md:text-sm font-light tracking-wider pt-2 pb-8'>{sliderData.desc}</p>
        <Link className='text-[#ffffff] bg-[#1cac09] text-sm md:text-xs px-4 py-2 rounded-lg' >{sliderData.button}</Link>
    </div>
  )
}

export default HeroSliderData
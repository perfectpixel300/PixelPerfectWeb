import React from 'react'
import { Link } from 'react-router-dom'

const HeroSliderData = ({className, sliderData}) => {
  return (
    <div className={className}>
        <h1 className='text-3xl lg:text-4xl 2xl:text-7xl font-semibold'>{sliderData.title}</h1>
        <p className='pb-6 lg:pb-8 pt-2 text-sm lg:text-lg leading-tight font-light w-[40%]'>{sliderData.desc}</p>
        <Link className='text-[#ffffff] bg-slate-800 text-xs px-4 py-2 rounded-lg' >{sliderData.button}</Link>
    </div>
  )
}

export default HeroSliderData
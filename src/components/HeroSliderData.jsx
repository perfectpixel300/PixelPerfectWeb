import React from 'react'
import { Link } from 'react-router-dom'

const HeroSliderData = ({className, sliderData}) => {
  return (
    <div className={className}>
        <h1 className='text-4xl font-semibold'>{sliderData.title}</h1>
        <p className='pb-4 text-sm font-light'>{sliderData.desc}</p>
        <Link className='text-[#ffffff] bg-slate-800 text-xs px-3 py-1 rounded-lg' >{sliderData.button}</Link>
    </div>
  )
}

export default HeroSliderData
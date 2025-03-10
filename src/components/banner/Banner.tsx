"use client";
import React from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const imgSEO =[
    {
        id: 1,
        img: 'https://beta-api.bachlongmobile.com/media/MageINIC/bannerslider/viber_image_2025-03-08_11-22-21-360.jpg',
    },
    {
        id: 2,
        img: 'https://beta-api.bachlongmobile.com/media/MageINIC/bannerslider/Banner_Chao_thang_3_1200x450_1003_1.jpg',
    },
    {
        id: 3,
        img: 'https://beta-api.bachlongmobile.com/media/MageINIC/bannerslider/2025-03-07_14-41-34-551.jpg',
    },
    {
        id: 4,
        img: 'https://beta-api.bachlongmobile.com/media/MageINIC/bannerslider/viber_image_2025-03-08_11-22-21-360.jpg',
    }
]

const Banner = () => {
    const settings = {
        autoplay: true,         
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        autoplaySpeed: 3000,   
        pauseOnHover: true,
        arrows: false
    };
  return (
    <div className='w-full'>
        <div className="slider-container">
                <Slider {...settings} className='cursor-grab'>
                        {
                            imgSEO.map(el => (
                                <div className="w-full max-h-[700px] h-full overflow-hidden" key={el.id}>
                                    <img src={el.img} alt='banner' className="w-full h-full object-contain" />
                                </div>
                            ))
                        }
                </Slider>
            </div>
    </div>
  )
}

export default Banner
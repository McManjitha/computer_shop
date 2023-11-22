import { useState, useEffect } from 'react';
import { imagesArr } from '../../../helpers/carouselData';
import Slider from "react-slick";

function HeroSection() {

    const bgStyle = {
        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: false
      };

  return (
    <div className='overflow-hidden mt-5 sm:mt-0'>
        <Slider {...settings}>
            {
                imagesArr.map((slide) => {
                    return (
                        <div className='h-[450px]' >
                            <div className='mt-0 h-full  w-full overflow-hidden' style={{backgroundImage: `url(${slide.img})`,backgroundSize: 'cover', backgroundPosition: 'center'}}>
                                <div className='leading-3 '>
                                    <h1 className='text-4xl pt-8 ml-8 font-bold text-stone-300' >{slide.title1}</h1><br></br>
                                    <h1 className='text-4xl ml-8 font-bold text-stone-300'>{slide.title2}</h1>
                                </div>
                                <p className='ml-8 mt-4 w-1/2 text-stone-400'>{slide.subtitle}</p>
                            </div>
                        </div>
                    ) 
                })
            }
        </Slider>
    </div>
  );
}

export default HeroSection;
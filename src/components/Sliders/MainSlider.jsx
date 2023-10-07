import React from 'react'
import Slider from 'react-slick';
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'
import image1 from '../../assets/images/grocery-banner.png'
import image2 from '../../assets/images/grocery-banner-2.jpeg'

export default function MainSlider() {

    let sliders = [slider1, slider2, slider3]
    var settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="container mb-5 slider">
            <div className="row">
                <div className='main-slider col-md-10'>
                    <Slider {...settings}>
                        {sliders.map((img) => <img key={img} className='w-100' src={img} alt=''/>)}
                    </Slider>
                </div>

                <div className='main-images col-md-2'>
                    <img src={image1} className='w-100' alt="" />
                    <img src={image2} className='w-100' alt="" />
                </div>
            </div>
        </div>
    )
}

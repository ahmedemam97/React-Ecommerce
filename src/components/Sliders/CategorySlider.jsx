import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Slider from "react-slick";

export default function CategorySlider() {

    function getData() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }

    let {isLoading, data, isFetched, isError} = useQuery('getData', getData)


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1
    };
    return (
        <div className="container">
            
            <Slider {...settings}>
                {data?.data.data.map((ele)=> {
                    return <img key={ele.image} className='w-100 category-img' src={ele.image}/>
                })}
            </Slider>
        </div>
    )
}

import React from 'react'
import FeaturedProducts from '../FeaturedProducts'
import CategorySlider from '../Sliders/CategorySlider'
import MainSlider from '../Sliders/MainSlider'
import { Helmet } from 'react-helmet'
import useNetwork from '../useNetwork'

export default function Home() {

  let x = useNetwork()

  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Page</title>
      </Helmet>

      {x}



      <MainSlider />
      <div className="cat-one">
        <h4 className='container'>Shop Popular Categories</h4>
        <CategorySlider />
      </div>
      <div className="cat-two">
        <CategorySlider />
      </div>
      <FeaturedProducts />

    </>
  )
}

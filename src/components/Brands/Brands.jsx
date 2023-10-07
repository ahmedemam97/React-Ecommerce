import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux';
import { getBrands } from '../../Redux/brandsSlice';

export default function Brands() {

  let { loading, error, brands } = useSelector((state) => state.brands);
  let dispatch = useDispatch()
  // console.log(loading);
  // console.log(error);
  // console.log(brands);



  useEffect(() => {
    dispatch(getBrands())
  }, [])


  let popup = useRef()

  console.log(popup);

  return (

    <>


      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands Page</title>
      </Helmet>


      <div className="container mb-5">
        <div className="row">
          <h3 className='h2 brand-title pt-4'>All Brands</h3>
          {brands.map((brand) => {
            return <div key={brand._id} className="brand">

              <img src={brand.image} alt="" className="w-100" />
              <h4 className="h6 fw-bold">{brand.name}</h4>

            </div>
          })}
        </div>
      </div>
    </>
  )
}
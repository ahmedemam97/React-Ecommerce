import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import Loading from '../Loading'


export default function Categories() {

  function getAllCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let { isLoading, isError, data } = useQuery('getCategories', getAllCategories)
  console.log(data?.data.data);

  return (

    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories Page</title>
      </Helmet>

      <div className="container pt-2 pb-5">
        <div className="row">
          {isLoading ? <Loading /> :

            data?.data.data.map((category) => {

              return <div className="col-lg-4 col-md-2 mx-auto category p-0 m-2" key={category._id}>
                <img src={category.image} className='w-100' alt="" />
                <h4 className="text-success fw-bold text-center pt-3">{category.name}</h4>
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

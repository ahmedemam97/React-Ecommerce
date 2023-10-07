import React from 'react'
import notFound from '../assets/error.svg'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return (

    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Not Found</title>
    </Helmet>


    <div className='mx-auto my-5 text-center'>
      <h1>Not Found</h1>
      <img className='my-2' src={notFound} alt="" />

    </div>
    </>
  )
}

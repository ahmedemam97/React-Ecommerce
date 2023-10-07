import React from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../Loading';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Products() {

  const [searchTerm, setSearchTerm] = useState('');



  function getAllProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

  let { isLoading, isError, data, isFetched } = useQuery('getProducts', getAllProducts, { cacheTime: 60000 })

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const filteredProducts = data?.data.data.filter((product) =>
  //   product.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  return (

    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products Page</title>
      </Helmet>


      <Paper
        component="form" className='mx-auto mt-3 form-mui'
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu"></IconButton>
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search For Product..." inputProps={{ 'aria-label': 'Search For Product' }}
          value={searchTerm}
          onChange={handleSearchTermChange} />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '5px' }} aria-label="directions">

        </IconButton>
      </Paper>

      {isLoading ?

        <Loading />
        :
        <div className="container py-3">
          <div className="row">
            {data?.data.data.filter((product) =>
              product.title.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((product) => {
              return <div className="col-sm-6 col-md-4 col-lg-3 cursor-pointer my-2 product-element py-2" key={product._id}>
                <Link to={`/product-details/${product._id}`}>
                  <img src={product.imageCover} className='w-100 pb-2' alt="" />
                  <h4 className="px-3">{product.title.split(' ').slice(0, 2).join(' ')}</h4>

                  <div className='manage-width px-3'>
                    <h4 className="h6">{product.brand.name}</h4>

                    <div className='d-flex justify-content-end'>
                      <h4 className="h6">{product.ratingsAverage}</h4>
                      <i className="fa-solid fa-star rating-color"></i>
                    </div>
                  </div>
                </Link>
              </div>
            })}
          </div>
        </div>

      }
    </>
  )
}

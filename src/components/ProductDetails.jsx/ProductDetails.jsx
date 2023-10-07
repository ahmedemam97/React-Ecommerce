import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { UserContext } from '../Context/UserContext'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'

export default function ProductDetails() {
    
    let {addToCart} = useContext(cartContext)
    let {userToken} = useContext(UserContext)
    let params = useParams()

    async function addToCartFun(id) {
        let res = await addToCart(id)
        console.log(res)
        if(!userToken){
            toast.error(res.response.data.message)
        }else{
            toast.success(res.data.message)
        }
    }

    
    function getProductDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    let { isLoading, isError, data } = useQuery('productDetails', ()=> getProductDetails(params.id))
    // console.log(data.data.data._id);



    return (

<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Product Details</title>
        </Helmet>

        <div className="container">
            <div className="row">
                {data?.data.data? <>
                <div className='col-md-4'>
                    <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} />
                </div>
                <div className="col-md-8 product-details">
                    <h3 className=' product-title'>{data?.data.data.title}</h3>
                    <h3 className='product-brand'>{data?.data.data.brand.name}</h3>
                    <p>{data?.data.data.description}</p>
                    <h6 className='text-main'>{data?.data.data.category.name}</h6>
                    <p className='text-main'>Price: {data?.data.data.price} EGP</p>
                    <div className='d-flex justify-content-between'>
                        <p>Rating Quantity: {data?.data.data.ratingsQuantity}</p>
                        <p><i className="fa-solid fa-star rating-color"></i>{data?.data.data.ratingsAverage}</p>
                    </div>
                    <button onClick={()=>{addToCartFun(data.data.data._id)}} className='form-btn btn-main'>Add To Cart</button>
                </div>
                </>
                : ''}
            </div>
        </div>
</>
    )
}

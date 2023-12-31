import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { cartContext } from './Context/CartContext'
import toast from 'react-hot-toast'
import { UserContext } from './Context/UserContext'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Loading from './Loading'
export default function FeaturedProducts() {

    // let {addToCart} = useContext(createContext)

    // const [productsArr, setProductsArr] = useState([])
    // const [loading, setLoading] = useState(false)

    // async function getProducts(){
    //     setLoading(true)
    //     let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    //     setProductsArr(data.data)
    //     setLoading(false)
    //     console.log(data)
    // }

    // useEffect(()=> {
    //     getProducts()
    // }, [])

    // async function addToCart() {
    //     let response = await getProduct()
    //     console.log(response)
    // }


    let { addToCart, addToWishList, removeFromWishList } = useContext(cartContext)
    let { userToken } = useContext(UserContext)
    let favIcon = useRef()
    const [isFavorite, setIsFavorite] = useState(false);


    async function removeFromWishFun(id) {
        return await removeFromWishList(id)
    }

    async function addToWishFun(id) {
        return await addToWishList(id)
    }

    const toggleFavorite = (id) => {
        if (isFavorite) {
            setIsFavorite(false)
            addToWishFun(id)
        } else {
            setIsFavorite(true)
            removeFromWishFun(id)
        }
    };

    async function addToCartFun(id) {
        let res = await addToCart(id)
        // console.log(res);
        if (!userToken) {
            toast.error(res.response.data.message, { duration: 1000 })
        } else {
            toast.success(res.data.message)
        }
    }



    async function wishList(id) {
        let response = await addToWishList(id)
        // console.log(response);
        if (!userToken) {
            toast.error(response.response.data.message)
        } else {

            toast.success(response.data.message)
        }
    }


    function getFeaturedProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }

    let { isLoading, isError, data, isFetching } = useQuery('featuredProducts', getFeaturedProducts, {
        cacheTime: 60000,
        refetchOnMount: false,
        // staleTime: 30000
        refetchInterval: 5000,
        // enabled: false
    })

    // console.log(data?.data.data);

    // console.log(favIcon.current);
    useEffect(()=> {
        getFeaturedProducts()
    }, [isFavorite])


    return (
        <div className="container my-5">
            <div className="row">
                {/* <button onClick={refetch} className='form-btn my-3 py-2'>Get All Products</button> */}

                {isLoading ?
                    <Loading />

                    :
                    data?.data.data.map((ele) => {
                        return <div className="col-md-4 col-sm-6 col-lg-3 p-3 product" key={ele._id}>
                            <Link to={`product-details/${ele._id}`}>
                                <img src={ele.imageCover} className='w-100' alt='' />
                                <p className='text-main pt-2 mb-1'>{ele.brand?.name}</p>
                                <p className='mb-1'>{ele.category.name}</p>
                                {/* <p>{ele.title.split(' ').slice(0, 2).join(' ')}</p> */}

                                <div className='d-flex justify-content-between'>
                                    <p className=''>{ele.price} EGP</p>
                                    <p><i className="fa-solid fa-star rating-color"></i>{ele.ratingsAverage}</p>
                                </div>

                            </Link>
                            <div className='d-flex justify-content-between'>
                                <button onClick={() => { addToCartFun(ele.id) }} className='btn form-btn w-75'>Add To Cart</button>

                                <div onClick={()=> toggleFavorite(ele._id)}>

                                    {isFavorite ?

                                        <FavoriteIcon ref={favIcon} color='action' onClick={() => { wishList(ele._id) }} className={`favorite`} />
                                        :
                                        <FavoriteIcon style={{ color: 'red' }} onClick={() => { wishList(ele._id) }} className={`favorite`} />
                                    }
                                </div>


                                {/* <i onClick={() => { wishList(ele._id) }} className="fas fa-heart favorite"></i> */}
                            </div>
                        </div>
                    }
                    )
                }
            </div>
        </div>
    )
}
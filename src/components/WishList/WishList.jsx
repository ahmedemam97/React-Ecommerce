import { Button, ButtonBase } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { cartContext } from '../Context/CartContext';
import { UserContext } from '../Context/UserContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

function WishList() {

    let { addToCart, removeFromWishList, getWishList } = useContext(cartContext)
    let { userToken } = useContext(UserContext)
    let [wishData, setWishData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    async function addToCartFun(id) {
        try {
            let res = await addToCart(id)
            // console.log(res);
            if (!userToken) {
                toast.error(res.response.data.message, { duration: 1000 })
            } else {
                toast.success(res.data.message)
            }
        } catch (error) {

            console.error('Error removing from wishlist:', error);

        } finally {
            setIsLoading(false);
        }
    }

    async function removeFromWishListFun(id) {
        try {
            const { data } = await removeFromWishList(id);

            getWishListFun()
            if (data.status === 'success') {
                toast.success('One Product Has Been Removed From Your WishList');
            }
        } catch (error) {

            console.error('Error removing from wishlist:', error);

        } finally {
            setIsLoading(false);
        }
    }


    async function getWishListFun() {
        try {
            let { data } = await getWishList()
            setWishData(data)
            // console.log(data)
        } catch (error) {

            console.error('Error removing from wishlist:', error);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        getWishListFun()
    }, [])

    // console.log(wishData?.data.map((ele)=> {console.log(ele)}));
    return (
        <>
            {isLoading ? <Loading />
                :
                <>
                    <div className="container my-wish-list pt-5 my-5 px">
                        <h4 className="h2 pb-3 fw-bold">My Wish List</h4>
                        {wishData?.data.map((product) => {
                            console.log(product);
                            return <div className="row border-bottom" key={product.id}>
                                <div className="p-2 col-md-2">
                                    <Link className="col-md-1" to={`/product-details/${product.id}`}>
                                        <div>
                                            <img src={product.imageCover} className='w-100' alt="" />
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-md-10 wishlist">


                                    <div className="content-product fw-bold">
                                        <h4 className="h6 fw-bold">{product.title ? product.title.split(' ').slice(0, 3).join(' ') : 'Title not available'}</h4>
                                        <h4 className="h6 fw-bold text-success">{product.price} <span className='text-danger'>EGP</span></h4>
                                    </div>

                                    <div className='remove-item'>
                                        <button onClick={() => { removeFromWishListFun(product.id) }} className="btn remove"><i className="text-danger fas fa-trash-can font-sm pb-2"></i>Remove</button>
                                    </div>

                                    <div className="add-to-cart">
                                        <Button onClick={() => { addToCartFun(product.id) }} variant="contained" color='primary' disableElevation>Add To Cart</Button>
                                    </div>
                                </div>

                            </div>
                        })
                        }
                    </div>
                </>
            }
        </>
    )
}

export default WishList
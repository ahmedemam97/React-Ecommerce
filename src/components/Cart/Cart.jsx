import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { cartContext } from '../Context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '@mui/material'
import Loading from '../Loading'

export default function Cart() {
  let { getLoggedUserCart, removeItem, updateCount, removeAll } = useContext(cartContext)
  const [cartDetails, setCartDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  async function getCart() {
    try {
      let { data } = await getLoggedUserCart()
      setCartDetails(data)
    } catch (error) {

      console.error('Error getting cart:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeCartItem(id) {
    let { data } = await removeItem(id)
    setCartDetails(data)
    // console.log(data)
    if (data.status === 'success') {
      toast.success('One Product Has Been Removed From Cart')
    }
  }

  async function updateProductCount(id, count) {
    let { data } = await updateCount(id, count)
    setCartDetails(data)
  }

  async function clearCart() {
    let { data } = await removeAll()
    setCartDetails(data)
    navigate('/')
  }

  useEffect(() => {

    getCart()

  }, [])
  return (

    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart Page</title>
      </Helmet>



      {
        isLoading ?

          <Loading />


          : <>
            <div className="mx-auto w-75 p-3 bg-main-light my-3 ">
              <h3>Shopping Cart</h3>
              <h4 className='h6 text-main f2-bolder'>Cart Items : <span className='text-danger fw-bold'>{!cartDetails?.numOfCartItems ? 0 : cartDetails?.numOfCartItems}</span> Products</h4>
              <h4 className='h6 text-main f2-bolder mb-4'>Total Cart Price : <span className='text-danger fw-bold'>{!cartDetails?.data.totalCartPrice ? 0 : cartDetails?.data.totalCartPrice}</span> EGP</h4>
            
            
            {cartDetails?.data.products.map((ele) =>
              <div key={ele._id} className='row border-bottom py-2'>
                <Link className="col-md-1" to={`/product-details/${ele.product.id}`}>
                  <div>
                    <img src={ele.product.imageCover} className='w-100' alt="" />
                  </div>
                </Link>

                <div className="col-md-11">

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className='h6'>{ele.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                      <h6>{ele.price}</h6>
                    </div>

                    <div>
                      <button onClick={() => updateProductCount(ele.product.id, ele.count + 1)} className="btn border-main p-1">+</button>
                      <span className="mx-2">{ele.count <= 0 ? ele.count = 1 : ele.count}</span>
                      <button onClick={() => updateProductCount(ele.product.id, ele.count - 1)} className="btn border-main p-1">-</button>
                    </div>
                  </div>

                  <button onClick={() => removeCartItem(ele.product.id)} className="btn remove"><i className="text-danger fas fa-trash-can font-sm pb-2"></i>Remove</button>
                </div>


              </div>)}


            </div>
            {
              cartDetails ? 
              <>
              <div className='remove-all mt-1'>
              <Button variant="contained" color='error' onClick={clearCart}>Clear Cart</Button>
            </div>

            <div className='address-btn mb-3'>
              <Button variant="contained" color='primary' disableElevation>
                <Link to={'/address'}>Online Payment</Link>
              </Button>
              <Button variant="contained" color='primary' disableElevation>
                <Link to={'/cash-order'}>Cash On Delevery</Link>
              </Button>
            </div>
              
              </>
            : <h4 className="text-center pb-5 mb-5 pt-2 fw-bold">Your Cart Is Empty, Go back to the <Link to={'/'} className='text-primary cursor-pointer'>Home</Link> page and fill it out</h4>
            }

            </>
              }


          </>
  )
}

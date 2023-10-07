import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { cartContext } from '../Context/CartContext'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'

function Address() {

    let { onlinePayment, cartId } = useContext(cartContext)

    async function addressSubmit(values) {
        let { data } = await onlinePayment(cartId, 'http://localhost:3000', values)
        // console.log(data);
        
        if (!data) {
            toast.error('Your Cart Is Empty, Refresh The Page And Pay New Products');
        } else {
            window.open(data.session.url, '_blank').focus(); 
        }
    }

    let formik = useFormik({
        initialValues: {
            details: '',
            address: '',
            phone: ''
        },

        onSubmit: addressSubmit
    })

    return (

        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Check Out</title>
            </Helmet>



            <div className="container my-5">
                <div className="row">
                    <form className='text-center' action="" onSubmit={formik.handleSubmit}>


                        <TextField fullWidth type='text' name='details' className='w-50 my-4 mx-auto d-block' label="Details" variant="filled"
                            onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} />


                        <TextField fullWidth type='address' name='address' className='w-50 my-4 mx-auto d-block' label="Address" variant="filled"
                            onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.address} />


                        <TextField fullWidth type='tel' name='phone' className='w-50 my-4 mx-auto d-block' label="Phone" variant="filled"
                            onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} />

                        <Button type='submit' variant="contained">Pay Now </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Address
import { Alert, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';
import { Helmet } from 'react-helmet'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

function ForgetPassord() {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigator = useNavigate()

    async function forgetSubmit(values) {
        setIsLoading(true)
        let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
            .then((res) => res)
            .catch((err) =>{   
                setIsLoading(false)
                setError(err.response.data.message)
            }
            )


        // console.log(response);

        if (response.data.statusMsg === 'success') {
            setIsLoading(false)
            navigator('/verefy-reset')

            toast.success(response.data.message)
        }
    }


    const validationSchema = Yup.object({
        email: Yup.string().required('the email field is required!').email('email not valid'),
    }
    )

    let formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: forgetSubmit
    })

    /////////////////////////////////


    return (
        <>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Forget Password</title>
            </Helmet>

            <div className="container mb-5">
                {/* Error Message */}
                {error ? <h4 className='alert alert-danger w-75 text-center p-2 mx-auto'>{error}</h4> : ''}
                {/* ///////////// */}
                <h1 className=' mx-auto mt-4 text-center'>Forget Password</h1>

                <form action="" className='w-75 mx-auto mb-3' onSubmit={formik.handleSubmit}>

                    <TextField fullWidth type='email' name='email' className='w-75 mt-4 mb-2 mx-auto d-block' label="Email" variant="filled"
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                    {formik.errors.email && formik.touched.email ? <Alert variant="outlined" severity="error">{formik.errors.email}</Alert> : ''}


                    <div className='button-submit w-75 m-auto'>
                        {isLoading ?
                            <button type='button' className='btn bg-main text-white mt-2 d-block ms-auto'>
                                <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="20"
                                    visible={true}
                                />
                            </button>
                            :
                            <div className="d-flex w-100">
                                <Button type='submit' className='register-submit mt-1 m-auto' variant="contained" disabled={!(formik.dirty && formik.isValid)} color="success">Submit</Button>
                                {/* <button type='submit' className='form-btn mt-2 ms-auto d-block' disabled={!(formik.dirty && formik.isValid)}>Login</button> */}
                            </div>
                        }
                    </div>

                </form>
            </div>
        </>

    )
}
export default ForgetPassord
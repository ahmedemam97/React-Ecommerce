import { Alert, Button,  TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import { Helmet } from 'react-helmet'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

function VerefyResetCode() {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigator = useNavigate()
    const { setUserToken } = useContext(UserContext)

    async function verefyResetSubmit(values) {
        console.log(values);
        setIsLoading(true)
        let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
            .then((res)=> res)
            .catch((err) => {
                setIsLoading(false)
                setError(err.response.data.message)
            })
            // console.log(response);
            
        if (response.data.status === 'Success') {
            setIsLoading(false)

            navigator('/reset-password')
            console.log(response);
        }
    }


    const validationSchema = Yup.object({
        resetCode: Yup.string().required('The Verefy Code Is Required!'),
    }
    )

    let formik = useFormik({
        initialValues: {
            resetCode: '',
        },
        validationSchema,
        onSubmit: verefyResetSubmit
    })

    /////////////////////////////////


    return (
        <>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Verefy Code</title>
            </Helmet>

            <div className="container mb-5">
                {/* Error Message */}
                {error ? <h4 className='alert alert-danger w-75 text-center p-2 mx-auto'>{error}</h4> : ''}
                {/* ///////////// */}
                <h1 className=' mx-auto mt-4 text-center'>Verefy Reset Code</h1>

                <form action="" className='w-75 mx-auto mb-3' onSubmit={formik.handleSubmit}>

                    <TextField fullWidth type='text' name='resetCode' className='w-75 mt-4 mb-2 mx-auto d-block' label="Enter Code" variant="filled"
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} />
                    {formik.errors.resetCode && formik.touched.resetCode ? <Alert variant="outlined" className='w-75 m-auto mb-2' severity="error">{formik.errors.resetCode}</Alert> : ''}


                    <div className='button-submit w-75 m-auto'>
                        {isLoading ?
                            <button type='button' className='btn bg-main  text-white mt-2 d-block m-auto'>
                                <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="20"
                                    visible={true}
                                    className='mx-auto'
                                />
                            </button>
                            :
                            <div className="d-flex w-100">
                                <Button type='submit' className='register-submit mt-1 m-auto' variant="contained" disabled={!(formik.dirty && formik.isValid)} color="success">Verefy Code</Button>
                                {/* <button type='submit' className='form-btn mt-2 ms-auto d-block' disabled={!(formik.dirty && formik.isValid)}>Login</button> */}
                            </div>
                        }
                    </div>

                </form>
            </div>
        </>

    )
}
export default VerefyResetCode
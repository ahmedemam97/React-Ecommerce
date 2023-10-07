import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';
import { Alert, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function ResetPassword() {


    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigator = useNavigate()
    const { setUserToken } = useContext(UserContext)

    async function resetPassword(values) {
        setIsLoading(true)
        let response = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
            .then((res) => res)
            .catch((err) => {
                setIsLoading(false)
                setError(err.response.data.message)
            })
        // console.log(response);
        

        localStorage.setItem('userToken', response.data.token)
        setUserToken(response.data.token)
        setIsLoading(false)
        navigator('/')
    }


    const validationSchema = Yup.object({
        email: Yup.string().required('the email field is required!').email('email not valid'),
        newPassword: Yup.string().matches(/^[A-Za-z]\w{7,15}$/, 'password not match').required('password is required!'),
    }
    )

    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        },
        validationSchema,
        onSubmit: resetPassword
    })

    // MUI Display Password Code
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    /////////////////////////////////


    return (
        <>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Login Page</title>
            </Helmet>

            <div className="container mb-5">
                {/* Error Message */}
                {error ? <h4 className='alert alert-danger w-75 text-center p-2 mx-auto'>{error}</h4> : ''}
                {/* ///////////// */}
                <h1 className=' mx-auto mt-4 text-center'>Reset Password</h1>

                <form action="" className='w-75 mx-auto mb-3' onSubmit={formik.handleSubmit}>

                    <TextField fullWidth type='email' name='email' className='w-100 mt-4 mb-2 mx-auto d-block' label="Email" variant="filled"
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                    {formik.errors.email && formik.touched.email ? <Alert variant="outlined" severity="error">{formik.errors.email}</Alert> : ''}


                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" className='w-100 mx-auto mt-4'
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword}>
                        <InputLabel htmlFor="filled-adornment-password">New Password</InputLabel>
                        <FilledInput name='newPassword' id="filled-adornment-password" type={showPassword ? 'text' : 'password'} endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>} />
                    </FormControl>
                    {formik.errors.newPassword && formik.touched.newPassword ? <Alert variant="outlined" severity="error">{formik.errors.newPassword}</Alert> : ''}




                    <div className='button-submit'>
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
                            <div className="d-flex align-items-center">
                                <Button type='submit' className='register-submit mt-1' variant="contained" disabled={!(formik.dirty && formik.isValid)} color="success">Submit</Button>
                                {/* <button type='submit' className='form-btn mt-2 ms-auto d-block' disabled={!(formik.dirty && formik.isValid)}>Login</button> */}
                            </div>
                        }
                    </div>

                </form>
            </div>
        </>

    )
}

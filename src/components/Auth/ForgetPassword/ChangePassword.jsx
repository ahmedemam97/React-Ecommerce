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

export default function ChangePassword() {


    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigator = useNavigate()
    const { setUserToken } = useContext(UserContext)

    let headers = { token: localStorage.getItem("userToken") };
    async function changeSubmit(values) {
        setIsLoading(true)
        let response = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, values, { headers })
            .then((res) => res)
            .catch((err) => {
                setIsLoading(false)
                setError(err.response.data.message)
            })

        console.log(response);
        
        setIsLoading(false)
        navigator('/')
    }


    const validationSchema = Yup.object({
        currentPassword: Yup.string().matches(/^[A-Za-z0-9]\w{7,}$/, 'password not match').required('password is required!'),
        password: Yup.string().matches(/^[A-Za-z0-9]\w{7,}$/, 'password not match').required('password is required!'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'password not match').required('rePassword is required!'),
    }
    )

    let formik = useFormik({
        initialValues: {
            currentPassword: '',
            password: '',
            rePassword: '',
        },
        validationSchema,
        onSubmit: changeSubmit
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
                <h1 className=' mx-auto mt-4 text-center'>Change Password</h1>

                <form action="" className='w-75 mx-auto mb-3' onSubmit={formik.handleSubmit}>

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" className='w-100 mb-0 mt-3 mx-auto'
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.currentPassword}>
                        <InputLabel htmlFor="filled-adornment-password">Current Password</InputLabel>
                        <FilledInput name='currentPassword' id="filled-adornment-password" type={showPassword ? 'text' : 'password'} endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>} />
                    </FormControl>
                    {formik.errors.currentPassword && formik.touched.currentPassword ? <p className='alert alert-danger'>{formik.errors.currentPassword}</p> : ''}


                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" className='w-100 mb-0 mt-3 mx-auto'
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}>
                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                        <FilledInput name='password' id="filled-adornment-password" type={showPassword ? 'text' : 'password'} endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>} />
                    </FormControl>
                    {formik.errors.password && formik.touched.password ? <p className='alert alert-danger'>{formik.errors.password}</p> : ''}


                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" className='w-100 mx-auto mt-4'
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword}>
                        <InputLabel htmlFor="filled-adornment-password">rePassword</InputLabel>
                        <FilledInput name='rePassword' id="filled-adornment-password" type={showPassword ? 'text' : 'password'} endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>} />
                    </FormControl>
                    {formik.errors.rePassword && formik.touched.rePassword ? <p className='alert alert-danger'>{formik.errors.rePassword}</p> : ''}




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

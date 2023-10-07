import { useFormik } from 'formik'
import axios from 'axios';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
export default function Register() {
  // the conditions way with formik
  // function validation(values) {
  //   let errors={};
  //   if(!values.name){
  //     errors.name = 'the name field is repuired!'
  //   }else if(!/^[A-Z][a-z0,9]{2,5}$/.test(values.name)){
  //     errors.name = 'name not match, start with capt then from 5 to 10 letters'
  //   }

  //   if(!values.email){
  //     errors.email = 'the email field is repuired!'
  //   }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'invalid email address!'
  //   }

  //   if(!values.password){
  //     errors.password = 'the password field is repuired'
  //   }else if (!/^[A-Za-z]\w{7,15}$/.test(values.password)) {
  //     errors.password = 'password not matched'
  //   }

  //   if(!values.rePassword){
  //     errors.rePassword = 'the rePassword field is repuired'
  //   }else if (!/^[A-Za-z]\w{7,15}$/.test(values.rePassword)) {
  //     errors.rePassword = 'password not matched'
  //   }

  //   if(!values.phone){
  //     errors.phone = 'phone number is repuired'
  //   }else if(!/^\(?(\d{3})\)?[- ]?(\d{4})[- ]?(\d{4})$/.test(values.phone)){
  //     errors.phone = 'phone number not matched'
  //   }

  //   return errors
  // }

  // const validationSchema = Yup.object( {
  //   name: Yup.string().min(2, 'the min of chars is 2').max(8, 'the name field must be at least 8 chars').required('the name field is required!'),
  //   email: Yup.string().required('the email field is required!').email('email not valid'),
  //   password: Yup.string().matches(/^[A-Za-z]\w{7,15}$/, 'password not match').required('password is required!'),
  //   rePassword: Yup.string().oneOf([Yup.ref('password')], 'password not match').required('rePassword is required!'),
  //   phone: Yup.string().matches(/^\(?(\d{3})\)?[- ]?(\d{4})[- ]?(\d{4})$/, 'phone not match').required('phone is required!')
  // })

  // let formik = useFormik({
  //   initialValues: {
  //     name: '',
  //     email: '',
  //     password: '',
  //     rePassword: '',
  //     phone: ''
  //   },
  //   validationSchema,
  //   onSubmit: registerSubmit
  // })

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigator = useNavigate()

  async function registerSubmit(values) {
    setIsLoading(true)
    let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setError(err.response.data.message)
        setIsLoading(false)
      })

    if (response.data.message === 'success') {
      setIsLoading(false)
      navigator('/login')
      console.log(values);
    }

  }


  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'the min of chars is 2').max(8, 'the name field must be at least 8 chars').required('the name field is required!'),
    email: Yup.string().required('the email field is required!').email('email not valid'),
    password: Yup.string().matches(/^[A-Za-z0-9]\w{7,}$/, 'password not match').required('password is required!'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'password not match').required('rePassword is required!'),
    phone: Yup.string().matches(/^(\+\d{2})(\d{10})$/, 'phone not match').required('phone is required!')
  }
  )

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: registerSubmit
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
        <title>Register Page</title>
      </Helmet>

      <div className="container mb-5">
        {/* Error Message */}
        {error ? <h4 className='alert alert-danger w-75 text-center p-2 mx-auto'>{error}</h4> : ''}
        {/* ///////////// */}
        <h1 className=' mx-auto mt-4 text-center'>Register Now</h1>

        <form action="" className='w-75 mx-auto mb-3' onSubmit={formik.handleSubmit}>

          <TextField fullWidth type='text' name='name' className='w-100 my-4 mx-auto d-block' label="Name" variant="filled"
            onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
          {formik.errors.name && formik.touched.name ? <p className='alert alert-danger'>{formik.errors.name}</p> : ''}

          <TextField fullWidth type='email' name='email' className='w-100 my-4 mx-auto d-block' label="Email" variant="filled"
            onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
          {formik.errors.email && formik.touched.email ? <p className='alert alert-danger'>{formik.errors.email}</p> : ''}


          <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" className='w-100 mx-auto'
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

          <TextField fullWidth type='tel' name='phone' className='w-100 my-4 mx-auto d-block' label="Phone" variant="filled"
            onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} />
          {formik.errors.phone && formik.touched.phone ? <p className='alert alert-danger'>{formik.errors.phone}</p> : ''}




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
                <Button type='submit' className='register-submit' variant="contained" disabled={!(formik.dirty && formik.isValid)} color="success">Register</Button>
                {/* <button type='submit' className='form-btn mt-2 ms-auto d-block' disabled={!(formik.dirty && formik.isValid)}>Register</button> */}
              </div>
            }

            <Link className='d-flex align-items-center link' to='/login'>You Have An Account?</Link>
          </div>


        </form>
      </div>
    </>

  )
}

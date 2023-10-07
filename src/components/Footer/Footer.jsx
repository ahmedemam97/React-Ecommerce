import { Button, TextField } from '@mui/material'
import React from 'react'

export default function Footer() {
  return (

    <footer className='py-5 bg-main-light'>
      <div className="container">

        <h1 className='text-start'>Get Fresh Cart App</h1>
        <p className='text-start'>We Share The Link Lorem ipsum dolor sit amet consectetur adipisicing.</p>

        <div className="row d-flex align-items-center">
          <div className="col-md-9">
            <TextField className='w-100' id="outlined-size-small" label="Share Link" variant="outlined" size="small"/>
          </div>

          <div className="col-md-3">
            <Button color="success" className='w-100' variant="contained" disableElevation>
              Share Link
            </Button>
          </div>

        </div>
      </div>
    </footer>
  )
}

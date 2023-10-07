import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { UserContext } from '../Context/UserContext'

export default function Layout() {


  const {setUserToken} = useContext(UserContext)

  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      setUserToken(localStorage.getItem('userToken'))
    }
  }, [])
  
  return (
    <>
      <Navbar/>
      <div className="content">

      <Outlet/>
      </div>
      
      <Footer/>
    
    </>
  )
}

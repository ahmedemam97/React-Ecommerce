import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/freshcart-logo.svg'
import { UserContext } from '../Context/UserContext'
import { useSelector } from 'react-redux'
import { cartContext } from '../Context/CartContext'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Navbar() {


  let { getLoggedUserCart } = useContext(cartContext)
  let [cartCount, setCartCount] = useState(0)

  async function getCartCount() {
    let { data } = await getLoggedUserCart()

    setCartCount(data)
  }


  useEffect(() => {
    getCartCount()

  }, [cartCount])


  // let { counter } = useSelector((state) => state.counter)

  const navigator = useNavigate()

  const { userToken, setUserToken } = useContext(UserContext)
  function logout() {
    localStorage.removeItem('userToken')
    setUserToken(null)

    navigator('/login')
  }

  ////////
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>

      <nav className="navbar navbar-expand-lg bg-body-tertiary scrolled">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              {userToken !== null ?
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="cart">Cart</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="wishlist">WishList</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="brands">Brands</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="products">Products</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="categories">Categories</Link>
                  </li>

                </>
                : null}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item icons d-flex align-items-center">
                {!userToken ? '' :
                  <Link to={'/cart'}>
                    <i className="fa-solid fa-shopping-cart shopping-cart">{!cartCount ? 0 : cartCount?.numOfCartItems}</i>
                  </Link>}
                <i className="fa-brands fa-facebook mx-2"></i>
                <i className="fa-brands fa-youtube mx-2"></i>
                <i className="fa-brands fa-instagram mx-2"></i>
                <i className="fa-brands fa-google mx-2"></i>
              </li>
              {userToken === null ?
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">Login</Link>
                  </li>
                </>
                : null}

              {userToken !== null ?
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className='settings'
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Settings
                  </Button>
                  <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
                    MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
                    <MenuItem onClick={handleClose}>
                      <Link to={'change-password'}>
                        change-password
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={() => logout()}>Logout</MenuItem>
                  </Menu>
                </div>
                : null}


            </ul>

          </div>
        </div>
      </nav>


    </>
  )
}

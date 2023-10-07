import React, { Suspense, lazy } from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
// import Brands from './components/Brands/Brands'
// import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'
import NotFound from './components/NotFound'
import UserContextProvider from './components/Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute'
import ProductDetails from './components/ProductDetails.jsx/ProductDetails'
import { CartContextProvider } from './components/Context/CartContext'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import Loading from './components/Loading'
import Address from './components/Address/Address'
import WishList from './components/WishList/WishList'
import AllOrders from './components/Orders/AllOrders'
import ForgetPassord from './components/Auth/ForgetPassword/ForgetPassord'
import VerefyResetCode from './components/Auth/ForgetPassword/VerefyResetCode'
import ResetPassword from './components/Auth/ForgetPassword/ResetPassword'
import ChangePassword from './components/Auth/ForgetPassword/ChangePassword'
import CashOrder from './components/Address/CashOrder'
import OrderContextProvider from './components/Context/OrderContext'
import PaymentDetails from './components/PaymentDetails'

const Brands = lazy(() => import('./components/Brands/Brands'))
const Products = lazy(() => import('./components/Products/Products'))


export default function App() {

  const routes = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Suspense fallback={<Loading />}><Brands /></Suspense></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Suspense fallback={<Loading />}><Products /></Suspense></ProtectedRoute> },
        { path: 'product-details/:id', element: <ProductDetails /> },
        { path: 'address', element: <ProtectedRoute><Address /></ProtectedRoute> },
        { path: 'cash-order', element: <ProtectedRoute><CashOrder /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: 'payment-details', element: <ProtectedRoute><PaymentDetails /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: 'login', element: <Login /> },
        { path: 'forget', element: <ForgetPassord /> },
        { path: 'verefy-reset', element: <VerefyResetCode /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'change-password', element: <ChangePassword /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <NotFound /> }
      ]
    }
  ])

  return (
    <UserContextProvider>
      <CartContextProvider>
        <OrderContextProvider>
          <Provider store={store}>
            <RouterProvider router={routes}></RouterProvider>
            <Toaster />
          </Provider>
        </OrderContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  )
}

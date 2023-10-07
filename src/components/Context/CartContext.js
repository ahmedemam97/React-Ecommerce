import axios from "axios";
import { createContext, useState } from "react";
import { useEffect } from "react";

export let cartContext = createContext();

export function CartContextProvider(props) {
    let [cartId, setCartId] = useState(null)


    // console.log(cartId);
    async function getCartId() {
        let { data } = await getLoggedUserCart()
        // console.log(data?.data._id);
        setCartId(data?.data._id)
    }
    let headers = { token: localStorage.getItem("userToken") };

    // let {isLogin} = useContext(UserContext)
    // let headers = {token: isLogin}

    function addToCart(productId) {
        // return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {productId}, {headers}).then((res) => res)
        // .catch((err) => err)
        return axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                { productId: productId },
                { headers: headers }
            )
            .then((res) => res)
            .catch((err) => err);
    }

    function getLoggedUserCart() {
        return axios
            .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: headers }
            )
            .then((res) => res)
            .catch((err) => err);
    }

    function removeItem(productId) {
        return axios
            .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers: headers,
            })
            .then((res) => res)
            .catch((err) => err);
    }

    function updateCount(productId, count) {
        return axios
            .put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { count: count },
                { headers: headers }
            )
            .then((res) => res)
            .catch((err) => err);
    }

    function removeAll() {
        return axios
            .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: headers }
            )
            .then((res) => res)
            .catch((err) => err);
    }

    function onlinePayment(cartId, url, values) {
        console.log(cartId);
        return axios
            .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
                { shippingAddress: values },
                { headers: headers }
            )
            .then((res) => res)
            .catch((err) => err);
    }


    function addToWishList(prdocutId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            { productId: prdocutId },
            { headers: headers }
        )
            .then((res) => res)
            .catch((err) => err)
    }

    function getWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers }
        )
            .then((res) => res)
            .catch((err) => err)
    }

    function removeFromWishList(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
            { headers }
        )
            .then((res) => res)
            .catch((err) => err)
    }

    useEffect(() => {
        getCartId()
    }, [])
    return (
        <cartContext.Provider
            value={{
                addToCart,
                getLoggedUserCart,
                removeItem,
                updateCount,
                removeAll,
                onlinePayment,
                cartId,
                addToWishList,
                removeFromWishList,
                getWishList,
            }}
        >
            {props.children}
        </cartContext.Provider>
    );
}

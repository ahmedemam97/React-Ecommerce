import axios from "axios";
import { createContext, useState } from "react";

export let OrderContext = createContext()

export default function OrderContextProvider(props){
    let [orderData, setOrderData] = useState(null)

    let headers = { token: localStorage.getItem("userToken") };

    function cashOrder(cartId, values) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            { shippingAddress: values },
            { headers }
        ).then((res) => res)
            .catch((err) => err)
    }

    function getOrders() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders`)
            .then((res) => res)
            .catch((err) => err);
    }


    return <OrderContext.Provider value={{ getOrders, cashOrder, orderData, setOrderData }}>
        {props.children}
    </OrderContext.Provider>
}
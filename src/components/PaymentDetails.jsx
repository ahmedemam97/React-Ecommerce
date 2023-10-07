import React, { useContext } from 'react';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import { OrderContext } from './Context/OrderContext';

function PaymentDetails() {

    let {orderData} = useContext(OrderContext)
    
console.log(orderData);
    return (
        <div className="w-100">
            <h2>Number Of Products Sold: {orderData.shippingAddress.details}</h2>
        </div>
    );
}

export default PaymentDetails;
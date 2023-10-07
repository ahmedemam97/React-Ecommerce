import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Loading';
import { OrderContext } from '../Context/OrderContext';

function AllOrders() {
    const { getOrders } = useContext(OrderContext);

    // Query to fetch orders data
    const { isLoading, isError, data } = useQuery('getAllOrders', getOrders);
    console.log(data?.data);
    // Pagination state

    return (

        <>

            {
                isLoading ?
                    <Loading />
                    :
                    ''
                    // <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    //     <Stack spacing={2}>
                    //         <Typography>Page: {page}</Typography>
                    //         <Pagination count={10} page={page} onChange={handleChange} />
                    //     </Stack>
                    // </div>

            }
        </>
    );
}

export default AllOrders;
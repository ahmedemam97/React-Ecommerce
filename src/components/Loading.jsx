import { BallTriangle } from "react-loader-spinner";


import React from 'react'

export default function Loading() {
    return (
        <div className='d-flex justify-content-center loading pb-5 my-5'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div>
    )
}


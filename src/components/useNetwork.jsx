import React, { useEffect, useState } from 'react'

function useNetwork() {

    let [isOnline, setIsOnline] = useState(true)
    useEffect(() => {
        detectOnline()
    }, [])

    function detectOnline() {
        window.addEventListener('online', () => {
            setIsOnline(true)
        })

        window.addEventListener('offline', () => {
            setIsOnline(false)
        })
    }

    return (
        <>

            {
                !isOnline ? <div className="network"><i className="fas fa-wifi"></i>You Are Offline</div> : ''
            }
        </>
    )
}

export default useNetwork
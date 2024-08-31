import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import React, { useEffect, useState } from 'react'
import './Loader.css'

export const LockedRouter = ({ children }: any) => {
    const [Authorized, setAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthorized(true)
            } else {
                setAuthorized(false)
            }
            setIsLoading(false)
        })
        return () => unsub();
    })
    // loader
    if (isLoading) return <>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </>

    return (
        <div>
            Locked Router<br />
            {Authorized ? <>{children}</> : <>
            Not Auth
            <img src="https://memi.klev.club/uploads/posts/2024-04/memi-klev-club-r001-p-memi-negr-s-arbuzom-na-golove-1.jpg" alt="" srcset="" />
            </>}
        </div>
    )
}


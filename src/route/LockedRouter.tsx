import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/index.js'
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
            {Authorized ? <>{children}</> : <>Not Auth</>}
        </div>
    )
}


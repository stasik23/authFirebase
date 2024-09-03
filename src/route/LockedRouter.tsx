import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { db } from '../firebase'
import { collection, DocumentData, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import './Loader.css'

interface HeroList {
    map(arg0: (el: any) => import("react/jsx-runtime").JSX.Element): React.ReactNode;
    hero: string;
    itembuild: string
    skillbuild: string

}

export const LockedRouter = ({ children }: any) => {
    const [Authorized, setAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [heroes, setHeroes] = useState<any>([])

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
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className="flex flex-col items-center space-y-4">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    </>

    if (!Authorized) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <div className="flex flex-col items-center space-y-4">
                    <h1 className='text-4xl'>Not Auth</h1>
                    <a href='/register' className='hover:scale-125'>Register</a>
                    <a href='/login' className='hover:scale-125'>Login</a>
                    <img src="https://memi.klev.club/uploads/posts/2024-04/memi-klev-club-r001-p-memi-negr-s-arbuzom-na-golove-1.jpg" alt="" />
                </div>
            </div>
        )
    }

    const getQuery = async () => {
        const heroes = await getDocs(collection(db, "heropool"))

        const elem: React.SetStateAction<HeroList> | DocumentData[] = []
        heroes.forEach((doc) => {
            const el = doc.data()
            elem.push(el)
        });
        setHeroes(elem)
    }

    return (
        <div>

            <div className='flex flex-col items-center justify-center min-h-screen'>
                <div className="flex flex-col items-center space-y-4">
                    <button
                        onClick={getQuery}
                        type="button"
                        className="bg-blue-500 text-white p-2 rounded w-64"
                    >CLICK FOR DATA</button>
                    {heroes?.map((el: { hero: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; itembuild: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; skillbuild: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                        <ul className="divide-y divide-gray-300 max-w-sm mt-16 mx-auto px-4 border">

                            <li className="py-4">

                                <div className="flex items-center space-x-4">
                                    <span className="text-lg font-bold">{el.hero}</span>
                                </div>

                                <ul className="divide-y divide-gray-300 bg-gray-50 rounded-md px-4 py-2 mt-4">
                                    <li className="py-2">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-md font-medium">{el.itembuild}</span>
                                        </div>
                                    </li>

                                    <li className="py-2">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-md font-medium">{el.skillbuild}</span>
                                        </div>
                                    </li>
                                </ul>

                            </li>

                        </ul>
                    ))}
                </div>
            </div><br />
        </div>
    )
}


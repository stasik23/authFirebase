import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase'
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react'
import './Loader.css'

interface HeroList {
    id: string;
    hero: string;
    itembuild: string
    skillbuild: string
}

export const LockedRouter = () => {
    const [Authorized, setAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [heroes, setHeroes] = useState<HeroList[]>([])

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
    }, [])

    // Loader
    if (isLoading) return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className="flex flex-col items-center space-y-4">
                <div className="lds-roller">
                    <div></div><div></div><div></div><div></div>
                    <div></div><div></div><div></div><div></div>
                </div>
            </div>
        </div>
    )
    
    // Not Authorized page
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
        const heroesSnapshot = await getDocs(collection(db, "heropool"))
        const heroList: HeroList[] = []

        heroesSnapshot.forEach((doc) => {
            const heroData = doc.data() as HeroList
            heroList.push({ ...heroData, id: doc.id })
        })

        setHeroes(heroList)
    }

    const deleteHandler = async (id: string) => {
        await deleteDoc(doc(db, "heropool", id));
        getQuery();
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className="flex flex-col items-center space-y-4">
                {heroes.length === 0 && (
                    <button
                        onClick={getQuery}
                        type="button"
                        className="bg-blue-500 text-white p-2 rounded w-64"
                    >
                        CLICK FOR DATA
                    </button>
                )}

                {heroes.length === 0 ? (
                    <div className="mt-16 text-gray-500">Натисніть на кнопку, щоб завантажити данні.</div>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-xl mt-16 px-4">
                        {heroes.map((el) => (
                            <li key={el.id} className="border p-4 rounded-lg shadow">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold">{el.hero}</span>
                                    <span
                                        onClick={() => deleteHandler(el.id)}
                                        className="text-red-500 font-bold cursor-pointer"
                                    >
                                        ✕
                                    </span>
                                </div>

                                <div className="divide-y divide-gray-300 bg-gray-50 rounded-md px-4 py-2 mt-4">
                                    <div className="py-2">
                                        <span className="text-md font-medium">Item Build: {el.itembuild}</span>
                                    </div>

                                    <div className="py-2">
                                        <span className="text-md font-medium">Skill Build: {el.skillbuild}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

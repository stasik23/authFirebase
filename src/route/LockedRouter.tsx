import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase'
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react'
import './Loader.css'
import { HeroList } from '../components/HeroList';
import { Loader } from '../components/Loader';
import { NotAuthorized } from '../components/NotAuthorized';
import { useQuery } from '@tanstack/react-query'
export interface IHeroItem {
    id: string;
    hero: string;
    itembuild: string
    skillbuild: string
}

export const LockedRouter = () => {
    const [Authorized, setAuthorized] = useState(false)
    // const [isLoading, setIsLoading] = useState(true)
    // const [heroes, setHeroes] = useState<IHeroItem[]>([])

    const { isLoading, data, refetch } = useQuery({
        // queryKey: ['heropool'],
        // queryFn: async() =>
        //     fetch('https://dummyjson.com/todo/1').then((res) =>
        //         res.json(),
        //     ),
        //     await getDocs(collection(db, "heropool"))
        queryKey: ['repoData'],
        queryFn: async () => {
            const querySnapshot = await getDocs(collection(db, 'heropool'));
            return querySnapshot.docs.map((doc) => ({ data: doc.data() as IHeroItem, id: doc.id }));
        }
    })

    console.log(data);
    
    // useEffect(() => {
    //     const unsub = onAuthStateChanged(auth, async (user) => {
    //         if (user) {
    //             setAuthorized(true)
    //             const result = await getQuery()
    //             setHeroes(result);
    //         } else {
    //             setAuthorized(false)
    //         }
    // setIsLoading(false)
    //     })
    //     return () => unsub();
    // }, [])

    // const getQuery = async () => {
    //     const heroesSnapshot = data
    //     console.log(data);

    //     const heroList: IHeroItem[] = [];
    //     if (heroesSnapshot)
    //         heroesSnapshot.forEach((doc) => {
    //             const heroData = doc.data() as IHeroItem;
    //             heroList.push({ ...heroData, id: doc.id });
    //         });
    //     return heroList

    // }

    const deleteHandler = async (id: string) => {
        await deleteDoc(doc(db, "heropool", id));
        refetch;
    }

    // Loader
    if (isLoading) return <Loader />;


    // Not Authorized page
    if (!Authorized) { <NotAuthorized /> }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className="flex flex-col items-center space-y-4">
                {/* TODO do auto writing on HeroList, => TODO Completed */}
                {data?.length === 0 ? (
                    <div className="mt-16 text-gray-500">Storage empty</div>
                ) : (
                    <HeroList heroes={data} deleteHandler={deleteHandler} refetch={refetch} />
                )}
                {/* {heroes.map(() => (
                    <HeroList heroes={heroes} deleteHandler={deleteHandler} getQuery={getQuery} />
                ))} */}
            </div>
        </div>
    );
}

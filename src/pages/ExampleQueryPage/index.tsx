import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Loader } from '../../components/Loader';

export const ExampleQueryPage = () => {
    const { isLoading, data } = useQuery({
        queryKey: ['heropool'],
        queryFn: async () =>
            fetch('https://dummyjson.com/todo/1').then((res) =>
                res.json(),
            ),
        // await getDocs(collection(db, "heropool"))
    })
    // Loader
    if (isLoading) return <Loader />;
    return (
        <div>

        </div>
    )
}

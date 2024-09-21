import React from 'react'
import { IHeroItem } from '../../route/LockedRouter'
import { HeroItem } from './HeroItem'

interface IHeroProps {
    deleteHandler: (el: string) => void
    getQuery: () => void
    heroes: IHeroItem[]
}

export const HeroList = ({ deleteHandler, getQuery, heroes }: IHeroProps) => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className="flex flex-col items-center space-y-4">
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-xl mt-16 px-4">
                    {heroes.map((el: IHeroItem) => (
                        <HeroItem key={el.id} deleteHandler={deleteHandler} hero={el}/>
                    ))
                    }
                </ul>
            </div>
        </div>
    )
}

// import { IHeroItem } from '../../route/LockedRouter'
import { HeroItem } from './HeroItem'

interface IHeroProps {
    deleteHandler: (el: string) => void
    getQuery: () => void
    heroes: any | undefined //Add IHeroItem
}

export const HeroList = ({ deleteHandler, heroes }: IHeroProps) => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className="flex flex-col items-center space-y-4">
                <h1 className="text-6xl font-bold text-gray-700 mb-4">Hero list</h1>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-xl px-4">
                    {heroes?.map((hero) => ( //Add IHeroItem
                        <HeroItem key={hero.id} deleteHandler={deleteHandler} hero={hero} />
                    ))
                    }
                </ul>
            </div>
        </div>
    )
}

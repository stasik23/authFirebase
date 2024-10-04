import React from 'react'
import { IHeroItem } from '../../../route/LockedRouter';

interface IHeroProps {
    deleteHandler: (el: string) => void;
    hero: IHeroItem
}

export const HeroItem = ({ deleteHandler, hero }: IHeroProps) => {
    return (
        <li className="divide-gray-300 bg-gray-50 border p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
                <span className="text-lg font-bold">{hero.hero}</span>
                <span
                    onClick={() => deleteHandler(hero.id)}
                    className="text-red-500 font-bold cursor-pointer"
                >
                    ✕
                </span>
            </div>

            <div className="divide-y divide-gray-400 bg-gray-100 rounded-md px-4 py-2 mt-4">
                <div className="py-2">
                    <span className="text-md font-medium">Item Build: {hero.itembuild}</span>
                </div>

                <div className="py-2">
                    <span className="text-md font-medium">Skill Build: {hero.skillbuild}</span>
                </div>
            </div>
        </li>
    )
}

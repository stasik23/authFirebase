import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase'
import { useForm } from "react-hook-form";
import { useState } from "react";


interface HeroList {
    hero: string;
    itembuild: string
    skillbuild: string

}
export const AboutUs = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isHero, setHero] = useState<string>('')
    const [isSkill, setSkill] = useState<string>('')
    const [isItem, setItem] = useState<string>('')


    const sendDoc = async () => {
        await addDoc(collection(db, "heropool"), {
            hero: isHero,
            skillbuild: isSkill,
            itembuild: isItem
        });
    }



    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col items-center space-y-4">
                <input
                    {...register("hero", {
                        required: "Heroname is required",
                        minLength: {
                            value: 2,
                            message: "Heroname must have at least 2 characters"
                        }
                    })}
                    className="p-2 border border-gray-300 rounded w-80"
                    name="hero"
                    type="text"
                    placeholder="Heroname"
                    value={isHero}
                    onChange={(e) => setHero(e.target.value)}
                />
                {errors.hero && <p>{errors.hero.message as string}</p>}


                <input
                    {...register("skill", {
                        required: "Skill is required",
                    })}
                    className="p-2 border border-gray-300 rounded w-80"
                    name="skill"
                    type="text"
                    placeholder="Skill"
                    value={isSkill}
                    onChange={(e) => setSkill(e.target.value)}
                />
                {errors.skill && <p>{errors.skill.message as string}</p>}


                <input
                    {...register("item", {
                        required: "Item is required"
                    })}
                    className="p-2 border border-gray-300 rounded w-80"
                    name="item"
                    type="text"
                    placeholder="Item"
                    value={isItem}
                    onChange={(e) => setItem(e.target.value)}
                />
                {errors.item && <p>{errors.item.message as string}</p>}

                <button className="bg-blue-500 text-white p-2 rounded w-64" onClick={handleSubmit(sendDoc)}>
                    Send
                </button>
            </div>
        </div>

    )
}

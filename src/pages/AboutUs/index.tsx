import { collection } from "firebase/firestore";
import { db } from '../../firebase';
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Sendler } from "../../utils/Sendler";

export const AboutUs = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isHero, setHero] = useState<string>('');
    const [isSkill, setSkill] = useState<string>('');
    const [isItem, setItem] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [heroes, setHeroes] = useState<any[]>([]);

    const getQuery = async () => {
        try {
            const querySnapshot = await collection(db, "heropool").get()
            const data = querySnapshot.docs.map((doc: { data: () => any; }) => doc.data());
            setHeroes(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        getQuery();
    }, []);

    // Send data function
    const sendDoc = async () => {
        try {
            setIsLoading(true);
            await Sendler(isHero, isSkill, isItem, reset, setIsLoading);
            toast.success("Data successfully sent!");
            console.log(getQuery());
             
        } catch (error) {
            console.error("Error adding document: ", error);
            toast.error("Failed to send data.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
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
                        onChange={(e) => setHero(e.target.value)} />
                    {errors.hero && <p className="text-red-500">{errors.hero.message as string}</p>}

                    <input
                        {...register("skill", {
                            required: "Skill is required",
                        })}
                        className="p-2 border border-gray-300 rounded w-80"
                        name="skill"
                        type="text"
                        placeholder="Skill"
                        value={isSkill}
                        onChange={(e) => setSkill(e.target.value)} />
                    {errors.skill && <p className="text-red-500">{errors.skill.message as string}</p>}

                    <input
                        {...register("item", {
                            required: "Item is required"
                        })}
                        className="p-2 border border-gray-300 rounded w-80"
                        name="item"
                        type="text"
                        placeholder="Item"
                        value={isItem}
                        onChange={(e) => setItem(e.target.value)} />
                    {errors.item && <p className="text-red-500">{errors.item.message as string}</p>}

                    <button
                        className="bg-blue-500 text-white p-2 rounded w-64"
                        onClick={handleSubmit(sendDoc)}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

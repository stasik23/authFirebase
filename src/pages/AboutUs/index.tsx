import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase';
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Sendler } from "../../utils/Sendler";
import { Loader } from "../../components/Loader";
import { useLoader } from "../../utils/LoaderProv";
import { onAuthStateChanged } from "firebase/auth";

export const AboutUs = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [Authorized, setAuthorized] = useState(false);
    const [isHero, setHero] = useState<string>('');
    const [isSkill, setSkill] = useState<string>('');
    const [isItem, setItem] = useState<string>('');
    const { isLoading, setLoading } = useLoader();
    const [heroes, setHeroes] = useState<any[]>([]);

    // refetch
    const getQuery = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'heropool'));
            const heroes: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
                heroes.push({ id: doc.id, ...doc.data() });
            });
            setHeroes(heroes);
            console.log(heroes);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        getQuery();
    }, []);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthorized(true);
            } else {
                setAuthorized(false);
            }
            setLoading(false);
        });
        return () => unsub();
    }, [setLoading]);

    if (isLoading) return <div><Loader /></div>;

    // Send data function
    const sendDoc = async () => {
        try {
            setLoading(true);
            await Sendler(isHero, isSkill, isItem, reset, setLoading);
            toast.success("Data successfully sent!");
            reset();
            await getQuery();
        } catch (error) {
            console.error("Error adding document: ", error);
            toast.error("Failed to send data.");
        } finally {
            setLoading(false);
        }
    };

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
        );
    }

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

                    {/* Отображение списка героев */}
                    {/* <ul className="w-80 mt-4">
                        {heroes.map((hero) => (
                            <li key={hero.id} className="p-2 border-b border-gray-300">
                                {hero.hero} - {hero.skillbuild} - {hero.itembuild}
                            </li>
                        ))}
                    </ul> */}
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

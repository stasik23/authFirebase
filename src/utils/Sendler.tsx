// import { getAuth } from "firebase/auth";
// import { addDoc, collection } from "firebase/firestore";
// import { db } from '../firebase';
// import { Bounce, toast } from "react-toastify";

// const auth = getAuth();

// export const Sendler = async (isHero: string, isSkill: string, isItem: string, reset: () => void, setIsLoading: (value: boolean) => void) => {

//     const notify = (message: string, type: 'success' | 'error') => {
//         toast(message, {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//             transition: Bounce,
//             type: type,
//         });
//     };

//     try {
//         setIsLoading(true);

//         await addDoc(collection(db, "heropool"), {
//             hero: isHero,
//             skillbuild: isSkill,
//             itembuild: isItem,
//         });

//         notify("Data successfully sent!", 'success');

//         reset();
//     } catch (error) {
//         console.error("Error adding document: ", error);
//         notify("Failed to send data.", 'error');
//     } finally {
//         setIsLoading(false);
//     }
// };
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase'; // Подключение базы данных
import { Bounce, toast } from "react-toastify";

// Функция отправки данных
export const Sendler = async (isHero: string, isSkill: string, isItem: string, reset: () => void, setIsLoading: (value: boolean) => void) => {

    // Уведомления с помощью react-toastify
    const notify = (message: string, type: 'success' | 'error') => {
        toast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            type: type,
        });
    };

    try {
        // Начало загрузки
        setIsLoading(true);

        // Асинхронная операция добавления документа в Firestore
        await addDoc(collection(db, "heropool"), {
            hero: isHero,
            skillbuild: isSkill,
            itembuild: isItem,
        });
    } finally {

        setIsLoading(false);
    }
};

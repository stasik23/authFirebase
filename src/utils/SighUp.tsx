import { createUserWithEmailAndPassword } from "firebase/auth";
import { Bounce, toast } from "react-toastify";

interface CreateUser {
    auth: any;
    email: string;
    password: string;
}

export const SighUp = ({ auth, email, password }: CreateUser) => {
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
    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            notify('🦄 Success! You are registered!', 'success');
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("Error:", errorMessage);
            notify(`Error: ${errorMessage}`, 'error');
        });

}
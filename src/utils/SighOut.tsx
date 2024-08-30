import { getAuth, signOut } from "firebase/auth";
import { Bounce, toast } from "react-toastify";

const auth = getAuth();
export const SighOut = (p0: { auth: any; email: string; password: string; }) => {
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
    signOut(auth).then(() => {
        notify('Logout successfull', 'success')
    }).catch((_error) => {
        console.log('Ops...Something went wrong');
        notify('Logout error', 'error')

    });

}
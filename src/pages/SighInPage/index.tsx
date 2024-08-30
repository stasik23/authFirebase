import React from 'react'
import { auth } from '../../firebase';
import 'react-toastify/dist/ReactToastify.css';
import { SignIn } from '../../utils/SighIn';
import { ToastContainer } from 'react-toastify';


export const SighInPage = () => {
  const handleSignIn = () => {
    SignIn({ auth, email: "lega100proch@gmail.com", password: "Degenerat1234k" });
  };
  return (
    <div>
      <button onClick={handleSignIn}>auth</button>
      <ToastContainer />
    </div >
  )
}
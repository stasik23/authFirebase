import React, { useState } from 'react'
import { auth } from '../../firebase';
import 'react-toastify/dist/ReactToastify.css';
import { SignIn } from '../../utils/SighIn';
import { ToastContainer } from 'react-toastify';


export const SighInPage = () => {
  const [isEmail, setEmail] = useState<string>('')
  const [isPassword, setPassword] = useState<string>('')

  // const handleSignIn = () => {
  //   SignIn({ auth, email: "lega100proch@gmail.com", password: "Degenerat1234k" });
  // };
  const handleSignIn = () => {
    SignIn({ auth, email: isEmail, password: isPassword });
    console.log(isEmail, isPassword);

  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <input
          className="p-2 border border-gray-300 rounded w-80"
          placeholder="Email"
          value={isEmail}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 border border-gray-300 rounded w-80"
          type="password"
          placeholder="Password"
          value={isPassword}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded w-64"
          onClick={handleSignIn}
        >
          Login
        </button>
        <ToastContainer />
      </div>
    </div>
  )
}
import React from 'react'
import { SighOut } from '../../utils/SighOut';
import { auth } from '../../firebase';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

export const Logout = () => {
    const handleLogout = () =>{
        SighOut({ auth, email: "lega100proch@gmail.com", password: "Degenerat1234k" });
    }
  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
        <ToastContainer />
    </div>
  )
}

// import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from '../../firebase'

// const createUser = {
//     email: "morgeishtern@gmail.com",
//     password: "degenerat123"
// }

// export const SighUpPage = () => {
// const sighUp = () => {
//     createUserWithEmailAndPassword(auth, createUser.email, createUser.password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log("User created", user);
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log("Error: ", errorMessage);
//         console.log("In: ", errorCode);
//       });

//   }
//     return (
//         <div>
//             <button onClick={sighUp}>createUser</button>
//         </div >
//     )
// }

import React, { useState } from 'react'
import { auth } from '../../firebase';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export const SighUpPage = () => {
  const [regEmail, setEmail] = useState<string>('')
  const [regPassword, setPassword] = useState<string>('')
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, regEmail, regPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User created", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: ", errorMessage);
        console.log("In: ", errorCode);
      });

  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <input
          className="p-2 border border-gray-300 rounded w-80"
          placeholder="Email"
          value={regEmail}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 border border-gray-300 rounded w-80"
          type="password"
          placeholder="Password"
          value={regPassword}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded w-64"
          onClick={handleSignUp}
        >
          Register
        </button>
        <ToastContainer />
      </div>
    </div>
  )
}

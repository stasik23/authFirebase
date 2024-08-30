// import React from 'react'
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from '../../firebase'

// const createUser = {
//     email: "morgeishtern@gmail.com",
//     password: "degenerat123"
// }

// export const SighUpPage = () => {
//     const sighUp = () => {
//         createUserWithEmailAndPassword(auth, createUser.email, createUser.password)
//           .then((userCredential) => {
//             const user = userCredential.user;
//             console.log("User created", user);
//           })
//           .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log("Error: ", errorMessage);
//             console.log("In: ", errorCode);
//           });
    
//       }
//     return (
//         <div>
//             <button onClick={sighUp}>createUser</button>
//         </div >
//     )
// }

import React from 'react'
import { auth } from '../../firebase';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { SighUp } from '../../utils/SighUp';


export const SighUpPage = () => {
  const handleSignUp = () => {
    SighUp({ auth, email: "morgeishtern@gmail.com", password: "Degenerat1234k" });
  };
  return (
    <div>
      <button onClick={handleSignUp}>Register</button>
      <ToastContainer />
    </div >
  )
}

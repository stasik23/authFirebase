import { useState } from 'react';
import { auth } from '../../firebase';
import { SignIn } from '../../utils/SighIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';


export const SighInPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isEmail, setEmail] = useState<string>('')
  const [isPassword, setPassword] = useState<string>('')
  const navigate = useNavigate()

  // const handleSignIn = () => {
  //   SignIn({ auth, email: "lega100proch@gmail.com", password: "Degenerat1234k" });
  // };

  const handleSignIn = async () => {
    SignIn({ auth, email: isEmail, password: isPassword });
    navigate('/')
    console.log(isEmail, isPassword);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
      <h1 className='text-4xl'>Login</h1>
      <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address"
            }
          })}
          className="p-2 border border-gray-300 rounded w-80"
          placeholder="Email"
          value={isEmail}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p>{errors.email.message as string}</p>}


        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters"
            }
          })}
          className="p-2 border border-gray-300 rounded w-80"
          name="password"
          type="password"
          placeholder="Password"
          value={isPassword}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p>{errors.password.message as string}</p>}

        <button
          className="bg-blue-500 text-white p-2 rounded w-64"
          onClick={handleSubmit(handleSignIn)}
        >
          Login
        </button>
        <ToastContainer />
      </div>
    </div>
  )
}

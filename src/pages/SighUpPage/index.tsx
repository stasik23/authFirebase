import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { auth } from '../../firebase';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Loader } from "../../components/Loader";
import { useLoader } from "../../utils/LoaderProv";

export const SighUpPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [regEmail, setEmail] = useState<string>('')
  const [regPassword, setPassword] = useState<string>('')
  const [passValue, getPassValue] = useState<string>('')
  const { isLoading, setLoading } = useLoader();
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [setLoading]);

  if (isLoading) return <div><Loader/></div>

  const handleSignUp = async () => {
    createUserWithEmailAndPassword(auth, regEmail, regPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User created", user);
        navigate('/login')
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
        <h1 className="text-6xl font-bold text-gray-700 mb-4">Register</h1>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Type correct email"
            }
          })}
          className="p-2 border border-gray-300 rounded w-80"
          placeholder="Email"
          value={regEmail}
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
          type="password"
          placeholder="Password"
          value={regPassword}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p>{errors.password.message as string}</p>}

        <input {...register("confirmPassword", {
          required: "Confirm password!",
          validate: (match) => {
            const password = getPassValue(regPassword)
            return match === password || "Passwords should match!"
          }
        })}
          type="password"
          className="p-2 border border-gray-300 rounded w-80"
          placeholder="Confirm Password"
          id="confirmPassword"
          onChange={(e) => getPassValue(e.target.value)} />

        {errors.confirmPassword && <p>{errors.confirmPassword.message as string}</p>}

        <button
          className="bg-blue-500 text-white p-2 rounded w-64"
          onClick={handleSubmit(handleSignUp)}
        >
          Register
        </button>
        <ToastContainer />
      </div>
    </div>
  )
}


import GoogleIcon from "../../../assets/AuthIcons/GoogleIcon";
import MailIcon from "../../../assets/AuthIcons/MailIcon";
import LockIcon from "../../../assets/AuthIcons/PasswordIcon";

import { Link,useNavigate } from "react-router-dom"
import { useState } from "react";
import { signIn,signInWithGoogle } from "../../../supabase/auth";


const LoginPage = () => {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };


    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            ( await signIn(formData.email,formData.password)).error ? 
                setErrorMessage("Email or password is incorrect") 
                : navigate('/home')
            
        } catch (error) {
            console.log(error)
           
        }
        
    }
    const signInGoogle = async () => {
        try {
            await signInWithGoogle()
        } catch (error) {
            console.log(error)
        }
    }

    





    return (
        <div className="w-full h-screen flex self-center place-content-center place-items-center ">
            
            <div className="w-96 text-gray-600 space-y-2  p-9 shadow-xl border rounded-xl relative">
                <div className="flex place-content-center  pb-5">
                    <img src="/icon.png" className="w-24  "></img>
                </div>
                <div className="">
                    <button onClick={signInGoogle} className="btn w-full relative mb-4">
                        <div className="absolute left-4 mr-2">
                            <GoogleIcon/>
                        </div>
                        Sign-in with Google
                    </button>

                </div>
                <div className='flex flex-row text-center w-full  py-3'>
                        <div className='border-b-2 mb-2.5 mr-2 w-full'></div><div className='text-sm font-bold w-fit'>or</div><div className='border-b-2 mb-2.5 ml-2 w-full'></div>
                </div>
                <form onSubmit={onSubmit} className=" inline-block w-full ">

                    { errorMessage && (
                        <div className="text-red-500 text-sm text-center">{errorMessage}</div>
                    )}
                    <label className="text-sm text-gray-600 flex items-center">
                        <MailIcon/>
                        <span className="ml-1">Email</span>
                        <span className="text-red-500 m-0 p-0">*</span>
                    </label>
                    <input 
                        type="text"
                        name="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com" 
                        className="w-full mt-2 px-3 py-2 outline-none border shadow-sm rounded-md transition duration-300" />


                    <label className="text-sm text-gray-600 flex items-center mt-2 ">
                        <LockIcon/> 
                        <span className="ml-1">Password</span>
                        <span className="text-red-500 m-0 p-0">*</span>
                    </label>
                    <input 
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full mt-2 px-3 py-2 outline-none border shadow-sm rounded-md transition duration-300" />
                    

                    <div className="flex place-content-center mt-4">
                        <button type="submit" className="btn btn-primary w-full">Sign-in with Email</button>
                    </div>
                </form>

                <div className=" text-center pt-1" >
                    <div className="text-sm"> Do not have an account?<Link to={"/register"} className="m-1 text-blue-400 underline">Sign up</Link>for an account now.</div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
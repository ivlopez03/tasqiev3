import { signUp } from "../../../supabase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye , IoMdEyeOff } from "react-icons/io";


const RegisterPage = () => {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
   
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });

    const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            }));
        
            if (name === "password") {
            validatePassword(value);
            }
        };
    

    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        uppercase: false,
        number: false,
      });

    // (?=.*[A-Z]) - At least one uppercase letter
    // (?=.*\d) - At least one digit
    // [A-Za-z\d]{8,} - At least 8 characters
    const validatePassword = (password) => {
        const validations = {
          length: password.length >= 8,
          uppercase: /[A-Z]/.test(password),
          number: /\d/.test(password),
        };
        setPasswordValidations(validations);
      };
  
    const onSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!formData.email || !formData.password || !formData.confirmPassword || !formData.name) {
            setErrorMessage("All fields must be filled.");
            return;
        }
    
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
    
        // Validate password
        if (!passwordValidations.length || !passwordValidations.uppercase || !passwordValidations.number) {
            setErrorMessage("Password does not meet the required criteria.");
            return;
        }
        try {
            await signUp(formData.email,formData.password,formData.name).then(()=>{navigate('/verify-email')})
        } catch (error) {
            console.log(error)
        }
        
    }

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };


   

    return (
        <>
            <main className="w-full h-screen flex self-center place-content-center place-items-center ">
                <div className="w-96 text-gray-600 space-y-5 p-9 shadow-xl border rounded-xl  relative">
                    <div className="flex place-content-center  pb-5">
                        <img src="/icon.png" className="w-24  "></img>
                    </div>
                    <div className="mt-2">
                        <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Create a new account</h3>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-600 font-bold"> Name</label>
                            <input type="text"
                                autoComplete="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full mt-2 px-3 py-2 outline-none border shadow-sm rounded-md transition duration-300"
                             />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 font-bold"> Email </label>
                        
                            <input 
                                type="email"
                                name="email"
                                autoComplete="email"
                                placeholder="email@example.com "
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full mt-2 px-3 py-2 outline-none border shadow-sm rounded-md transition duration-300" />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 font-bold"> Password </label>
                            <div className="flex items-center relative ">
                            <input 
                                type={showPassword ? "text" : "password"}
                                name="password"
                                autoComplete="new-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full mt-2 px-3 py-2 outline-none border shadow-sm rounded-md transition duration-300" />
                             <button type="button" onClick={toggleShowPassword} className="absolute right-3 mt-2" >
                                {showPassword ? <IoMdEyeOff className="w-[20px] h-[20px]"/> : <IoMdEye className="w-[20px] h-[20px]"/>}
                            </button>


                            </div>
                            
                        </div>
                        <ul className="text-[11px] ">
                            <li className={passwordValidations.length ? "text-[green]" : "text-gray-400"}>
                            {passwordValidations.length && <span>✔️</span>} At least 8 characters
                            </li>
                            <li className={passwordValidations.uppercase ? "text-[green]" : "text-gray-400"}>
                            {passwordValidations.uppercase && <span>✔️</span>} At least one uppercase letter
                            </li>
                            <li className={passwordValidations.number ? "text-[green]" : "text-gray-400"}>
                            {passwordValidations.number && <span>✔️</span>} At least one number
                            </li>
                        </ul>
                        <div>
                            <label className="text-sm text-gray-600 font-bold"> Confirm Password </label>
                            <input 
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                autoComplete="off"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full mt-2 px-3 py-2 outline-none border shadow-sm rounded-md transition duration-300" />
                        </div>
                        {errorMessage && (
                            <div className="text-[11px] text-[tomato]" >
                                {errorMessage}
                            </div>
                        )}
                        
                        <button
                            type="submit"
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg bg-black hover:bg-[#333333] hover:shadow-xl transition duration-300`}
                            >
                            Create account
                            
                        </button>
                        <div className="text-sm text-center">
                            Already have an account? <Link to="/login" className="text-blue-400 underline">Continue</Link>.
                        </div>                       
                    </form>

                </div>
            </main>
        </>
    )
}

export default RegisterPage;
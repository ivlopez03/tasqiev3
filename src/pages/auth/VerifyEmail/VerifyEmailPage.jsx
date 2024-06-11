//import { supabase } from "../../../supabase/supabase";

const VerifyEmailPage = () => {

    /** 
    const resendEmail = async (email) => {
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: email,
            options: {
            emailRedirectTo: 'http://localhost:5173/login'
            }
        })
    }
    */

    return (
        <div className="w-full h-screen flex self-center place-content-center place-items-center bg-base200  ">
            <div className="w-[700px] text-center">
                <div className="flex place-content-center p-5">
                    <img src="./icon.png" alt="logo" className="w-[130px]" />
                </div>
                <div >
                    <div className="text-5xl flex items-center place-content-center relative">Verify your email <span className="ml-3 top-[-5px] relative">📩</span> </div>
                    <p className="p-2 mt-8 mb-10 text-xl">
                    Almost there! To complete the sign-up process, please verify your email address by clicking the link we sent to your email.
                    </p>
                    
                    <button className=" rounded-md px-3 py-2 text-sm bg-black text-white hover:bg-[#000000be] hover:shadow-xl transition duration-300">
                    Resend Verification Email 
                    </button>
                </div>

            </div>
           
        
        </div>
    );
}

export default VerifyEmailPage;
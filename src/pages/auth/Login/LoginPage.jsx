import { BsGoogle, BsGithub } from "react-icons/bs"


const LoginPage = () => {



    return (
        <div className="w-full h-screen flex self-center place-content-center place-items-center ">
            
            <div className="w-96 text-gray-600 space-y-2  p-9 shadow-xl border rounded-xl top-[-40px] relative">
                <div className="flex place-content-center  pb-5">
                    <img src="/icon.png" className="w-24  "></img>
                </div>
                <div className="">
                    <button className="btn w-full relative mb-4">
                        <div className="absolute left-4">
                            <BsGoogle className="mr-2" />
                        </div>
                        Sign-in with Google
                    </button>

                    <button className="btn btn-neutral  w-full relative ">
                        <div className="absolute left-4">
                            <BsGithub className="mr-2" />
                        </div>
                        Sign-in with Github
                    </button>
                </div>
                <div className='flex flex-row text-center w-full  py-3'>
                        <div className='border-b-2 mb-2.5 mr-2 w-full'></div><div className='text-sm font-bold w-fit'>or</div><div className='border-b-2 mb-2.5 ml-2 w-full'></div>
                </div>
                <form action="" className=" inline-block ">
                    <label className="text-sm text-gray-600 font-bold">Email</label>
                    <input type="text" placeholder="email@example.com" className="input input-bordered w-full h-[36px]   " />
                    <label className="text-sm text-gray-600 font-bold">Password</label>
                    <input type="password" className="input input-bordered w-full  h-[36px]" />
                    
                    <div className="flex place-content-center mt-4">
                        <button type="submit" className="btn btn-primary w-full">Sign-in with Email</button>
                    </div>
                </form>

                <div className=" text-center pt-1" >
                    <div className="text-sm"> Do not have an account?<span className="m-1 text-blue-400 underline">Sign up</span>for an account now.</div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
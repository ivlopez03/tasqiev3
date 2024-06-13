
import {  LuChevronsUpDown }  from "react-icons/lu";
import { FaRocket,FaChartSimple } from "react-icons/fa6";
import { AiFillInteraction } from "react-icons/ai";
import { IoCalendarNumber} from "react-icons/io5";
import { IoIosAddCircle,IoIosSettings } from "react-icons/io";
import { FaUser,FaLightbulb,FaUserEdit,FaProjectDiagram   } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { useState } from "react";
import { signOut } from "../supabase/auth";
import { useAuth } from "../hooks/authContext";

import { Link,useNavigate } from "react-router-dom"


function Sidebar(){

    const navigate = useNavigate();

    const [showSubMenu, setShowSubMenu] = useState(false);

    const handleShowMenu = () => {
        setShowSubMenu(!showSubMenu)
    }

    const logOut = async () => {
        try {
            await signOut().then(() => {navigate('/login')})
            setShowSubMenu(false)
            console.log('logged out')
        } catch (error) {
            console.log(error)
        }
    }

    const { userLoggedIn,user } = useAuth();

    return(
        <>
        { userLoggedIn ?
         <div className=" w-[280px] min-w-[280px] h-[100vh] p-3 border-r relative">
            
         <div onClick={handleShowMenu} className=" rounded-md p-2 flex items-center relative cursor-pointer bg-base200 hover:bg-base-300 ">
             <div className="flex place-content-center items-center rounded-md bg-white w-[30px] h-[30px]">
                 {user.avatar_url ? <img src={user.picture}></img> : <FaUser/> }
                 
                 
             </div>
             <div className="ml-4 leading-none max-w-[160px]">
                 <p className=" text-[15px] line-clamp-1" >{user.name}</p>
                 <span className="text-[13px] text-neutraln line-clamp-1 ">{user.email}</span>
             </div>
             <div className="absolute right-5">
                 <LuChevronsUpDown/>
             </div>
         </div>
         <div>
         { showSubMenu && (
             <div className="border w-fit rounded-md absolute right-3 mt-1 bg-white">
             <div className="">
                 <button className="text-sm flex items-center px-2 py-1 hover:bg-base200 w-full">
                     <FaUserEdit className="mr-2"/>
                     Edit profile
                 </button>
             </div>
             <div className="w-full">
                 <button className="text-sm flex items-center px-2 py-1 hover:bg-base200 w-full ">
                     <IoIosSettings className="mr-2"/>
                     Settings
                     </button>
             </div>
             <div>
                 <button onClick={logOut} className="text-sm flex items-center px-2 py-1 hover:bg-base200 w-full ">
                     <BiLogOut className="mr-2"/>
                     Log Out
                 </button>
             </div>
         </div>

         )}
         </div>
         
         <div className=" mt-4">
             <div>
                 <div className="group hover:bg-[#fafafa]  hover:font-semibold rounded-md">
                     <Link to={`/home`} className="p-2 flex items-center">
                         <GoHomeFill fill="#c1c1c1" className="group-hover:fill-black "/>
                         <span className=" ml-2 text-sm">Home</span>
                     </Link>
                 </div>
                 <div className=" group hover:bg-[#fafafa]  hover:font-semibold rounded-md">
                     <Link to={`/myideas`} className="p-2 flex items-center">
                         <FaRocket fill="#c1c1c1" className="group-hover:fill-black " />
                     <span className=" ml-2 text-sm">My ideas</span>
                     </Link>
                 </div>
                 <div className=" group hover:bg-[#fafafa] hover:font-semibold rounded-md">
                     <Link to={`/myproductivity`} className="p-2 flex items-center">
                         <FaChartSimple fill="#c1c1c1"  className="group-hover:fill-black "/>
                         <span className=" ml-2 text-sm">My productivity</span>
                     </Link>
                 </div>
                 <div className="group hover:bg-[#fafafa]  hover:font-semibold rounded-md">
                     <Link to={`/routines`} className="p-2 flex items-center">
                         <AiFillInteraction fill="#c1c1c1" className="group-hover:fill-black "/>
                         <span className=" ml-2 text-sm">Routines</span>
                     </Link>
                 </div>
                 <div className="group hover:bg-[#fafafa] hover:font-semibold rounded-md">
                     <Link to={`/calendar`} className="p-2 flex items-center">
                         <IoCalendarNumber fill="#c1c1c1" className="group-hover:fill-black " />
                         <span className=" ml-2 text-sm">Calendar</span>
                     </Link>
                 </div>

                
             </div>
             <div className="mt-4">
                 <hr />
                 <div className="group hover:bg-[#fafafa]  hover:font-semibold mt-2 rounded-md">
                     <a href="" className="p-2 flex items-center">
                     <FaLightbulb fill="#c1c1c1" className="group-hover:fill-black "/>
                     <span className=" ml-2 text-sm">Capture idea</span>
                     </a>
                 </div>
                 <div className="group hover:bg-[#fafafa] hover:font-semibold rounded-md">
                     <a href="" className="p-2 flex items-center">
                     <IoIosAddCircle fill="#c1c1c1" className="group-hover:fill-black " />
                     <span className=" ml-2 text-sm">Create task</span>
                     </a>
                 </div>
                 <div className="group hover:bg-[#fafafa]  hover:font-semibold rounded-md">
                     <Link to={`/plan/:create`} className="p-2 flex items-center">
                         <FaProjectDiagram fill="#c1c1c1" className="group-hover:fill-black "/>
                         <span className=" ml-2 text-sm">Create tasqie</span>
                     </Link>
                 </div>
             </div>
         </div>
         <div className="mt-4 h-[45%]">
             <hr />
             <div className="text-sm mt-2 p-2">
                 <p>Workspaces</p>
             </div>
             <div className="text-sm overflow-auto h-[80%]  scrollbar">
                 <div className="ml-4">
                     <div  className="group hover:bg-[#fafafa]  hover:font-semibold rounded-md">
                         <Link to={`/workspaces`} className="p-2 flex items-center">
                             <div className=" px-[6px] py-[0px] rounded-md bg-secondaryTextColor">
                                 <span className=" text-[10px]">W</span>
                             </div>
                             <span className=" ml-2 text-sm">Workspace one</span>
                         </Link>
                     </div>
                     <div className="group hover:bg-[#fafafa]  hover:font-semibold rounded-md">
                         <Link to={`/workspaces/workspacetwo`} className="p-2 flex items-center" >
                             <div className=" px-[6px] py-[0px] rounded-md bg-primaryTextColor ">
                                 <span className=" text-[10px]">W</span>
                             </div>
                             <span className=" ml-2 text-sm">Workspace two</span>
                         </Link>
                     </div>
                     
                     
                 </div>
             </div>
         </div>
     </div>

        :<></>

        }
        
        </>
       


    )
}

export default Sidebar
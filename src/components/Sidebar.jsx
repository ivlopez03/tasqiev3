import MenuIcon from "../assets/SidebarIcons/MenuIcon";
import HomeIcon from "../assets/SidebarIcons/HomeIcon";
import IdeaIcon from "../assets/SidebarIcons/IdeaIcon";
import ProductivityIcon from "../assets/SidebarIcons/ProductivityIcon";
import RoutineIcon from "../assets/SidebarIcons/RoutineIcon";
import CalendarIcon from "../assets/SidebarIcons/CalendarIcon";
import CreateTaskIcon from "../assets/SidebarIcons/CreateTaskIcon";
import CaptureIdeaIcon from "../assets/SidebarIcons/CaptureIdeaIcon";
import DefaultUserIcon from "../assets/SidebarIcons/DefaultUserIcon";
import LogoutIcon from "../assets/LogoutIcon";
import PlusSMIcon from "../assets/PlusSMIcon";

import { useState,useEffect,useRef } from "react";
import { signOut } from "../supabase/auth";
import { useAuth } from "../context/authContext";

import { useNavigate,NavLink,Link } from "react-router-dom"
import { useWorkspaces } from "../context/workspaceContext/WorkspaceContext";

import CreateWorkspaceModal from "./homepage/createWorkspaceModal";


function Sidebar(){

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    
    const { workspaces,createWorkspace } = useWorkspaces();
    const [isActive, setIsActive] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);



    const handleWorkspaceCreated = (newWorkspace) => {
        createWorkspace(newWorkspace);
        
      };

    // Function to close menu when clicked outside
    const handleClickOutside = (event) => {
        if (menuRef.current && 
            !menuRef.current.contains(event.target) && 
            buttonRef.current && 
            !buttonRef.current.contains(event.target)) {
            setIsMenuOpen(false);
            setIsActive(false);
        }
    };
    // UseEffect to Close menu when clicked outside
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsActive(!isActive);
        
    }

    // Logout function
    const logOut = async () => {
        try {
            await signOut().then(() => {navigate('/login')})
            setIsMenuOpen(false)
            console.log('logged out')
        } catch (error) {
            console.log(error)
        }
    }
    // Get Context and user data
    const { user } = useAuth();

    
   

   

    return(
        <>
         <div className=" w-[280px] min-w-[280px] h-[100vh] p-3 border-r relative  font-light bg-[#fcfcfc] ">
            
         <div ref={buttonRef}  onClick={toggleMenu} className={` border  rounded-md p-2 flex items-center relative cursor-pointer ${ isActive ? 'border-base200' : ''}  hover:border-base200  transition duration-300`}>
             <div className="flex place-content-center items-center rounded-md bg-white w-[30px] h-[30px]">
                 {user.avatar_url ? <img src={user.picture} className="w-[30px] h-[30px] rounded-md" alt="profile image" ></img> : <DefaultUserIcon/> }
                 
                 
             </div>
             <div className="ml-4 leading-none max-w-[160px]p-1">
                 <p className=" text-[15px] line-clamp-1" >{user.name}</p>
                 <span className="text-[12px] line-clamp-1 ">{user.email}</span>
             </div>
             <div className="absolute right-5">
                <MenuIcon/>
             </div>
         </div>
         <div>
         { isMenuOpen && (
             <div ref={menuRef} className="absolute right-3 mt-1 bg-white border border-gray-200 rounded-md shadow-md ">
                    <ul className="text-[12px]">
                        <li className="py-1 px-3 rounded-t-md cursor-pointer hover:bg-base200">Settings</li>
                        <li className="py-1 px-3 cursor-pointer hover:bg-base200">Upgrade</li>
                        <li onClick={logOut} className="py-1 px-3 rounded-b-md cursor-pointer hover:bg-base200 border-t-[1px] flex items-center">
                            <LogoutIcon/>
                            <span className="ml-1">Log Out</span>
                        </li>
                    </ul>
            </div>
            
         )}
         </div>
         
         <div className=" mt-4">
             <div>
                 <div className="group hover:bg-base200  hover:font-normal   rounded-md">
                     <NavLink to='/home'  className="p-2 flex items-center" >
                        <HomeIcon/>
                         <span className=" ml-2 text-sm">Home</span>
                     </NavLink>
                 </div>
                 <div className="group hover:bg-base200 hover:font-normal rounded-md">
                     <NavLink to={`/calendar`} className="p-2 flex items-center">
                         <CalendarIcon/>
                         <span className=" ml-2 text-sm">Calendar</span>
                     </NavLink>
                 </div>
                 
                 <div className="group hover:bg-base200 hover:font-normal rounded-md">
                     <NavLink to={`/routines`} className="p-2 flex items-center">
                         <RoutineIcon/>
                         <span className=" ml-2 text-sm">Timeline</span>
                     </NavLink>
                 </div>
                 <div className=" group hover:bg-base200 hover:font-normal rounded-md">
                     <NavLink to={`/myproductivity`} className="p-2 flex items-center">
                         <ProductivityIcon/>
                         <span className=" ml-2 text-sm">My productivity</span>
                     </NavLink>
                 </div>
                
                 <div className=" group hover:bg-base200  hover:font-normal rounded-md">
                     <NavLink to={`/myideas`} className="p-2 flex items-center">
                        <IdeaIcon/>                     
                         <span className=" ml-2 text-sm">My ideas</span>
                     </NavLink>
                 </div>

                
             </div>
             <div className="mt-4  text-[13px] rounded-xl  ">
                 
                 <div className="mb-1 p-2 flex items-center relative">
                    <p className="text-[13px]">Quick actions</p>
                    <button className="absolute right-1 border p-[1px] rounded-md  text-gray-400 border-gray-300 hover:bg-base200 transition duration-300">
                        <MenuIcon/>
                 </button>
                </div>
                <div className="ml-4">
                    <div className="group hover:bg-base200 hover:font-normal rounded-md">
                        <a href="" className="p-1 flex items-center">
                        <CaptureIdeaIcon/>
                        <span className=" ml-2 ">Capture idea</span>
                        </a>
                    </div>
                    <div className="group hover:bg-base200 hover:font-normal rounded-md">
                        <a href="" className="p-1 flex items-center">
                        <CreateTaskIcon/>
                        <span className=" ml-2 ">Create task</span>
                        </a>
                    </div>
                    <div className="group hover:bg-base200 hover:font-normal rounded-md">
                        <NavLink to={`/plan/:create`} className="p-1 flex items-center">
                            <CreateTaskIcon/>
                            <span className=" ml-2 ">Create tasqie</span>
                        </NavLink>
                    </div>

                </div>

                 
            </div>
         </div>
         <div className="mt-4 h-[280px] h-max-[280px] relative">
             
             <div className="text-sm mt-2 p-2 flex items-center relative ">
                 <p className="text-[13px]">Workspaces</p>
                 <button onClick={() => setIsModalOpen(true)} className="absolute right-1 border p-[1px] rounded-md  text-gray-400 border-gray-300 hover:bg-base200 transition duration-300">
                    <PlusSMIcon/>
                 </button>
             </div>
             
             <div className="h-[80%] overflow-y-scroll ">
                <div className="ml-4">
                    <div>
                    {workspaces.map((workspace) => (
                            <div key={workspace.id} className="group hover:bg-base200 hover:font-normal rounded-md ">
                                <Link to={`/workspace/${workspace.id}`} className="p-2 flex items-center ">
                                    <div className={ `w-6 h-6  rounded-md flex items-center justify-center`} style={{ backgroundColor: workspace.background_color }}>
                                         <span className={` text-[10px] font-semibold ${workspace.background_color === '#fff232' ?  'text-black' : 'text-white' }`}>{workspace.workspace_title[0]}</span>
                                    </div>
                                    <span className=" ml-2 text-sm">{workspace.workspace_title}</span>
                                </Link>
                            </div>
                        ))}
                    
                    </div>
                </div>
             </div>
             <div className="bg-[#fcfcfc]  absolute bottom-[-2px] h-11 w-full blur-xl"></div>
             
         </div>
         <div className="group relative top-10 flex justify-center w-full ">
            <div className="absolute animated-background -inset-[-4px] bg-gradient-to-r from-emerald-500 to-primary blur  opacity-90   group-hover:from-primary group-hover:to-emerald-500 group-hover:-inset-[-2px] transition-all duration-200"></div>
            <button className=" relative w-full p-2 bg-[#ffffff] rounded-md text-sm text-gray-500 group-hover:text-black transition duration-300 "> Subscribe to premium</button>
         </div>
     </div>
     <CreateWorkspaceModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}  onWorkspaceCreated={handleWorkspaceCreated} />

        
        
    </>
       


    )
}

export default Sidebar




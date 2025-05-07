import MenuIcon from "../assets/SidebarIcons/MenuIcon";
import DefaultUserIcon from "../assets/SidebarIcons/DefaultUserIcon";
import LogoutIcon from "../assets/LogoutIcon";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md"
import { TbLayoutList } from "react-icons/tb";
import { colors_array } from "../utils/colorsWorkspace";

import { IoAdd,IoCalendarClearOutline } from "react-icons/io5";

import { useState, useEffect, useRef } from "react";
import { signOut } from "../supabase/auth";
import { useAuth } from "../context/authContext";

import { useNavigate, NavLink } from "react-router-dom";
import { useWorkspaces } from "../context/workspaceContext/WorkspaceContext";


import CreateWorkspaceModal from "./homepage/createWorkspaceModal";
import QuickTaskModal from "./QuickTaskModal";

function Sidebar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);


  const { workspaces, createWorkspace } = useWorkspaces();
  const [isActive, setIsActive] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuickTaskModalOpen, setIsQuickTaskModalOpen] = useState(false);

  const handleWorkspaceCreated = (newWorkspace) => {
    createWorkspace(newWorkspace);
  };

  // Function to close menu when clicked outside
  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
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
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsActive(!isActive);
  };

  // Logout function
  const logOut = async () => {
    try {
      await signOut().then(() => {
        navigate("/login");
      });
      setIsMenuOpen(false);
      console.log("logged out");
    } catch (error) {
      console.log(error);
    }
  };
  // Get Context and user data
  const { user } = useAuth();

  

  return (
    <>
      <div className=" w-[280px] min-w-[280px] h-[100vh] p-3 border-r border-base-100  relative  font-light bg-base-100 ">
        <div className="relative flex items-center gap-2 mb-2  border-gray-200 pb-2 ">
          <img src="/lemontask.png" width={35}  alt="tasqie icon"  />
          <span className="text-lg font-bold" >Lemon Task</span>
        </div>
        <div
          ref={buttonRef}
          onClick={toggleMenu}
          className={`flex items-center relative cursor-pointer  rounded-md p-2 `}
        >
          <div className="flex place-content-center items-center rounded-md  w-[30px] h-[30px]">
            {user.avatar_url ? (
              <img
                src={user.picture}
                className="w-[30px] h-[30px] rounded-md"
                alt="profile image"
              ></img>
            ) : (
              <DefaultUserIcon />
            )}
          </div>
          <div className="ml-4 leading-none p-1">
            <p className=" text-[15px] line-clamp-1 font-normal ">{user.name}</p>
            <span className="text-[12px] line-clamp-1 p-0.5 ">{user.email}</span>
          </div>
          <div className="absolute right-5">
            <MenuIcon />
          </div>
        </div>
        <div>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-3 mt-1 bg-base-100 border border-base-200 rounded-md shadow-sm "
            >
              <ul className="text-[12px]">
                <li className="py-1 px-3 rounded-t-md cursor-pointer hover:bg-base-200">
                  Edit Profile
                </li>
                <li className="py-1 px-3 cursor-pointer hover:bg-base-200">
                  My Productivity
                </li>
                <li className="py-1 px-3 cursor-pointer hover:bg-base-200">
                  Settings
                </li>
                <li
                  onClick={logOut}
                  className="py-1 px-3 text-red-500 bg-base-200 font-normal rounded-b-md cursor-pointer  border-t-[1px] border-base-300 flex items-center"
                >
                  <LogoutIcon />
                  <span className="ml-1  ">Log Out</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className=" mt-4">
          <div>
            <div className="group hover:bg-base-200  hover:font-normal   rounded-md transition duration-200 ease-in-out">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 flex items-center cursor-pointer bg-base-300 font-medium rounded-md "
                    : "flex items-center p-2 cursor-pointer"
                }
              >
                <LuLayoutDashboard />
                <span className=" ml-2 text-sm">Dashboard</span>
              </NavLink>
            </div>
            <div className="group hover:bg-base-200  hover:font-normal rounded-md transition duration-200 ease-in-out">
              <NavLink
                to={`/calendar`}
                className={({ isActive }) =>
                  isActive
                    ? "p-2 flex items-center cursor-pointer bg-base-300 font-medium rounded-md"
                    : "flex items-center p-2 cursor-pointer"
                }
              >
                <IoCalendarClearOutline />
                <span className=" ml-2 text-sm">Calendar</span>
              </NavLink>
            </div>

            <div className=" group hover:bg-base-200 hover:font-normal rounded-md transition duration-200 ease-in-out">
              <NavLink
                to={`/backlog`}
                className={({ isActive }) =>
                  isActive
                    ? "p-2 flex items-center cursor-pointer bg-base-300 font-medium rounded-md"
                    : "flex items-center p-2 cursor-pointer"
                }
              >
                <TbLayoutList />
                <span className=" ml-2 text-sm">Backlog</span>
              </NavLink>
            </div>

            
          </div>
          <div className="mt-4   rounded-xl  ">
            <button 
            onClick={() => setIsQuickTaskModalOpen(true)}
            className="btn btn-outline btn-primary flex items-center gap-2 w-full  text-sm  rounded-md p-2 cursor-pointer transition-all duration-200 ease-in-out">
              <IoAdd />
              <span className="font-normal">Create Task</span>
            </button>
          
          </div>
        </div>

        <div className="mt-4 h-[280px] h-max-[280px] relative">
          <div className="group text-sm mt-2 p-2 flex items-center relative" >
            <div className=" flex items-center">
              <span className=" text-sm font-medium">Workspaces</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="tooltip tooltip-info  absolute right-1 rounded-md cursor-pointer border border-transparent p-0.5 text-neutral-500 hover:text-neutral-700 hover:bg-base-200 transition-all ease-int duration-300"  
            data-tip="Create Workspace"
            >
              <IoAdd size={20} />
            </button>
          </div>

          <div className="overflow-y-auto scrollbar-hide">
            <div className="ml-4">
              <div>
                {workspaces.map((workspace) => (
                  <div
                    key={workspace.id}
                    className="group hover:bg-base-200 hover:font-normal rounded-md flex items-center justify-between relative"
                  >
          
                    <NavLink
                      to={`/workspace/${workspace.id}`}
                      className={({ isActive }) =>
                        isActive
                          ? `w-full p-2 flex items-center bg-base-200  justify-between cursor-pointer font-medium  rounded-md`
                          : "w-full flex items-center justify-between p-2 cursor-pointer"
                      }
                      
                    >
                      <div className="flex items-center ">
                        <div
                          className={`w-6 min-w-6 h-6  rounded-md flex items-center justify-center bg-${workspace.background_color} `}
                         
                        >
                          <span
                            className={`text-[10px] font-semibold uppercase text-${workspace.background_color}-content  `}
                            
                          >
                            {workspace.workspace_title[0]}
                          </span>
                        </div>

                        <span className=" ml-2 text-sm line-clamp-1  "
                          >
                          {workspace.workspace_title}
                        </span>
                      </div>
                    
                    </NavLink>
                    <button  className="btn btn-xs  absolute right-1 p-0.5 text-xs border border-base-300 rounded-sm   hover:shadow-sm hover:bg-base-300  invisible group-hover:visible" >
                        <NavLink
                          to={`/workspace/${workspace.id}/kanban`}
                          className=""
                        >
                          <MdKeyboardArrowRight />
                        </NavLink>
                      </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
      <QuickTaskModal 
        isOpen={isQuickTaskModalOpen}
        onRequestClose={() => setIsQuickTaskModalOpen(false)}
        
        
        
      />
      <CreateWorkspaceModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onWorkspaceCreated={handleWorkspaceCreated}
      />
    </>
  );
}

export default Sidebar;

import MenuIcon from "../assets/SidebarIcons/MenuIcon";
import DefaultUserIcon from "../assets/SidebarIcons/DefaultUserIcon";
import LogoutIcon from "../assets/LogoutIcon";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiRocketLaunch } from "react-icons/pi";

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
      <div className=" w-[280px] min-w-[280px] h-[100vh] p-3 border-r shadow-md relative  font-light bg-base-100 ">
        <div className="relative flex items-center gap-2 mb-2 border-b border-gray-200 pb-2 ">
          <img src="/tasklight.svg" width={50}  alt="tasqie icon"  />
          <span className="text-lg font-bold" >TaskLight</span>
        </div>
        <div
          ref={buttonRef}
          onClick={toggleMenu}
          className={`flex items-center relative cursor-pointer `}
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
            <span className="text-[12px] line-clamp-1 ">{user.email}</span>
          </div>
          <div className="absolute right-5">
            <MenuIcon />
          </div>
        </div>
        <div>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-3 mt-1 bg-white  border rounded-md shadow-md "
            >
              <ul className="text-[12px]">
                <li className="py-1 px-3 rounded-t-md cursor-pointer hover:bg-base-300">
                  Settings
                </li>
                <li className="py-1 px-3 cursor-pointer hover:bg-base-300">
                  Upgrade
                </li>
                <li
                  onClick={logOut}
                  className="py-1 px-3 text-red-500 font-normal rounded-b-md cursor-pointer hover:bg-secondary border-t-[1px] border-base-300 flex items-center"
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
            <div className="group hover:bg-base-200  hover:font-normal   rounded-md">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "p-2 flex items-center cursor-pointer bg-base-200 rounded-md"
                    : "flex items-center p-2 cursor-pointer"
                }
              >
                <LuLayoutDashboard />
                <span className=" ml-2 text-sm">Dashboard</span>
              </NavLink>
            </div>
            <div className="group hover:bg-base-200  hover:font-normal rounded-md">
              <NavLink
                to={`/calendar`}
                className={({ isActive }) =>
                  isActive
                    ? "p-2 flex items-center cursor-pointer bg-base-200 rounded-md"
                    : "flex items-center p-2 cursor-pointer"
                }
              >
                <IoCalendarClearOutline />
                <span className=" ml-2 text-sm">Calendar</span>
              </NavLink>
            </div>

            <div className=" group hover:bg-base-200 hover:font-normal rounded-md">
              <NavLink
                to={`/myproductivity`}
                className={({ isActive }) =>
                  isActive
                    ? "p-2 flex items-center cursor-pointer bg-base-200 rounded-md"
                    : "flex items-center p-2 cursor-pointer"
                }
              >
                <PiRocketLaunch />
                <span className=" ml-2 text-sm">My productivity</span>
              </NavLink>
            </div>

            
          </div>
          <div className="mt-4   rounded-xl  ">
            <button 
            onClick={() => setIsQuickTaskModalOpen(true)}
            className="flex items-center gap-2 w-full  bg-blue-500 text-white text-sm  rounded-md p-2">
              <IoAdd />
              <span>Create Task</span>
            </button>
            
              
            
          </div>
        </div>

        <div className="mt-4 h-[280px] h-max-[280px] relative">
          <div className="group text-sm mt-2 p-2 flex items-center relative ">
            <NavLink to={`/workspaces`} className=" flex items-center">
              <span className=" text-sm hover:font-normal">Workspaces</span>
            </NavLink>
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute right-1 rounded-md"
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
                    className="group hover:bg-base-200 hover:font-normal rounded-md "
                  >
                    <NavLink
                      to={`/workspace/${workspace.id}`}
                      className={({ isActive }) =>
                        isActive
                          ? "p-2 flex items-center cursor-pointer bg-base-200 rounded-md"
                          : "flex items-center p-2 cursor-pointer"
                      }
                    >
                      <div
                        className={`w-6 h-6  rounded-md flex items-center justify-center`}
                        style={{ backgroundColor: workspace.background_color }}
                      >
                        <span
                          className={` text-[10px] font-semibold  `}
                          style={{
                            color: colors_array.find(
                              (c) =>
                                c.bg_color ===
                                workspace.background_color
                            ).text_color,
                          }}
                        >
                          {workspace.workspace_title[0]}
                        </span>
                      </div>
                      <span className=" ml-2 text-sm">
                        {workspace.workspace_title}
                      </span>
                    </NavLink>
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

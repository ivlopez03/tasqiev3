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
import GoPageIcon from "../assets/SidebarIcons/GoPageIcon";

import { useState, useEffect, useRef } from "react";
import { signOut } from "../supabase/auth";
import { useAuth } from "../context/authContext";

import { useNavigate, NavLink } from "react-router-dom";
import { useWorkspaces } from "../context/workspaceContext/WorkspaceContext";

import CreateWorkspaceModal from "./homepage/createWorkspaceModal";

function Sidebar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const { workspaces, createWorkspace } = useWorkspaces();
  const [isActive, setIsActive] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className=" w-[280px] min-w-[280px] h-[100vh] p-3 border-r border-gray-700 relative  font-light  ">
        <div
          ref={buttonRef}
          onClick={toggleMenu}
          className={` border  rounded-md p-2 flex items-center relative cursor-pointer ${isActive ? "border-gray-500" : "border-gray-700"}    transition duration-300`}
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
          <div className="ml-4 leading-none max-w-[160px]p-1">
            <p className=" text-[15px] line-clamp-1">{user.name}</p>
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
              className="absolute right-3 mt-1 bg-base-200  border border-gray-700 rounded-md shadow-md "
            >
              <ul className="text-[12px]">
                <li className="py-1 px-3 rounded-t-md cursor-pointer hover:bg-neutral">
                  Settings
                </li>
                <li className="py-1 px-3 cursor-pointer hover:bg-neutral">
                  Upgrade
                </li>
                <li
                  onClick={logOut}
                  className="py-1 px-3 rounded-b-md cursor-pointer hover:bg-neutral border-t-[1px] border-gray-700 flex items-center"
                >
                  <LogoutIcon />
                  <span className="ml-1">Log Out</span>
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
                    ? "p-2 flex items-center cursor-pointer bg-base-300 rounded-md"
                    : "flex items-center p-2 cursor-pointer"
                }
              >
                <HomeIcon />
                <span className=" ml-2 text-sm">Home</span>
              </NavLink>
            </div>
            <div className="group hover:bg-base-200  hover:font-normal rounded-md">
              <NavLink
                to={`/calendar`}
                className={({ isActive }) =>
                  isActive
                    ? "p-2 flex items-center cursor-pointer bg-base-300 rounded-md"
                    : "flex items-center p-2 cursor-pointer"
                }
              >
                <CalendarIcon />
                <span className=" ml-2 text-sm">Calendar</span>
              </NavLink>
            </div>

            <div className="group hover:bg-base-200 hover:font-normal rounded-md">
              <NavLink
                to={`/routines`}
                className={({ isActive }) =>
                  isActive
                    ? "p-2 flex items-center cursor-pointer bg-base-300 rounded-md"
                    : "flex items-center p-2 cursor-pointer"
                }
              >
                <RoutineIcon />
                <span className=" ml-2 text-sm">Timeline</span>
              </NavLink>
            </div>
            <div className=" group hover:bg-base-200 hover:font-normal rounded-md">
              <NavLink
                to={`/myproductivity`}
                className={({ isActive }) =>
                  isActive
                    ? "p-2 flex items-center cursor-pointer bg-base-300 rounded-md"
                    : "flex items-center p-2 cursor-pointer"
                }
              >
                <ProductivityIcon />
                <span className=" ml-2 text-sm">My productivity</span>
              </NavLink>
            </div>

            <div className=" group hover:bg-base-200  hover:font-normal rounded-md">
              <NavLink
                to={`/myideas`}
                className={({ isActive }) =>
                  isActive
                    ? "p-2 flex items-center cursor-pointer bg-base-300 rounded-md"
                    : "flex items-center p-2 cursor-pointer"
                }
              >
                <IdeaIcon />
                <span className=" ml-2 text-sm">My ideas</span>
              </NavLink>
            </div>
          </div>
          <div className="mt-4  text-[13px] rounded-xl  ">
            <div className="mb-1 p-2 flex items-center relative">
              <p className="text-[13px]">Quick actions</p>
              <button className="absolute right-1 border p-[1px] rounded-sm  text-gray-500  border-gray-700 hover:bg-base-200 transition duration-300">
                <MenuIcon />
              </button>
            </div>
            <div className="ml-4">
              <div className="group hover:bg-base-200 hover:font-normal rounded-md">
                <a href="" className="p-1 flex items-center">
                  <CaptureIdeaIcon />
                  <span className=" ml-2 ">Capture idea</span>
                </a>
              </div>
              <div className="group hover:bg-base-200 hover:font-normal rounded-md">
                <a href="" className="p-1 flex items-center">
                  <CreateTaskIcon />
                  <span className=" ml-2 ">Create task</span>
                </a>
              </div>
              <div className="group hover:bg-base-200 hover:font-normal rounded-md">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-1 flex items-center"
                >
                  <CreateTaskIcon />
                  <span className="ml-2 ">Create workspace</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 h-[280px] h-max-[280px] relative">
          <div className="group text-sm mt-2 p-2 flex items-center relative ">
            <NavLink to={`/workspaces`} className=" flex items-center">
              <span className=" text-[13px] hover:font-normal">Workspaces</span>
            </NavLink>
            <NavLink
              to={"/workspaces"}
              className="absolute right-1 rounded-md  text-gray-400 border-gray-700 hover:bg-base-200 transition duration-300"
            >
              <GoPageIcon />
            </NavLink>
          </div>

          <div className="h-[80%] overflow-y-scroll ">
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
                          ? "p-2 flex items-center cursor-pointer bg-base-300 rounded-md"
                          : "flex items-center p-2 cursor-pointer"
                      }
                    >
                      <div
                        className={`w-6 h-6  rounded-md flex items-center justify-center`}
                        style={{ backgroundColor: workspace.background_color }}
                      >
                        <span
                          className={` text-[10px] font-semibold ${workspace.background_color === "#fff232" ? "text-black" : "text-white"}`}
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
          <div className=" bg-base-100 absolute bottom-[-11px] h-11 w-full blur-sm"></div>
        </div>
        <div className="group absolute bottom-10 flex justify-center w-fit">
          <div className="absolute border  rounded-md animated-background  -inset-[-2px] bg-gradient-to-r from-emerald-500 to-primary   opacity-70    group-hover:from-primary group-hover:to-emerald-500  transition-all duration-200"></div>
          <button className=" relative  py-2 px-14  rounded-md text-sm text-white group-hover:text-black transition duration-300 ">
            {" "}
            Subscribe to premium
          </button>
        </div>
      </div>
      <CreateWorkspaceModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onWorkspaceCreated={handleWorkspaceCreated}
      />
    </>
  );
}

export default Sidebar;

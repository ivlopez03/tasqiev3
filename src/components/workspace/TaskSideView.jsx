import { IoIosArrowForward } from "react-icons/io";
import { FaRegSquare, FaRegCircle } from "react-icons/fa";
import { MdChangeHistory } from "react-icons/md";
import { BsChevronDoubleUp, BsChevronDoubleDown } from "react-icons/bs";
import { LuDiamond } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { FaEquals } from "react-icons/fa6";
import React, { useEffect, useRef,useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { TbLayoutKanban } from "react-icons/tb";
import { LuFlag,LuX } from "react-icons/lu";
import { BiTagAlt } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";

import { statuses } from "./TaskCard";



const taskTypes = [
    { value: "task", label: "Task", icon: <FaRegSquare className="bg-blue-500 text-white rounded-sm p-1 " /> },
    { value: "story", label: "Story", icon: <LuDiamond className="bg-purple-500 text-white rounded-sm p-1 " /> },
    { value: "improvement", label: "Improvement", icon: <MdChangeHistory className="bg-green-700 text-white rounded-sm p-1 " /> },
    { value: "bug", label: "Bug", icon: <FaRegCircle className="bg-red-500 text-white rounded-sm p-1 " /> },];

const taskPriorities = [
    { value: "low", label: "Low", icon: <BsChevronDoubleDown fill="blue" /> },
    { value: "medium", label: "Medium", icon: <FaEquals fill="#F3D200" /> },
    { value: "high", label: "High", icon: <BsChevronDoubleUp fill="tomato" /> },
  ];

const TaskSideView = ({ task, isOpen, onClose }) => {
  const { id, due_at } = task;

  const [tags, setTags] = useState(task.tags);
  const [status, setStatus] = useState(task.status);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const [type, setType] = useState(task.type);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const [priority, setPriority] = useState(task.Priority);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  const sidePanelRef = useRef(null);
  const typeDropdownRef = useRef(null);
  const priorityDropdownRef = useRef(null);
    const statusDropdownRef = useRef(null);


  const formatDate = (dueDate) => {
    if (!dueDate) return ""; // Handle cases where dueDate is null or undefined
    const date = new Date(dueDate);
    const options = { month: "short", day: "numeric", year:"numeric" }; // Format for "Apr 27"
    const formattedDate = date.toLocaleDateString("en-US", options);
    //pop the ',' comma 
    const formattedDateWithSuffix = formattedDate.replace(/,/, "");
    return formattedDateWithSuffix;
  };

  const formatID = (id) => {
    const idString = id.toString();
    // Return the first 8 digits of the ID
    return idString.slice(0, 8);
    
  };

  //function to handle move status to next column
    const handleMoveStatus = (e) => {
        e.preventDefault();
        const currentIndex = statuses.indexOf(status);
        const nextIndex = (currentIndex + 1) % statuses.length;
        setStatus(statuses[nextIndex]);
        setIsStatusOpen(false);     
    };

    const handleClearTags = (e) => {
        e.preventDefault();
        setTags([]);
    };


  // Close the panel when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (sidePanelRef.current && !sidePanelRef.current.contains(event.target)) {
          onClose();
        }
        if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target)) {
          setIsTypeOpen(false);
        }
        if (priorityDropdownRef.current && !priorityDropdownRef.current.contains(event.target)) {
          setIsPriorityOpen(false);
        }
        if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
          setIsStatusOpen(false);
        }
      };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-20  transition-opacity duration-300 overflow-hidden ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
        
      <div
        ref={sidePanelRef}
        className={`absolute right-0 top-0 w-[50%] md:w-[40%] h-screen bg-base-100 rounded-l-md shadow-md transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Background with Circles 
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden ">
            <div className="absolute w-64 h-44 bg-primary opacity-25 blur-[5rem]  -top-10 -right-5"></div>
            <div className="absolute w-64 h-44 bg-accent  opacity-25 blur-[5rem] -bottom-10 -left-5"></div>
        </div>
        */}

        <div className="p-4 relative z-10 ">
          <div className="flex items-center justify-between  ">
            <button
              className="btn btn-ghost btn-sm rounded-btn  "
              onClick={onClose}
            >
              <IoIosArrowForward />
            </button>
            <div className="text-sm">
                <span>Created on {formatDate(task.created_at)}</span>
              
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center mb-3 ml-2 text-sm text-neutral-500 bg-base-300 font-light border w-fit border-neutral-700 rounded-sm">
                <span className="px-1 border-r border-neutral-700">ID</span>
                <span className="px-1">{formatID(id)}</span>
            </div>
            
            <form action=""  className="flex-col gap-4 font-light">
                <div>
                    <input 
                        type="text" 
                        value={title} 
                        className="w-full  text-2xl font-semibold ring-0 p-2  border border-transparent  rounded outline-none hover:bg-base-300 ring-neutral-500 focus:ring-1  focus:border-base-200 focus:bg-transparent"
                        onChange={(e) => setTitle(e.target.value)}
                        />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm w-full py-4 px-3 rounded-md ">
                    
                    {/* Status dropdown */}
                    <div className="flex items-center gap-2 relative " ref={statusDropdownRef}>
                        <div className="flex items-center gap-1">
                            <TbLayoutKanban className="text-neutral-500" />
                            <label htmlFor="">Status:</label>
                        </div>
                        
                        <div className="flex items-center  ">
                            <div className="flex items-center  bg-secondary  text-secondary-content rounded-sm  ">
                                <button className="text-sm px-2 py-0.5 border-r-[1px] cursor-pointer" onClick={(e) => {
                                    e.preventDefault();
                                    setIsStatusOpen(!isStatusOpen)}}>
                                     <span>
                                        {statuses.find((statusObj) => statusObj === status)}
                                    </span>
                                </button>
                                <button className="text-xl px-1.5 py-0.5 cursor-pointer" onClick={handleMoveStatus}>
                                    <IoMdArrowDropright />
                                </button>
                            </div>
                            {isStatusOpen && (
                                <ul className="absolute top-8 z-20 bg-base-200 border border-base-300 rounded-md shadow-md w-fit">
                                {statuses.map((statusObj) => (
                                    <li
                                    key={statusObj}
                                    className="hover:bg-base-300 cursor-pointer px-2 py-1"
                                    onClick={() => {
                                        setStatus(statusObj);
                                        setIsStatusOpen(false);
                                    }}
                                    >
                                    <div className="flex items-center gap-2">
                                        {statusObj}
                                    </div>
                                    </li>
                                ))}
                                </ul>
                            )}
                        </div>

                    </div>

                    {/* Type dropdown */}
                    <div className="flex items-center gap-2 relative" ref={typeDropdownRef}>
                        <div className="flex items-center gap-1">
                            <FaRegCircle className="text-neutral-500" />
                            <label htmlFor="">Type:</label>
                        </div>
            
                        <button className="text-sm flex items-center gap-5 hover:bg-base-300 rounded-sm py-1 px-2 cursor-pointer" onClick={(e) => {
                            e.preventDefault();
                            setIsTypeOpen(!isTypeOpen)}}>
                                <span className="text-xl ">
                                {taskTypes.find((typeObj) => typeObj.value === type)?.icon}
                                </span>
                                <span>
                                    {taskTypes.find((typeObj) => typeObj.value === type)?.label}
                                </span>
                           
                
                        </button>
                        {isTypeOpen && (
                    <ul className="absolute top-10 z-30 bg-base-200 border border-base-300 rounded-md shadow-md w-fit">
                      {taskTypes.map((typeObj) => (
                        <li
                          key={typeObj.value}
                          className="hover:bg-base-300 cursor-pointer px-2 py-1"
                          onClick={() => {
                            setType(typeObj.value);
                            setIsTypeOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            {typeObj.icon}
                            <span className="text-SM">{typeObj.label}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                        
                        
                            
                            
                        
                    </div>

                    {/* Priority dropdown */}
                    <div className="flex items-center gap-2 relative" ref={priorityDropdownRef}>
                        <div className="flex items-center gap-1">
                            <LuFlag className="text-neutral-500" />
                            <label htmlFor="">Priority:</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                className="text-sm flex items-center gap-5 hover:bg-base-300 rounded-sm py-1 px-2 cursor-pointer" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsPriorityOpen(!isPriorityOpen)
                                    }}>
                                <span className="text-lg ">
                                {taskPriorities.find((typeObj) => typeObj.value === priority)?.icon}
                                </span>
                                <span>
                                    {taskPriorities.find((typeObj) => typeObj.value === priority)?.label}
                                </span>
                            </button>
                            {isPriorityOpen && (
                                <ul className="absolute top-10 z-30 bg-base-200 border border-base-300 rounded-md shadow-md w-fit">
                                {taskPriorities.map((priorityObj) => (
                                    <li
                                    key={priorityObj.value}
                                    className="hover:bg-base-300 cursor-pointer px-2 py-1"
                                    onClick={() => {
                                        setPriority(priorityObj.value);
                                        setIsPriorityOpen(false);
                                    }}
                                    >
                                    <div className="flex items-center gap-2">
                                        {priorityObj.icon}
                                        <span className="text-SM">{priorityObj.label}</span>
                                    </div>
                                    </li>
                                ))}
                                </ul>
                            )}

                        </div>
                        
                       
                    </div>

                    {/* Due date */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <CiCalendar className="text-neutral-500" />
                            <label htmlFor="">Due Date:</label>
                        </div>
                        <div> 
                            {formatDate(due_at)}
                        </div>
                        
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <BiTagAlt className="text-neutral-500" />
                            <label htmlFor="">Tags:</label>

                        </div>
                        <button className="flex items-center gap-1 hover:bg-base-300 rounded-sm py-2 px-2 cursor-pointer">
                            {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs bg-primary text-primary-content rounded-full px-2 py-0.5"
                            >
                                {tag}
                            </span>
                            ))}
                        </button>
                        <button onClick={handleClearTags} className="cursor-pointer">
                            <LuX className="text-neutral-500" />
                        </button>
                    
                    </div>


                </div>
                <div className="p-4 border border-gray-500 rounded-md">
                    <textarea
                      value={description}
                      className="w-full h-fit   text-sm outline-none"
                      placeholder="Add description"
                      onChange={(e) => setDescription(e.target.value)}
                      rows={10}
                      
                    />
                </div>
            </form>

        <div className="mt-5 w-full border border-base-200 rounded-md">
            <div className="bg-base-200 px-2 py-1.5 rounded-t-md flex items-center gap-2">
                <h1 className="font-medium">Checklist</h1>
                <span className="text-xs">({"1/2"})</span>
            </div>
            <div>
                <div className="flex items-center gap-2 p-2 hover:bg-base-300 ">
                    <IoAdd className="text-neutral-500" />
                    <input type="text" placeholder="New checklist item" className="w-full ring-0 outline-none" />
                </div>
            </div>
        </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSideView;
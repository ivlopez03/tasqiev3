
import {  LuChevronsUpDown }  from "react-icons/lu";
import { FaRocket,FaChartSimple } from "react-icons/fa6";
import { AiFillInteraction } from "react-icons/ai";
import { IoCalendarNumber} from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { FaUser,FaLightbulb  } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";


import { Link } from "react-router-dom"


function Sidebar(){

    return(
        <div className=" w-[280px] min-w-[280px] h-[100vh] p-3 border-r">
            <div className=" rounded-md p-2 flex items-center relative cursor-pointer bg-base200 hover:bg-base-300 ">
                <div className="flex place-content-center items-center rounded-md bg-white w-[30px] h-[30px]">
                    <FaUser/>
                </div>
                <div className="ml-4 leading-none max-w-[160px]">
                    <p className=" text-[15px] line-clamp-1" >Ivan Lopez</p>
                    <span className="text-[13px] text-neutraln line-clamp-1 ">ivlopez.dev@gmail.com sssssss</span>
                </div>
                <div className="absolute right-5">
                    <LuChevronsUpDown/>
                </div>
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
                    <div className=" hover:bg-[#fafafa]  hover:font-semibold rounded-md">
                        <Link to={`/plan/:create`} className="p-2 flex items-center">
                            <img src="../public/icon.png" alt="tasqie" className="w-[18px]" />
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
    )
}

export default Sidebar
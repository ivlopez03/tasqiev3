/* eslint-disable react/prop-types */

import {
  BsChevronDoubleUp,
  BsChevronDoubleDown,
} from "react-icons/bs";
import { FaRegCircle,FaRegSquare } from "react-icons/fa";
import { MdChangeHistory } from "react-icons/md";
import { FaEquals } from "react-icons/fa6";
import { LuDiamond } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { TiFlowChildren } from "react-icons/ti";

import { useState } from "react";
import TaskSideView from "./TaskSideView";

export const statuses = ["todo","blocked", "in-progress", "done"];
export const priorities = ["low", "medium", "high"];

// Add this utility function at the top or in a separate utility file
const formatDueDate = (dueDate) => {
  if (!dueDate) return ""; // Handle cases where dueDate is null or undefined
  const date = new Date(dueDate);
  const options = { month: "short", day: "numeric" }; // Format for "Apr 27"
  return date.toLocaleDateString("en-US", options);
};

const formatID = (id) => {
  const idString = id.toString();
  // Return the first 3 digits of the ID
  const idDigits = idString.slice(0, 3).toUpperCase();
  return `WT-${idDigits}`;
};



const TaskCard = ({ task }) => {
  const [isOpenTask, setIsOpenTask] = useState(false);
  
  const handleOpenTask = () => {
    setIsOpenTask(true);
  };

  const handleCloseTask = () => {
    setIsOpenTask(false);
  };

  return (
    <>
    <TaskSideView task={task} isOpen={isOpenTask} onClose={handleCloseTask} />

    <div
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData("id",task.id);
      }}
      onClick={handleOpenTask}
     
      className={`p-4 w-72 h-fit border border-base-300 shadow-xs bg-base-200  rounded-md relative cursor-grab`}
    >
      <div className="flex justify-between relative mb-4 ">
        
        <div className="text-xs flex">
          {task.type === "bug" && <div className="p-1 bg-red-500 text-white rounded-sm " > <FaRegCircle /> </div> }
          {task.type === "task" && <div className="p-1 bg-blue-500 text-white rounded-sm " > <FaRegSquare /> </div> }
          {task.type === "improvement" && <div className="p-1 bg-green-700 text-white rounded-sm " > <MdChangeHistory /> </div> }
          {task.type === "story" && <div className="p-1 bg-purple-500 text-white rounded-sm " > <LuDiamond /> </div> }
          <span className=" flex items-center gap-1 text-xs ml-2">
            <CiCalendar />{formatDueDate(task.due_at)}
          </span>
        </div>
        <div className="text-sm flex items-center gap-2">
          <div className="text-xs text-neutral-500 font-light">{formatID(task.id)}</div>
          {task.Priority === "high" && <BsChevronDoubleUp fill="tomato" />}
          {task.Priority === "medium" && <FaEquals fill="#F3D200" />}
          {task.Priority === "low" && <BsChevronDoubleDown fill="blue" />}
        </div>
      </div>


      <div
        className={` relative  w-full overflow-hidden mt-1 line-clamp-3 leading-4 pb-0.5 `}
      >
        <div className="text-sm font-normal cursor-default w-full">
          {task.title}
        </div>
        <div>
          {task.description && (
            <p className="text-xs font-light text-neutral-500 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-between ">
        <div className="flex items-center gap-2">
        {task.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-xs text-nowrap bg-primary text-primary-content rounded-full px-2 py-0.5 mt-4"
          >
            {tag}
          </span>
        ))}
        {task.tags.length > 2 && (
          <div className="text-xs bg-primary text-primary-content rounded-full p-0.5 px-1.5 mt-4">
            {task.tags.length - 2 > 9 ? `9+` : `+${task.tags.length - 2}`}
          </div>
        )} 
        </div>
        <div className="text-gray-600 text-xs flex items-center " >
          {task.subtask_count > 0 ? (
            <div className="flex items-center gap-1">
              <TiFlowChildren />
              {task.subtask_count}
            </div>
            
          ) : (
            ""
          )}
          
        </div>
        
      </div>
    </div>
    </>
  );
};

export default TaskCard;

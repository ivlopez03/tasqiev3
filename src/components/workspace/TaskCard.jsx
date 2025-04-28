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

export const statuses = ["todo", "in-progress", "done"];
export const priorities = ["low", "medium", "high"];

// Add this utility function at the top or in a separate utility file
const formatDueDate = (dueDate) => {
  if (!dueDate) return ""; // Handle cases where dueDate is null or undefined
  const date = new Date(dueDate);
  const options = { month: "short", day: "numeric" }; // Format for "Apr 27"
  return date.toLocaleDateString("en-US", options);
};

const TaskCard = ({ task, updateTask }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`p-4 m-3  w-[350px] min-w-[350px] h-fit border shadow-sm  bg-base-100  rounded-md relative  ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
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
        <div className="text-sm flex">
          {task.Priority === "high" && <BsChevronDoubleUp fill="tomato" />}
          {task.Priority === "medium" && <FaEquals fill="#F3D200" />}
          {task.Priority === "low" && <BsChevronDoubleDown fill="blue" />}
        </div>
      </div>


      <div
        className={` relative mb-6 max-w-[270px] overflow-hidden mt-1 line-clamp-3 leading-4  ${isEditingTitle === true ? "h-fit" : ""}`}
      >
        <div className="text-md font-normal cursor-default ">
          {isEditingTitle ? (
            <textarea
              autoFocus
              className="w-full h-[90px] bg-base-100 resize-none outline-none"
              onBlur={() => setIsEditingTitle(false)}
              value={task.title}
              onChange={(e) => updateTask({ ...task, text: e.target.value })}
            />
          ) : (
            <div onClick={() => setIsEditingTitle(true)}> {task.title} </div>
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-between ">
        <div className="flex items-center gap-2">
        {task.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-xs text-nowrap text-blue-700 bg-blue-50 rounded-full px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
        {task.tags.length > 2 && (
          <div className="text-xs bg-blue-50 text-blue-700 rounded-full p-0.5 px-1.5">
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
  );
};

export default TaskCard;

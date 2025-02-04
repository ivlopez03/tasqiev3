/* eslint-disable react/prop-types */

import {
  BsChevronDoubleUp,
  BsChevronDoubleDown,
  BsThreeDots,
} from "react-icons/bs";
import { FaEquals } from "react-icons/fa6";
import { useState } from "react";

export const statuses = ["todo", "in-progress", "done"];
export const priorities = ["low", "medium", "high"];

export const tasks = [
  {
    id: "1",
    title: "Task One",
    text: "Create a tascard component for the kanban board and routed to the workspace page. beacuse yes",
    priority: "low",
    status: "todo",
    date: "01/01/2024",
    tags: ["tag one", "tag two"],
  },
  {
    id: "2",
    title: "Task two",
    text: "This is a description",
    priority: "high",
    status: "todo",
    date: "01/01/2024",
    tags: ["tag one", "tag two"],
  },
  {
    id: "3",
    title: "Task three",
    text: "This is a description",
    priority: "medium",
    status: "in-progress",
    date: "01/01/2024",
    tags: ["tag one", "tag two"],
  },
  {
    id: "4",
    title: "Task four",
    text: "This is a description",
    priority: "high",
    status: "done",
    date: "01/01/2024",
    tags: ["tag one", "tag two"],
  },
];

// eslint-disable-next-line react/prop-types
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
      className={`p-3 m-2 w-[300px] min-w-[300px] h-fit border border-gray-700 rounded-[10px] relative bg-base-200 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <div className="flex justify-between relative">
        <div className="text-[10px] flex">
          {task.priority === "high" && <BsChevronDoubleUp fill="tomato" />}
          {task.priority === "medium" && <FaEquals fill="#F3D200" />}
          {task.priority === "low" && <BsChevronDoubleDown fill="blue" />}
          <span className="text-[11px] ml-2 text-gray-300">
            Due date: {task.date}
          </span>
        </div>

        <div className=" cursor-pointer ">
          <BsThreeDots className="w-[16px] h-[16px] text-white" />
        </div>
      </div>
      <div
        className={` relative mb-5 max-w-[270px] overflow-hidden mt-1 line-clamp-2 leading-4 text-white ${isEditingTitle === true ? "h-fit" : "h-[35px]"}`}
      >
        <div className="text-[13px]">
          {isEditingTitle ? (
            <textarea
              autoFocus
              className="w-full h-[90px] bg-base-200 resize-none outline-none"
              onBlur={() => setIsEditingTitle(false)}
              value={task.text}
              onChange={(e) => updateTask({ ...task, text: e.target.value })}
            />
          ) : (
            <div onClick={() => setIsEditingTitle(true)}> {task.text} </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-2">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] bg-gray-700 rounded-[6px] px-2 mr-1"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;

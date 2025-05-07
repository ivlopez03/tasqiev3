import { TbLayoutList } from "react-icons/tb";
import { FaRegCircle, FaRegSquare } from "react-icons/fa";
import { MdChangeHistory } from "react-icons/md";
import { LuDiamond } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { BsChevronDoubleUp, BsChevronDoubleDown } from "react-icons/bs";
import { FaEquals } from "react-icons/fa6";
import { HiChevronUpDown } from "react-icons/hi2";
import { CiFilter } from "react-icons/ci";

import { useState, useEffect } from "react";

import { useBacklog } from "../../context/backlogContext/BacklogContext";

import { formatDueDate } from "../../utils/formatDate"; // Adjust the import path as needed

const BacklogPage = () => {
  const { backlogTasks, loading } = useBacklog();

  const [sortedTasks, setSortedTasks] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [filterType, setFilterType] = useState(""); // Filter by task type
  const [filterPriority, setFilterPriority] = useState(""); // Filter by priority
  const [filterTag, setFilterTag] = useState(""); // Filter by tags
  const [availableTags, setAvailableTags] = useState([]); // State for available tags

  // Synchronize sortedTasks with backlogTasks when backlogTasks changes
  useEffect(() => {
    setSortedTasks(backlogTasks);
  }, [backlogTasks]);

  // Update availableTags whenever backlogTasks changes
  useEffect(() => {
    const tags = new Set();
    backlogTasks.forEach((task) => {
      task.tags.forEach((tag) => tags.add(tag.tag_name));
    });
    setAvailableTags([...tags]); // Convert Set to Array
  }, [backlogTasks]);

  const sortTaskByPriority = () => {
    const sorted = [...sortedTasks].sort((a, b) => {
      const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3,
      };
      return isAscending
        ? priorityOrder[a.Priority] - priorityOrder[b.Priority]
        : priorityOrder[b.Priority] - priorityOrder[a.Priority];
    });
    setSortedTasks(sorted);
    setIsAscending(!isAscending);
  };

  const applyFilters = () => {
    let filteredTasks = backlogTasks;

    // Filter by task type
    if (filterType) {
      filteredTasks = filteredTasks.filter((task) => task.type === filterType);
    }

    // Filter by priority
    if (filterPriority) {
      filteredTasks = filteredTasks.filter(
        (task) => task.Priority === filterPriority
      );
    }

    // Filter by tags
    if (filterTag) {
      filteredTasks = filteredTasks.filter((task) =>
        task.tags.some((tag) => tag.tag_name === filterTag)
      );
    }

    setSortedTasks(filteredTasks);
  };

  const resetFilters = () => {
    setFilterType("");
    setFilterPriority("");
    setFilterTag("");
    setSortedTasks(backlogTasks);
  };

  const formatID = (id) => {
    const idString = id.toString();
    const idDigits = idString.slice(0, 3).toUpperCase();
    return `WT-${idDigits}`;
  };

  return (
    <div className="p-6 w-full h-screen bg-base-200 overflow-y-hidden">
      <div className="flex items-center gap-2">
        <TbLayoutList className="text-3xl text-primary" />
        <h1 className="text-xl font-semibold">Backlog</h1>
      </div>
      <p className="text-sm font-light mt-2">
        This is your backlog — a list of tasks that have been created but are
        not yet assigned to any workspace. Review and organize them to keep
        your workflow on track.
      </p>
      <div className="block bg-base-100 w-full h-[93%] mt-4 rounded-md relative overflow-y-auto z-0">
        <div className="sticky top-0 bg-base-100 z-10">
          <div className="w-full flex items-center justify-between text-sm p-2 rounded-t-md">
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-2 min-w-fit">
                <CiFilter className="" />
                <span className="text-sm font-light">Filter by:</span>
              </div>
              <select
                className="select select-sm select-ghost"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="bug">Bug</option>
                <option value="task">Task</option>
                <option value="improvement">Improvement</option>
                <option value="story">Story</option>
              </select>
              <select
                className="select select-sm select-ghost"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                className="select select-sm select-ghost"
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
              >
                <option value="">All Tags</option>
                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-sm btn-primary shadow-none"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
              <button
                className="btn btn-sm btn-accent shadow-none"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={sortTaskByPriority}
            >
              <span className="text-sm">Sort</span>
              <HiChevronUpDown className="text-lg text-gray-500" />
            </button>
          </div>
          <div className="flex items-center w-full justify-between gap-2 pt-4 pb-2">
            <ul className="flex items-center gap-3 px-3 text-xs font-light text-neutral-500">
              <li>Priority:</li>
              <li className="">Type:</li>
              <li className="min-w-20 ml-4.5">Due date:</li>
              <li className="min-w-14 ml-4">Task Id:</li>
              <li className="ml-5">Title:</li>
            </ul>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-4 h-full">
            <span className="loading loading-spinner text-neutral"></span>
            <p className="text-sm font-light mt-2">Loading tasks...</p>
          </div>
        ) : sortedTasks.length > 0 ? (
          <div className="overflow-x-scroll overflow-y-hidden h-fit z-0">
            <div className="flex flex-col gap-2 p-2 min-w-fit">
              {sortedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-8 bg-base-200 px-3 py-1.5 rounded-md hover:bg-base-300 hover:cursor-pointer transition-all duration-200 ease-in-out"
                >
                  <div>
                    <div className="flex items-center gap-1">
                      {task.Priority === "high" && (
                        <BsChevronDoubleUp fill="tomato" />
                      )}
                      {task.Priority === "medium" && (
                        <FaEquals fill="#F3D200" />
                      )}
                      {task.Priority === "low" && (
                        <BsChevronDoubleDown fill="blue" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="block">
                      {task.type === "bug" && (
                        <div className="p-1 bg-red-500 text-white rounded-sm w-fit">
                          <FaRegCircle />
                        </div>
                      )}
                      {task.type === "task" && (
                        <div className="p-1 bg-blue-500 text-white rounded-sm w-fit">
                          <FaRegSquare />
                        </div>
                      )}
                      {task.type === "improvement" && (
                        <div className="p-1 bg-green-700 text-white rounded-sm w-fit">
                          <MdChangeHistory />
                        </div>
                      )}
                      {task.type === "story" && (
                        <div className="p-1 bg-purple-500 text-white rounded-sm w-fit">
                          <LuDiamond />
                        </div>
                      )}
                    </div>
                  </div>
                  {task.due_at && (
                    <div className="block relative min-w-20">
                      <div className="flex items-center gap-1">
                        <CiCalendar className="text-gray-500" />
                        <p className="text-sm font-light invisible absolute md:visible md:relative">
                          {formatDueDate(task.due_at)}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="min-w-14">
                    <p className="text-sm font-light">{formatID(task.id)}</p>
                  </div>
                  <div className="text-nowrap">
                    <h2 className="text-sm">{task.title}</h2>
                  </div>
                  {task.tags && task.tags.length > 0 && (
                    <div className="flex gap-2 pr-6">
                      {task.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag.id}
                          className="px-2 py-1 text-xs font-medium bg-primary text-primary-content rounded-full min-w-fit"
                        >
                          {tag.tag_name}
                        </span>
                      ))}
                      {task.tags.length > 4 && (
                        <div className="text-xs bg-primary text-primary-content rounded-full p-0.5 px-1.5">
                          <span className="relative top-[1px]">
                            {task.tags.length - 3 > 9
                              ? `9+`
                              : `+${task.tags.length - 3}`}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center content-place-center justify-center h-full text-center">
            <div>
              <h1 className="text-xl font-semibold">No tasks in your backlog</h1>
              <p className="text-sm font-light mt-2">
                You can create tasks and assign them to a workspace.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BacklogPage;
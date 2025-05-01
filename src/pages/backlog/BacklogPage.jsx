import { TbLayoutList } from "react-icons/tb";
import { FaRegCircle, FaRegSquare } from "react-icons/fa";
import { MdChangeHistory } from "react-icons/md";
import { LuDiamond } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { BsChevronDoubleUp, BsChevronDoubleDown } from "react-icons/bs";
import { FaEquals } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";

import { useBacklog } from "../../context/backlogContext/BacklogContext";
import { formatDueDate } from "../../utils/formatDate"; // Adjust the import path as needed

const BacklogPage = () => {
  const { backlogTasks, loading } = useBacklog();

  const formatID = (id) => {
    const idString = id.toString();
    // Return the first 3 digits of the ID
    const idDigits = idString.slice(0, 3).toUpperCase();
    return `WT-${idDigits}`;
  };

  return (
    <div className="p-6 w-full h-screen">
      <div className="flex items-center gap-2 ">
        <TbLayoutList className="text-3xl text-blue-600" />
        <h1 className="text-xl font-semibold">Backlog</h1>
      </div>
      <p className="text-sm font-light mt-2">
        This is your backlog — a list of tasks that have been created but are not yet assigned to any workspace. Review and organize them to keep your workflow on track.
      </p>
      <div className="block bg-white w-full h-[93%] mt-4 rounded-md border border-gray-200 relative">
        <div className="w-full flex items-center text-sm border-b border-gray-200 bg-base-300 p-2">
          <div>
            <button className="btn btn-neutral btn-sm rounded-btn mr-4">
              <CiFilter className="text-lg" />
              <span className="mx-1">Filter</span>
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-4 h-full">
            <span className="loading loading-spinner text-neutral"></span>
            <p className="text-sm font-light mt-2">Loading tasks...</p>
          </div>
        ) : backlogTasks.length > 0 ? (
          <div className="overflow-x-scroll">
            <div className="flex flex-col gap-2 p-2 min-w-[900px] ">
              {backlogTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-baseline gap-4 border border-gray-200 px-3 py-1.5 rounded-md shadow-sm hover:shadow-md hover:bg-base-200 hover:cursor-pointer transition-all duration-200 ease-in-out"
                >
                  <div>
                    <span className="text-xs font-light text-gray-500">Priority:</span>
                    <div className="flex items-center gap-1">
                      {task.Priority === "high" && <BsChevronDoubleUp fill="tomato" />}
                      {task.Priority === "medium" && <FaEquals fill="#F3D200" />}
                      {task.Priority === "low" && <BsChevronDoubleDown fill="blue" />}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="block">
                      <span className="text-xs font-light text-gray-500">Type:</span>
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
                    <div className="block relative min-w-16">
                      <span className="text-xs font-light text-gray-500">Due:</span>
                      <div className="flex items-center gap-1">
                        <CiCalendar className="text-gray-500" />
                        <p className="text-sm font-light invisible absolute md:visible md:relative">
                          {formatDueDate(task.due_at)}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="min-w-14">
                    <span className="text-xs font-light text-gray-500">Task ID:</span>
                    <p className="text-sm">{formatID(task.id)}</p>
                  </div>
                  <div
                    className={`block ${
                      task.description ? "w-40" : "w-full"
                    } min-w-40`}
                  >
                    <span className="text-xs font-light text-gray-500">Title:</span>
                    <h2 className="text-sm font-bold line-clamp-1">{task.title}</h2>
                  </div>
                  {task.description && (
                    <div className="w-full  block min-w-52 text-wrap ">
                      <span className="text-xs font-light text-gray-500">
                        Description:
                      </span>
                      <p className="text-sm line-clamp-1">{task.description}</p>
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
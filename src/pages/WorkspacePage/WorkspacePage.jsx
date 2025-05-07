

import { useParams } from "react-router-dom";
import { useWorkspaces } from "../../context/workspaceContext/WorkspaceContext";
import { Link } from "react-router-dom";

import { IoSettingsOutline,IoAdd } from "react-icons/io5";
import { LuKanban,LuFolderKanban } from "react-icons/lu";
import { FaRegNoteSticky } from "react-icons/fa6";

const WorkspacePage = () => {

  const { workspaceId } = useParams();
  console.log(workspaceId);

  const { workspaces } = useWorkspaces();
  const workspace = workspaces.find((workspace) => workspace.id === workspaceId);
  if (!workspace) {
    return (

      <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="text-center">
        <h1 className="text-2xl font-bold  mb-4">Workspace Not Found</h1>
        <p className="text-neutral-600 mb-6">
          The workspace you are looking for does not exist or has been removed.
        </p>
      </div>
    </div>
    )
  }

  return (
    <>
      <div className="w-full h-full p-4 bg-base-200">
        <div className="p-4 relative w-[90%]  flex">
          <div className="flex items-center ">
            <LuFolderKanban className="text-xl text-primary" />
          </div>
          <p className="text-xl font-semibold ml-3">{ workspace.workspace_title }</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to={`/workspace/${workspace.id}/kanban`}
          className="bg-base-100 rounded-lg  p-6  hover:shadow-xs transition-shadow flex flex-col items-center text-center group"
        >
          <div className="bg-primary rounded-full p-4 mb-4">
            <LuKanban className="h-8 w-8 text-primary-content" />
          </div>
          <h3 className="text-lg font-medium  mb-2 group-hover:text-primary transition-colors">
            Kanban Board
          </h3>
          <p className="text-neutral-500 text-sm">
            Manage and organize tasks using a visual board
          </p>
        </Link>

        <Link
          to={`/workspace/${workspace.id}/notes`}
          className="relative  bg-base-100 rounded-lg  p-6  hover:shadow-xs transition-shadow flex flex-col items-center text-center group"
        >
          <div className="bg-secondary rounded-full p-4 mb-4">
            <FaRegNoteSticky className="h-8 w-8 text-secondary-content" />
          </div>
          <h3 className="text-lg font-medium mb-2 group-hover:text-secondary transition-colors">
            Project Notes
          </h3>
          <p className="text-neutral-500 text-sm">
            View and write notes about your project
          </p>
          <span className="absolute top-[-10px] right-8 bg-base-300 rounded-md text-xs text-neutral-500 p-1 ">Coming soon</span>
        </Link>

        <Link
          to={`/workspace/${workspace.id}/settings`}
          className="bg-base-100 rounded-lg  p-6 hover:shadow-xs transition-shadow flex flex-col items-center text-center group"
        >
          <div className="bg-accent rounded-full p-4 mb-4">
            <IoSettingsOutline className="h-8 w-8 text-accent-content" />
          </div>
          <h3 className="text-lg font-medium  mb-2 group-hover:text-accent transition-colors">
            Settings
          </h3>
          <p className="text-neutral-500 text-sm">
            Configure workspace settings and members
          </p>
        </Link>
      </div>

      {/* Recent Tasks */}
      <div className="bg-base-100 rounded-lg shadow-sm p-6 mt-6 ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold ">Recent Tasks</h2>
          <Link
            to={`/workspace/${workspace.id}/kanban`}
            className=" flex items-center gap-1"
          >
            <IoAdd size={16} />
            <span>Add Task</span>
          </Link>
        </div>
        <div className="text-neutral-500 text-center py-8">
          <p>No tasks yet.</p>
          <p className="text-sm mt-2">Create your first task in the Kanban board.</p>
        </div>
      </div>

       

        <div>
        
        </div>
      </div>
    </>
  );
};

export default WorkspacePage;

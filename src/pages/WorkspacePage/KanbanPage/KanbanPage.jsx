import { IoIosArrowBack,IoIosAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { useWorkspaces } from "../../../context/workspaceContext/WorkspaceContext";
import  KanbanBoard  from "../../../components/workspace/KanbanBoard";
import TaskSideView from "../../../components/workspace/TaskSideView";

const KanbanPage = () => {

    // Get the workspaceId from the URL parameters
    // This is used to identify which workspace the user is currently viewing
    // and to fetch the relevant data for that workspace
    const { workspaceId } = useParams();
    const { workspaces } = useWorkspaces();
    const workspace = workspaces.find((workspace) => workspace.id === workspaceId);
    if (!workspace) {
        return (
            <div className="flex items-center justify-center h-screen bg-base-200">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Workspace Not Found</h1>
                    <p className="text-neutral-600 mb-6">
                        The workspace you are looking for does not exist or has been removed.
                    </p>
                </div>
            </div>
        );
    }

  return (
    <div className="px-4  h-screen w-full overflow-y-hidden  bg-base-200 ">
        
        <div className="flex  items-center  justify-between pt-2  ">
            <div className="flex items-center gap-4  ">
                <Link 
                    to={`/workspace/${workspace.id}`}
                    className="btn btn-ghost btn-sm rounded-btn">
                    <IoIosArrowBack />
                </Link>
                <div>
                    <span className="text-xs text-neutral-500"  >{workspace.workspace_title} </span>
                    <h1 className="text-xl font-semibold ">Kanban Board</h1>   
                </div>
            </div>
            <div>
                <button className="btn flex items-center gap-2 mt-4 bg-primary text-primary-content text-sm rounded-md px-4 py-2">
                    <IoIosAdd  className="text-xl" />
                    <span className="text-sm font-semibold ">Add New Task</span>
               </button>
            </div>
        </div>

        <div className="flex items-baseline-last  gap-2 px-4 py-2 text-sm mt-4" >
            <div className="flex items-center gap-2 border border-neutral-300 rounded-md p-2 w-fit bg-base-200  ">
                <div>
                    <CiSearch className="text-neutral-500" />
                </div>
                <div className=" ">
                    <input type="search" className="outline-none " placeholder="Search" />
                </div>
            </div>
        </div>

        <div className="h-[97%] w-full overflow-y-auto pb-16 ">
            <div className="w-full h-full py-6 overflow-x-auto overflow-y-auto"> 
                <KanbanBoard/>
            </div>


        </div>


        
    
    </div>

  );
}
export default KanbanPage;
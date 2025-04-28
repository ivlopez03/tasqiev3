import { IoIosArrowBack,IoIosAdd } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useWorkspaces } from "../../../context/workspaceContext/WorkspaceContext";
import  KanbanBoard  from "../../../components/workspace/KanbanBoard";

const KanbanPage = () => {

    // Get the workspaceId from the URL parameters
    // This is used to identify which workspace the user is currently viewing
    // and to fetch the relevant data for that workspace
    const { workspaceId } = useParams();
    const { workspaces } = useWorkspaces();
    const workspace = workspaces.find((workspace) => workspace.id === workspaceId);
    if (!workspace) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Workspace Not Found</h1>
                    <p className="text-gray-600 mb-6">
                        The workspace you are looking for does not exist or has been removed.
                    </p>
                </div>
            </div>
        );
    }

  return (
    <div className="p-4  md:w-[60%] lg:w-[90%] ">
        <div className="flex items-center gap-4 overflow-hidden">
         <Link 
            to={`/workspace/${workspace.id}`}
         className="btn btn-ghost btn-sm rounded-btn">
             <IoIosArrowBack />
         </Link>
         <div>
            <span className="text-xs text-gray-600"  >{workspace.workspace_title} </span>
             <h1 className="text-xl font-semibold ">Kanban Board</h1>   
         </div>
        </div>

        <div>
            <div className="p-4" >
               <button className="flex items-center gap-2 mt-4 bg-blue-500 text-white text-sm rounded-md px-4 py-2">
                <IoIosAdd  />
                <span className="text-sm font-semibold ">Add New Task</span>
               </button>
            </div>
            <div className="py-6"> 
                <KanbanBoard/>
            </div>


        </div>
      
    </div>
  );
}
export default KanbanPage;
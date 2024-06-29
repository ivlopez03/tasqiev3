import CreateWorkspaceModal from "../../components/homepage/createWorkspaceModal";
import WorkspaceCard from "../../components/homepage/WorkspaceCard";
import PlusIcon from "../../assets/PlusIcon";
//import CloseIcon from "../../assets/CloseIcon";

import { ColorRing } from "react-loader-spinner"; 
import {  useState } from "react";
import { useWorkspaces } from "../../context/workspaceContext/WorkspaceContext";


const WorkspacesPage = () => {

    const { createWorkspace, workspaces,loading} = useWorkspaces();

    const [isModalOpen, setIsModalOpen] = useState(false);
   

    const handleWorkspaceCreated = (newWorkspace) => {
        createWorkspace(newWorkspace);
              
      };

    return (
        <div className=' p-2'>
            <div className="relative">
                <div className="p-2">
                    <div className="text-2xl px-3 ">Workspaces</div>
                    <div className="py-1 px-3 w-fit text-[13px] text-[#a6a6a6] font-light">
                        <span>
                        Create, organize, and manage your projects efficiently with workspaces feature.  Each workspace acts as a dedicated area for your tasks.
                        </span>
                        
                    </div>
                    
                    <div className="border rounded-md border-dashed mt-3 p-2">
                    {
                            loading ? (
                                <div className="flex justify-center items-center w-full h-52">
                                    <div className="text-sm">
                                        <div>Fetching data</div>
                                        <div className="flex items-center justify-center">
                                            <ColorRing 
                                                height="40" 
                                                width="40" 
                                                ariaLabel="color-ring-label"
                                                colors={['#45aeee', '#e8488a', '#fff232', '#66cc8a', '#cbcbcb']}  
                                            />

                                        </div>
                                    
                                    </div>
                                    
                                </div>
                            ) :   
                             <div className="flex flex-wrap gap-4 py-2">
                                
                                {workspaces.map((card) => (
                                <WorkspaceCard key={card.id} workspace={card} workspaces={workspaces} />
                                ))}
                        
                                <div className="flex items-center p-3  w-[270px] min-w-[270px]">
                                    <div className="lg:tooltip lg:tooltip-open lg:tooltip-right" data-tip="Add workspace">
                                        <button onClick={() => setIsModalOpen(true)} className=" flex items-center justify-center border rounded-md   w-10 h-10 mr-1 text-gray-400 hover:bg-gray-100">
                                            <PlusIcon />
                                        </button>
                                    </div>
                                </div>
                                <CreateWorkspaceModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}  onWorkspaceCreated={handleWorkspaceCreated} />
                            </div>
                    }


                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default WorkspacesPage;
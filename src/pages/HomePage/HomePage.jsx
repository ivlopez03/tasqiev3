

import { useEffect, useState } from "react";

import CreateWorkspaceModal from "../../components/homepage/createWorkspaceModal";
import WorkspaceCard from "../../components/homepage/WorkspaceCard";
import supabase from "../../supabase/supabase";
import PlusIcon from "../../assets/PlusIcon";

import { fetchWithCache } from "../../utils/cacheUtils";


const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cards, setCards] = useState([]);

    


    useEffect(() => {
        fetchWorkspaces();
    },[]);

    const fetchWorkspaces = async () => {
        const workspaces = await fetchWithCache("workspaces", async () =>{
            const { data, error } = await supabase.from("workspaces").select();
            if (error) throw error;
            return data;
        });
        setCards(workspaces);
    };


    const handleWorkspaceCreated = (newWorkspace) => {
        setCards((prevWorkspaces) => [...prevWorkspaces, newWorkspace]);
        // Update cache
        localStorage.setItem(
          'workspaces',
          JSON.stringify({ data: [...cards, newWorkspace], timestamp: Date.now() })
        );
      };
   

    return (
        <div className=' p-2'>
            <div>
                <div className="p-2">
                    <div className="text-2xl px-3 ">Workspaces</div>
                    <div className="py-1 px-3 w-fit">
                        <span className="text-sm text-neutral">
                            Manage your projects by creating workspaces
                        </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 py-2">
                        {cards.map((card) => (
                        <WorkspaceCard key={card.id} workspace={card} workspaces={cards} />
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
                    
                </div>
                <></>
            </div>
        </div>
    )
}

export default HomePage;
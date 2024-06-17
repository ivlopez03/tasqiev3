

import { useEffect, useState } from "react";

import CreateWorkspaceModal from "../../components/homepage/createWorkspaceModal";
import WorkspaceCard from "../../components/homepage/WorkspaceCard";
import supabase from "../../supabase/supabase";
import PlusIcon from "../../assets/PlusIcon";



const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cards, setCards] = useState([]);

    const addCard = (title, color) => {
        setCards([...cards, { title, color }]);
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchWorkspaces = async () => {
            const { data, error } = await supabase.from("workspaces").select();
            if (error) {
                console.log(error);
            } else {
                setCards(data);
            }
        };
        fetchWorkspaces();
    },[]);
   

    
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
                        <WorkspaceCard key={card.id} id={card.id} title={card.workspace_title} color={card.background_color} lastActivity={card.updated_at} />
                        ))}
                        
                        <div className="flex items-center p-3  w-[270px] min-w-[270px]">
                            <div className="lg:tooltip lg:tooltip-open lg:tooltip-right" data-tip="Add workspace">
                                <button onClick={() => setIsModalOpen(true)} className=" flex items-center justify-center border rounded-md   w-10 h-10 mr-1 text-gray-400 hover:bg-gray-100">
                                    <PlusIcon />
                                </button>
                            </div>
                        </div>
                        <CreateWorkspaceModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} onAddCard={addCard} />
                        
                    </div>
                    
                </div>
                <></>
            </div>
        </div>
    )
}

export default HomePage;
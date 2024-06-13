import { IoAddOutline } from "react-icons/io5";
import { useState } from "react";

import CreateWorkspaceModal from "../../components/homepage/createWorkspaceModal";
import WorkspaceCard from "../../components/homepage/WorkspaceCard";


const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cards, setCards] = useState([]);

    const addCard = (title, color) => {
        setCards([...cards, { title, color }]);
        setIsModalOpen(false);
    };

    
    return (
        <div className='w-full p-2'>
            <div>
                <div className="p-2">
                    <div className="text-2xl px-3 ">Workspaces</div>
                    <div className="text-sm text-neutral py-1 px-3 mb-2">Manage your projects by creating workspaces</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-2">
                        {cards.map((card, index) => (
                        <WorkspaceCard key={index} title={card.title} color={card.color} lastActivity={'20 min ago'} />
                        ))}
                        
                        <div className="flex items-center p-3">
                            <div className="lg:tooltip lg:tooltip-open lg:tooltip-right" data-tip="Add workspace">
                                <button onClick={() => setIsModalOpen(true)} className=" flex items-center justify-center border rounded-md   w-10 h-10 mr-1 text-gray-400 hover:bg-gray-100">
                                    <IoAddOutline className="w-5 h-5 "/>
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
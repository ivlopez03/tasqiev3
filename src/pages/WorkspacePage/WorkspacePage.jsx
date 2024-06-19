
import KanbanBoard from "../../components/workspace/KanbanBoard"
import { IoIosAddCircle,IoIosSettings } from "react-icons/io";
import { FaTag,FaFilter,FaCirclePlay } from "react-icons/fa6";
import { VscSettings } from "react-icons/vsc";

const WorkspacePage = ()=>{

    

    return(
        <>
        <div className='w-full p-2'>
           
            <div className='p-4 relative w-[90%] border-b flex'>
                
                <div className=" px-[6px] py-[0px] rounded-md bg-secondaryTextColor w-[30px] h-[30px] flex place-content-center items-center ">
                    <span className=" text-sm font-semibold">W</span>
                </div>
                <p className='text-xl font-semibold ml-3'>Workspace one</p>
                <div className='absolute right-2 bottom-2 '>
                    <button className='border p-1 rounded-md'>
                    <IoIosSettings />
                    </button>
                </div>
            </div>
                
            <div className='mt-1 text-[11px] flex gap-2 p-2'>
                <button className='group flex items-center gap-1 rounded-md border px-2 py-1 hover:bg-[#000000d7] bg-base-content'>
                    <IoIosAddCircle fill="#ffff"/>
                    <span className="text-white">Create task</span>
                </button>
                <button className='group flex items-center gap-1 rounded-md border px-2 py-1 hover:bg-[#000000d7] bg-base-content'>
                    <FaTag fill="#ffff"/>
                    <span className="text-white">Label</span>
                </button>
                <button className='group flex items-center gap-1 rounded-md border px-2 py-1 hover:bg-[#000000d7] bg-base-content'>
                    <FaFilter fill="#ffff"/>
                    <span className="text-white">Filter</span>
                </button>
                <button className='group flex items-center gap-1 rounded-md border px-2 py-1 hover:bg-[#000000d7] bg-base-content'>
                    <VscSettings fill="#ffff"/>
                    <span className="text-white">View</span>
                </button>
                <button className='group flex items-center gap-1 rounded-md border px-2 py-1 hover:bg-[#000000d7] bg-base-content '>
                    <FaCirclePlay fill="#ffff"/>
                    <span className="text-white">Run plan</span>
                </button>
            </div>

            <div> 
                <KanbanBoard/>
            </div>
        
        </div>
        
        </>
    
    )
}

export default WorkspacePage
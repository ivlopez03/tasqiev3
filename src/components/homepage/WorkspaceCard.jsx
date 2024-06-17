/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import MenuDotsIcon from '../../assets/MenuDotsIcon';

import React,{ useState,useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from "../../supabase/supabase";

function WorkspaceCard({id, title, color, lastActivity}) {
    
    
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const submenuRef = useRef(null);
    const buttonRef = useRef(null);

    const [cardVisibility, setCardVisibility] = useState(false);

    const handleClickOutside = (event) => {
        if (submenuRef.current && 
            !submenuRef.current.contains(event.target) && 
            buttonRef.current && 
            !buttonRef.current.contains(event.target)) {
            setIsSubmenuOpen(false);
            setCardVisibility(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[]);

    const toggleSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
        setCardVisibility(!cardVisibility);
    }

    const deleteWorkspace = async (id,title) => {
        const { error } = await supabase.from('workspaces').delete().match({ id });
        if (error) {
          console.log(error);
        } else {
          console.log(`Deleted ${title} workspace`);
        }
      }

    const handleDeleteWorkspace = (e) => {
        e.preventDefault();
        deleteWorkspace(id,title);
    }
    
    

  return (
    <div className={`group relative flex items-center p-3 w-[270px] min-w-[270px] border border-transparent rounded-md ${cardVisibility ? 'border-[#e5e7eb]' : ''} hover:border-[#e5e7eb] transition duration-300 `}>
      <div 
        className="flex items-center justify-center w-10 h-10 rounded mr-4" 
        style={{ backgroundColor: color }}
      >
        <span className={ `font-bold ${color === '#fff232' ?  'text-black' : 'text-white' }`}>{title[0] && title[0].toUpperCase()}</span>
      </div>
      <div>
        <Link to={`/workspace/${id}`}>
            <div className="text-md">{title}</div>
        </Link>
        <div className='text-[11px] text-gray-400'>Last activity:{lastActivity}</div>
      </div>
      <div className={`absolute right-2 top-2 ${cardVisibility ? 'visible' : 'invisible'} group-hover:visible `}>
        <div className="flex items-center justify-center">
            <button ref={buttonRef}  onClick={toggleSubmenu} >
                <MenuDotsIcon/> 
            </button>
            {isSubmenuOpen && (
                <div ref={submenuRef} className="absolute top-3 right-0 bg-white border border-gray-200 rounded-md shadow-md ">
                    <ul className="text-[11px]">
                        <li className="py-1 px-3 rounded-t-md cursor-pointer hover:bg-base200">Edit</li>
                        <li className="py-1 px-3 cursor-pointer hover:bg-base200">Close</li>
                        <li onClick={handleDeleteWorkspace} className="py-1 px-3 rounded-b-md cursor-pointer hover:bg-base200 text-[tomato]">Delete</li>
                    </ul>
                </div>
            
            )}
        </div>
      </div>
     

    </div>
  );
}

export default WorkspaceCard;
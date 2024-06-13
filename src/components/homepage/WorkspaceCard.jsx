/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { BsThreeDots } from "react-icons/bs";
import React from 'react';

function WorkspaceCard({ title, color, lastActivity}) {
  return (
    <div className="group relative flex items-center p-3 border border-transparent rounded-md hover:border-[#e5e7eb] transition duration-300">
      <div 
        className="flex items-center justify-center w-10 h-10 rounded mr-4" 
        style={{ backgroundColor: color }}
      >
        <span className={`text-white font-bold ${color === '#fff232' ?  'text-black' : '' } ${color === '#cbcbcb' ? 'text-black' : ''} `}>{title[0]}</span>
      </div>
      <div>
        <div className="text-md">{title}</div>
        <div className='text-[11px] text-gray-400'>Last activity:{lastActivity}</div>
      </div>
      <div className="absolute right-2 top-2 invisible group-hover:visible ">
        <div className="flex items-center justify-center">
            <button >
                <BsThreeDots/> 
            </button>
        </div>
      </div>
     

    </div>
  );
}

export default WorkspaceCard;
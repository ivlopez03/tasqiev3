/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Modal from 'react-modal';
import supabase from '../../supabase/supabase';

Modal.setAppElement('#root');

function CreateWorkspaceModal({ isOpen, onRequestClose, onWorkspaceCreated }) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#020b14');

  const handleCreateWorkspace = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('workspaces').insert([{workspace_title: title, background_color: color}]).select();
    if (error) {
      console.error('Error creating workspace:', error.message);
    } else {
        setTitle('');
        setColor('#020b14');
        onWorkspaceCreated(data[0]);
        onRequestClose();
       
    }
  };

  

  const colors = ['#45aeee', '#e8488a', '#fff232', '#66cc8a', '#894FFF','#FF974F','#cbcbcb', '#020b14'];

  
 


  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      className="flex flex-col p-8 bg-white border rounded-xl shadow-md w-[500px] font-light  "
      overlayClassName="fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 z-50"
    >
      <div className='w-full mb-6'>
        <h2 className="">Create a Workspace</h2>
        <p className='text-sm text-gray-400 text-'>A Workspace represent a space with its own tasks, workflows, timelines and settings.</p>
    
      </div>
      <form onSubmit={handleCreateWorkspace} className="flex flex-col gap-4">
        
        <div className='flex flex-col gap-2'>
          <label className='text-sm '>Workspace Title</label>
          <div className='flex'>
            <div>
              <div className="flex items-center justify-center w-10 h-10 rounded mr-4" style={{ backgroundColor: color }}>
                <span className={`font-bold ${color === '#fff232' ?  'text-black' : 'text-white' } `}>{title[0] && title[0].toUpperCase()}</span>
              </div>
            </div>

            <input 
                type="text" 
                value={title} 
                placeholder='Title'
                onChange={(e) => setTitle(e.target.value)} 
                required 
                className="w-full p-2 border border-gray-300 rounded text-sm outline-none "
              />
          </div>
          
        </div>
        <div className='flex items-center'>
            <div className='ml-1'>
                <label className="block text-left mb-2 text-sm"> Pick a color</label>
                <div className="flex flex-wrap  ">
                    {colors.map((colorOption) => (
                    <button
                        key={colorOption}
                        type="button"
                        onClick={() => setColor(colorOption)}
                        style={{ backgroundColor: colorOption }}
                        className={`w-4 h-4 rounded-md  mr-7 my-1  ${color === colorOption ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                    />
                    ))}
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-2' >
          <label className='text-sm '> Description <span className='text-[12px] text-gray-400'>{"(optional)"}</span> </label>
          <input type="text"
                  className="w-full p-2 border border-gray-300 rounded text-sm outline-none "
          />
        </div>
       
        <div className="flex gap-4 my-2 justify-end">
          <button type="submit" className=" px-4 py-1 bg-primary-content   text-white rounded text-sm ">Create</button>
          <button type="button" className=" px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm" onClick={onRequestClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateWorkspaceModal;
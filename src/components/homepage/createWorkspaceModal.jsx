/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function CreateWorkspaceModal({ isOpen, onRequestClose, onAddCard }) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#020b14');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCard(title, color);
  };

  const colors = ['#45aeee', '#e8488a', '#fff232', '#66cc8a', '#cbcbcb', '#020b14'];


  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      className="flex flex-col items-center p-6 bg-white border rounded-xl shadow-md w-80  "
      overlayClassName="fixed inset-0 flex justify-center items-center"
    >
      <h2 className="mb-4">Create Workspace</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
        <div>
          <input 
            type="text" 
            value={title} 
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className="w-full p-2 border border-gray-300 rounded text-sm outline-none "
          />
        </div>
        <div className='flex items-center'>
            <div className='px-5'>
                <div 
                className="flex items-center justify-center w-10 h-10 rounded mr-4" 
                style={{ backgroundColor: color }}
                >
                <span className={`text-white font-bold ${color === '#fff232' ?  'text-black' : '' } ${color === '#cbcbcb' ? 'text-black' : ''} `}>{title[0] && title[0].toUpperCase()}</span>
                </div>

            </div>

            <div className='ml-5'>
                <label className="block text-left mb-2 text-sm"> Pick a color</label>
                <div className="flex flex-wrap  ">
                    {colors.map((colorOption) => (
                    <button
                        key={colorOption}
                        type="button"
                        defaultValue={color}
                        onClick={() => setColor(colorOption)}
                        style={{ backgroundColor: colorOption }}
                        className={`w-4 h-4 rounded-md  mr-7 my-1  ${color === colorOption ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                    />
                    ))}
                </div>

            </div>
          
        </div>
       
        <div className="flex gap-4">
          <button type="submit" className="flex-1 px-2 py-1 bg-primary-content   text-white rounded text-sm ">Create</button>
          <button type="button" className="flex-1 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm" onClick={onRequestClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateWorkspaceModal;
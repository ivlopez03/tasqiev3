/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Modal from 'react-modal';
import supabase from '../../supabase/supabase';

Modal.setAppElement('#root');

function DeleteWorkspaceModal({ isOpen, onRequestClose, workspace, onWorkspaceDeleted }) {

  
  const handleDeleteWorkspace = async () => {
    const { error } = await supabase.from('workspaces').delete().eq('id', workspace.id)
    if (error) {
      console.error('Error deleting workspace:', error);
      console.log(error);
    } else {
        console.log(`Workspace ${workspace.id} deleted`);
        onWorkspaceDeleted(workspace);
        onRequestClose();
    }
  };

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Delete Workspace"
    className="bg-base-100 p-5 rounded-xl shadow-md w-96 mx-auto border border-base-300 absolute top-[50px]"
    overlayClassName="fixed inset-0 flex items-center justify-center z-50 bg-[rgb(0,0,0,0.1)]"
  >
    <h2 className="text-md font-semibold mb-4">Delete Workspace</h2>
    <p className='text-sm'>Are you sure you want to delete the "<span className='font-semibold'>{workspace.workspace_title}</span>" workspace?</p>
    <div className="flex justify-end mt-4 gap-3">
      <button onClick={onRequestClose} className="btn btn-neutral">
        Cancel
      </button>
      <button onClick={handleDeleteWorkspace} className="btn btn-error ">
        Delete
      </button>
    </div>
  </Modal>
  );
}

export default DeleteWorkspaceModal;
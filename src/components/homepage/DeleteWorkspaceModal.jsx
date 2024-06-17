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
    const { error } = await supabase.from('workspaces').delete().eq('id', workspace.id);
    if (error) {
      console.error('Error deleting workspace:', error);
      console.log(error);
    } else {
        console.log(`Workspace ${workspace.id} deleted`);
        onWorkspaceDeleted(`${workspace.id}`);
        onRequestClose();
    }
  };

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Delete Workspace"
    className="bg-white p-6 rounded shadow-md w-96 mx-auto mt-40"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <h2 className="text-xl font-bold mb-4">Delete Workspace</h2>
    <p>Are you sure you want to delete the workspace "{workspace.workspace_title}"?</p>
    <p>id = {workspace.id}</p>
    <div className="flex justify-end mt-4">
      <button onClick={onRequestClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">
        Cancel
      </button>
      <button onClick={handleDeleteWorkspace} className="px-4 py-2 bg-red-500 text-white rounded">
        Delete
      </button>
    </div>
  </Modal>
  );
}

export default DeleteWorkspaceModal;
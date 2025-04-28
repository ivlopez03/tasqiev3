/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import MenuDotsIcon from "../../assets/MenuDotsIcon";
import { colors_array } from "../../utils/colorsWorkspace";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteWorkspaceModal from "./DeleteWorkspaceModal";
import { useWorkspaces } from "../../context/workspaceContext/WorkspaceContext";
import CreateWorkspaceModal from "./createWorkspaceModal";

function WorkspaceCard({ workspace, workspaces }) {
  const { deleteWorkspace } = useWorkspaces();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [workspaceToDelete, setWorkspaceToDelete] = useState(workspace);

  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const submenuRef = useRef(null);
  const buttonRef = useRef(null);

  const [cardVisibility, setCardVisibility] = useState(false);

  const { updateWorkspace  } = useWorkspaces();

  const handleClickOutside = (event) => {
    if (
      submenuRef.current &&
      !submenuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsSubmenuOpen(false);
      setCardVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
    setCardVisibility(!cardVisibility);
  };

  const toggleDeleteModal = () => {
    setIsModalOpen(true);
    if (isSubmenuOpen) {
      setIsSubmenuOpen(false);
      setCardVisibility(!cardVisibility);
    }
  };

  const handleWorkspaceDeleted = (workspace) => {
    deleteWorkspace(workspace);
  };

 

  return (
    <div
      className={`group relative flex items-center p-3 min-w-[350px] max-w-[350px] shadow-sm bg-base-100  border border-gray-100  rounded-md  transition duration-300 `}
    >
      <div
        className="flex items-center justify-center w-10 min-w-10 h-10 rounded mr-4"
        style={{ backgroundColor: workspace.background_color }}
      >
        <span
          className={`font-bold`}
          style={{
            color: colors_array.find(
              (c) => c.bg_color === workspace.background_color
            ).text_color,
          }}
        >
          {workspace.workspace_title[0] &&
            workspace.workspace_title[0].toUpperCase()}
        </span>
      </div>
      <div>
        <Link to={`/workspace/${workspace.id}`}>
          <div className="text-md font-semibold">{workspace.workspace_title}</div>
        </Link>
        <div>
          <span className="text-xs line-clamp-3  ">
            {workspace.description ? workspace.description : "No description"}
          </span>
        </div>
        <div className="text-[11px] text-gray-400 pt-4 ">
          Created At: {workspace.created_at}
        </div>
      </div>
      <div
        className={`absolute right-2 top-2 `}
      >
        <div className="flex items-center justify-center">
          <button ref={buttonRef} onClick={toggleSubmenu}>
            <MenuDotsIcon />
          </button>
          {isSubmenuOpen && (
            <div
              ref={submenuRef}
              className="absolute top-3 right-0 bg-base-100 border  rounded-md shadow-md z-20 "
            >
              <ul className="text-sm">
                <li className="py-1 px-3 rounded-t-md cursor-pointer hover:bg-base-200" onClick={()=>setIsEditMode(true) } >
                  Edit
                </li>
                <li className="py-1 px-3 cursor-pointer hover:bg-base-200">
                  Close
                </li>
                <li
                  onClick={toggleDeleteModal}
                  className="py-1 px-3 rounded-b-md cursor-pointer hover:bg-secondary  text-red-500"
                >
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <CreateWorkspaceModal
        isOpen={isEditMode}
        onRequestClose={() => setIsEditMode(false)}
        workspace={workspace}
        isEditMode={isEditMode}
        onWorkspaceUpdated={(workspace) => {
          updateWorkspace(workspace);
          setIsEditMode(false);
        }}
      />
      <DeleteWorkspaceModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        workspace={workspaceToDelete}
        onWorkspaceDeleted={handleWorkspaceDeleted}
        
      />
    </div>
  );
}

export default WorkspaceCard;

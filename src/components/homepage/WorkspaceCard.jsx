/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import MenuDotsIcon from "../../assets/MenuDotsIcon";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteWorkspaceModal from "./DeleteWorkspaceModal";
import { useWorkspaces } from "../../context/workspaceContext/WorkspaceContext";

function WorkspaceCard({ workspace, workspaces }) {
  const { deleteWorkspace } = useWorkspaces();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workspaceToDelete, setWorkspaceToDelete] = useState(workspace);

  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const submenuRef = useRef(null);
  const buttonRef = useRef(null);

  const [cardVisibility, setCardVisibility] = useState(false);

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
      className={`group relative flex items-center p-3 w-[270px] min-w-[270px] border border-transparent rounded-md ${cardVisibility ? "border-gray-600" : ""} hover:border-gray-600 hover:bg-base-200 transition duration-300 `}
    >
      <div
        className="flex items-center justify-center w-10 h-10 rounded mr-4"
        style={{ backgroundColor: workspace.background_color }}
      >
        <span
          className={`font-bold ${workspace.background_color === "#fff232" ? "text-black" : "text-white"}`}
        >
          {workspace.workspace_title[0] &&
            workspace.workspace_title[0].toUpperCase()}
        </span>
      </div>
      <div>
        <Link to={`/workspace/${workspace.id}`}>
          <div className="text-md">{workspace.workspace_title}</div>
        </Link>
        <div className="text-[11px] text-gray-400">
          Last activity:{workspace.updated_at}
        </div>
      </div>
      <div
        className={`absolute right-2 top-2 ${cardVisibility ? "visible" : "invisible"} group-hover:visible `}
      >
        <div className="flex items-center justify-center">
          <button ref={buttonRef} onClick={toggleSubmenu}>
            <MenuDotsIcon />
          </button>
          {isSubmenuOpen && (
            <div
              ref={submenuRef}
              className="absolute top-3 right-0 bg-base-200 border border-gray-500 rounded-md shadow-md z-20 "
            >
              <ul className="text-[11px]">
                <li className="py-1 px-3 rounded-t-md cursor-pointer hover:bg-neutral">
                  Edit
                </li>
                <li className="py-1 px-3 cursor-pointer hover:bg-neutral">
                  Close
                </li>
                <li
                  onClick={toggleDeleteModal}
                  className="py-1 px-3 rounded-b-md cursor-pointer hover:bg-neutral text-[tomato]"
                >
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
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

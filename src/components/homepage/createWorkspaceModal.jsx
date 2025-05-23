/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import supabase from "../../supabase/supabase";

import { colors_array } from "../../utils/colorsWorkspace";

Modal.setAppElement("#root");

function CreateWorkspaceModal({ isOpen, onRequestClose,onWorkspaceUpdated, onWorkspaceCreated, workspace, isEditMode }) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("primary");
  const [description, setDescription] = useState("");

  // Populate fields when in edit mode
  useEffect(() => {
    if (isEditMode && workspace) {
      setTitle(workspace.workspace_title || "");
      setColor(workspace.background_color || "primary");
      setDescription(workspace.description || "");
    } else {
      setTitle("");
      setColor("primary");
      setDescription("");
    }
  }, [isEditMode, workspace]);

  const handleCreateWorkspace = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("workspaces")
      .insert([{ workspace_title: title, background_color: color, description }])
      .select();
    if (error) {
      console.error("Error creating workspace:", error.message);
    } else {
      setTitle("");
      setColor("primary");
      setDescription("");
      onWorkspaceCreated(data[0]);
      onRequestClose();
    }
  };

  const handleEditWorkspace = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("workspaces")
      .update({ workspace_title: title, background_color: color, description,updated_at: new Date() })
      .eq("id", workspace.id)
      .select();
    if (error) {
      console.error("Error updating workspace:", error.message);
    } else {
      setTitle("");
      setColor("primary");
      setDescription("");
      onWorkspaceUpdated(data[0]);
      onRequestClose();
    }
  };

  const handleSubmit = (e) => {
    if (isEditMode) {
      handleEditWorkspace(e);
    } else {
      handleCreateWorkspace(e);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex flex-col p-8 bg-base-100 border border-base-300 rounded-xl shadow-xl w-[500px] font-light"
      overlayClassName="fixed inset-0 flex justify-center items-center bg-[rgb(0,0,0,0.1)] z-50"
    >
      <div className="w-full mb-6">
        <h2 className="">{isEditMode ? "Edit Workspace" : "Create a Workspace"}</h2>
        <p className="text-sm text-neutral-400">
          A Workspace represents a space with its own tasks, workflows, timelines, and settings.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm">Workspace Title</label>
          <div className="flex">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded mr-4 bg-${color} `}
              
            >
              <span
                className={`font-bold text-${color}-content`}
                
              >
                {title[0] && title[0].toUpperCase()}
              </span>
            </div>
            <input
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 bg-base-200 border border-base-300  rounded text-sm outline-none"
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="ml-1">
            <label className="block text-left mb-2 text-sm">Pick a color</label>
            <div className="flex flex-wrap">
              {colors_array.map((colorOption) => (
                <button
                  key={colorOption.bg_color}
                  type="button"
                  onClick={() => setColor(colorOption.bg_color)}
                  className={`w-4 h-4 rounded-md mr-7 my-1 bg-${colorOption.bg_color}  ${
                    color === colorOption.bg_color ? "ring-1 ring-offset-2 ring-blue-500" : ""
                  } border border-gray-400 `}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">
            Description <span className="text-[12px] text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-base-200 border border-base-300 rounded text-sm outline-none"
          />
        </div>
        <div className="flex gap-4 my-2 justify-end">
          <button
            type="submit"
            className="btn btn-accent"
          >
            {isEditMode ? "Save Changes" : "Create"}
          </button>
          <button
            type="button"
            className="btn "
            onClick={onRequestClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateWorkspaceModal;

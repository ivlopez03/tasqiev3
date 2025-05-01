import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import supabase from "../supabase/supabase";
import { useWorkspaces } from "../context/workspaceContext/WorkspaceContext";
import { colors_array } from "../utils/colorsWorkspace";


import { CiCalendar,CiFlag1 } from "react-icons/ci";
import { LuTag,LuX } from "react-icons/lu";
import { FaRegCircle, FaRegSquare } from "react-icons/fa";
import { MdChangeHistory } from "react-icons/md";
import { LuDiamond } from "react-icons/lu";
import { MdOutlineTask } from "react-icons/md";
import {
    BsChevronDoubleUp,
    BsChevronDoubleDown,
  } from "react-icons/bs";
import { FaEquals } from "react-icons/fa6";
import { LuFolderKanban } from "react-icons/lu";

const taskTypes = [
    { value: "task", label: "Task", icon: <FaRegSquare className="bg-blue-500 text-white rounded-sm p-1 " /> },
    { value: "story", label: "Story", icon: <LuDiamond className="bg-purple-500 text-white rounded-sm p-1 " /> },
    { value: "improvement", label: "Improvement", icon: <MdChangeHistory className="bg-green-700 text-white rounded-sm p-1 " /> },
    { value: "bug", label: "Bug", icon: <FaRegCircle className="bg-red-500 text-white rounded-sm p-1 " /> },];

const taskPriorities = [
    { value: "low", label: "Low", icon: <BsChevronDoubleDown fill="blue" /> },
    { value: "medium", label: "Medium", icon: <FaEquals fill="#F3D200" /> },
    { value: "high", label: "High", icon: <BsChevronDoubleUp fill="tomato" /> },
  ];

    
Modal.setAppElement("#root");

function QuickTaskModal({ isOpen, onRequestClose,refreshTasks,refreshBacklogtasks }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [deadline, setDeadline] = useState(null);
  const [type, setType] = useState("task");
  const [description, setDescription] = useState("");
  const [workspaceId, setWorkspaceId] = useState("backlog");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleCancel = () => {
    setIsCancelModalOpen(true); // Open the confirmation modal
  };

  const confirmCancel = () => {
    // Reset form fields
    setTitle("");
    setStatus("todo");
    setPriority("medium");
    setDeadline(null);
    setType("task");
    setTags([]);
    setDescription("");
    setWorkspaceId("backlog");
    setIsCancelModalOpen(false); // Close the confirmation modal
    onRequestClose(); // Close the main modal
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false); // Close the confirmation modal
  };

 // const { workspaceId } = useParams();

 const { workspaces } = useWorkspaces();



 const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
        setNewTag('');
      }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (workspaceId === "backlog") {
        try {
            const { data, error } = await supabase
              .from("backlog")
              .insert([
                { 
                    title: title,
                    description:description, 
                    status:status,
                    Priority: priority,
                    due_at:deadline,
                    type:type,
                },
            ])
              .select();
            if (error) {
              console.error("Error creating task in backlog:", error.message);
            } else {
                console.log("Task created successfully in backlog:", data);
            }
        
            const createdTask = data[0]; 
            
            //Insert tags into the tags table
            const tagInserts = tags.map((tag) => ({
                tag_name: tag,
                task_id: null,
                backlog_task_id: createdTask.id, // Use the task ID from the created task
              }));
        
            const { error: tagError } = await supabase.from("tags").insert(tagInserts);
            
            if (tagError) {
                console.error("Error adding tags:", tagError.message);
              } else {
                console.log("Tags added successfully");
              }

            // Refresh tasks in backlog board
            if (refreshBacklogtasks) {
                refreshBacklogtasks();
            }  
        
            } catch (error) {
                console.error("Unexpected error:", error);
            }
    } else { 
        try {
        const { data, error } = await supabase
      .from("workspace_tasks")
      .insert([
        { 
            title: title,
            description:description, 
            status:status,
            Priority: priority,
            due_at:deadline,
            type:type,
            workspace_id: workspaceId 
        },
    ])
      .select();
    if (error) {
      console.error("Error creating task in  workspace:", error.message);
    } 

    const createdTask = data[0]; 
    
    //Insert tags into the tags table
    const tagInserts = tags.map((tag) => ({
        tag_name: tag,
        task_id: createdTask.id, // Use the task ID from the created task
      }));

    const { error: tagError } = await supabase.from("tags").insert(tagInserts);
    
    if (tagError) {
        console.error("Error adding tags:", tagError.message);
      } else {
        console.log("Tags added successfully");
      }

    // Refresh tasks in Kanban board
     if (refreshTasks) {
       refreshTasks();
  }
    } catch (error) {
        console.error("Unexpected error:", error);
    }
  }
  // Reset form fields
  setTitle("");
  setStatus("todo");
  setPriority("medium");
  setDeadline(null);
  setType("task");
  setTags([]);
  setDescription("");
  setWorkspaceId("backlog");
  onRequestClose();
};

 

  const handleSubmit = (e) => {
    console.log(workspaceId)
    handleCreateTask(e);
    
  };

  const customStyles = {
    content: {
      top: '0%',
      left: '0%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(0%, -100%)',
    },
  };

 
  


  return (
    <>
    {/* Main Modal */}
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex flex-col  bg-base-100 border border-gray-300 rounded-xl shadow-xl w-[550px] font-light"
      overlayClassName="fixed inset-0 flex justify-center items-center bg-[rgb(0,0,0,0.1)] z-50"
    >
      <div className="w-full flex items-center justify-between  px-6 py-3   ">
        <div className="flex items-center gap-2">
            <div>
                <MdOutlineTask size={24} className="text-blue-500" />
            </div>
            <div>
                <h2 className="font-semibold">Create New Task</h2>
                <p className="text-xs text-gray-500">Let's get things moving! Create a new task and add it to your workspace.</p>
    
            </div>
        </div>
        <div>
            <button>
                <LuX size={20} className="text-gray-500 hover:text-gray-700" onClick={onRequestClose} />
            </button>
        </div>
        </div>
      <div>
        <hr className="text-gray-300" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 ">

      <div className="space-y-4">
        
        <div className="flex items-center gap-4" >
            {/* Type Dropdown */}
            <div className="w-60">
                <label htmlFor="type" className="text-sm font-medium text-gray-700 mb-1">
                Type
                </label>
                <div className="relative text-sm">
                <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300  rounded-md focus:outline-none  appearance-none"
                >
                    {taskTypes.map((taskType) => (
                    <option key={taskType.value} value={taskType.value}>
                        {taskType.label}
                    </option>
                    ))}
                </select>
                <div className="absolute text-lg inset-y-0 right-3 flex items-center pointer-events-none">
                    {taskTypes.find((taskType) => taskType.value === type)?.icon}
                </div>
                </div>

            </div>
           
            {/* Workspace Dropdown */}
            <div className="w-full">
                <label htmlFor="workspace" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <LuFolderKanban size={14} className="mr-1" />
                Workspace
                </label>
                <div className="relative text-sm">
                <select
                    id="workspace"
                    value={workspaceId}
                    onChange={(e) => setWorkspaceId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300   rounded-md focus:outline-none  appearance-none"
                >

                    <option  
                        value="backlog"
                    >
                        Backlog
                    </option>

                    {workspaces.map((workspace) => (
                    <option key={workspace.id} value={workspace.id}>
                        {workspace.workspace_title}
                    </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    {workspaceId && (
                    <div
                        className="w-6 h-6 rounded-md flex items-center justify-center"
                        style={{
                        backgroundColor: workspaces.find((w) => w.id === workspaceId)?.background_color,
                        }}
                    >
                        <span
                        className="text-xs font-semibold"
                        style={{
                            color: colors_array.find(
                            (c) =>
                                c.bg_color ===
                                workspaces.find((w) => w.id === workspaceId)?.background_color
                            )?.text_color,
                        }}
                        >
                        {workspaces.find((w) => w.id === workspaceId)?.workspace_title[0]}
                        </span>
                    </div>
                    )}
                </div>
                </div>
            </div>
        </div>
        
        <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title*
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full font-medium px-3 py-2 border border-gray-300  rounded-md focus:outline-none bg-base-200 "
                placeholder=""
                required
              />
        </div>
            
        <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full resize-none text-sm px-3 py-2 border border-gray-300   rounded-md focus:outline-none bg-base-200 "
                placeholder="Add a description..."
               
              />
        </div>
            
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Calendar input */}
              <div>
                <label htmlFor="dueDate" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <CiCalendar size={14} className="mr-1" />
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-gray-300  rounded-md focus:outline-none "

                />
              </div>
              
            {/* Priority Dropdown */} 
              <div>
                <label htmlFor="type" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <CiFlag1 size={14} className="mr-1" />
                Priority
                </label>
                <div className="relative text-sm">
                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300  rounded-md focus:outline-none  appearance-none"
                >
                    {taskPriorities.map((taskPriority) => (
                    <option key={taskPriority.value} value={taskPriority.value}>
                        {taskPriority.label}
                    </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    {taskPriorities.find((taskPriority) => taskPriority.value === priority)?.icon}
                </div>
                </div>
            </div>
        </div>
            
            <div>
              <label htmlFor="tags" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <LuTag size={14} className="mr-1" />
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <LuX size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  id="newTag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-3 py-2 border border-gray-300  text-sm rounded-l-md focus:outline-none "
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-gray-100 text-gray-700 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-200"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

        
        <div className="flex gap-4 my-2 justify-end">
          <button
            type="submit"
            className="px-4 py-1 bg-blue-500 text-white rounded text-sm"
          >
             Create
          </button>
          <button
            type="button"
            className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
    {/* Cancel Confirmation Modal */}
    <Modal
        isOpen={isCancelModalOpen}
        onRequestClose={closeCancelModal}
        style={customStyles}
        className="flex flex-col  bg-base-100 border border-gray-300 rounded-xl  shadow-xl w-[400px] font-light"
        overlayClassName="fixed inset-0 flex justify-center items-center bg-[rgb(0,0,0,0.2)]  z-50"
      >
        <div className="w-full px-8 py-3  ">
          <h2 className="text-lg font-semibold">Discard new task creation?</h2>
          <p className="text-sm">You will loose all the information entered for this task.</p>
        </div>
        <div className="flex gap-4 p-4 rounded-b-md justify-end bg-gray-100">
          <button
            type="button"
            className="px-4 py-1 bg-red-500 text-white rounded text-sm"
            onClick={confirmCancel}
          >
            Discard
          </button>
          <button
            type="button"
            className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
            onClick={closeCancelModal}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

export default QuickTaskModal;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { createContext, useContext, useState, useEffect} from 'react';
import supabase from "../../supabase/supabase";
import { fetchWithCache } from '../../utils/cacheUtils';


const WorkspaceContext = createContext();

export const WorkspaceProvider = ({children}) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [workspaceDeleted, setWorkspaceDeleted] = useState([]);

    useEffect(() => {
        const storedWorkspaces = localStorage.getItem('workspaces');
        if (storedWorkspaces) {
            setWorkspaces(JSON.parse(storedWorkspaces).data);
            setLoading(false);
        } else {
            fetchWorkspaces();
        }
    },[]);

    const fetchWorkspaces = async () => {
        const workspaces = await fetchWithCache("workspaces", async () =>{
            const { data, error } = await supabase.from("workspaces").select();
            if (error) throw error;
            return data;
        });
        setWorkspaces(workspaces);
        setLoading(false);
    };

   
    const createWorkspace = (newWorkspace) => {
        const updatedWorkspaces = [...workspaces, newWorkspace];
        setWorkspaces((prevWorkspaces) => [...prevWorkspaces, newWorkspace]);
        console.log('this is updateworkpaces',updatedWorkspaces)

        // Update cache
        localStorage.setItem(
          'workspaces',
          JSON.stringify({ data: updatedWorkspaces, timestamp: Date.now() })
        );

        //console.log(localStorage.getItem('workspaces'))

        console.log(`Workspace ${newWorkspace.workspace_title} created`);

      };

    const updateWorkspace = (updatedWorkspace) => {
        const updatedWorkspaces = workspaces.map(workspace => {
            if (workspace.id === updatedWorkspace.id) {
                return { ...workspace, ...updatedWorkspace };
            }
            return workspace;
        });
        setWorkspaces(updatedWorkspaces);

        // Update cache
        localStorage.setItem(
          'workspaces',
          JSON.stringify({ data: updatedWorkspaces, timestamp: Date.now() })
        );

        console.log(`Workspace ${updatedWorkspace.workspace_title} updated`);
    }

    const deleteWorkspace = (workspaceToDelete) => {
        const updatedWorkspaces = workspaces.filter(workspace => workspace.id !== workspaceToDelete.id);
        setWorkspaces(updatedWorkspaces);
        console.log(`Workspace ${workspaceToDelete.workspace_title} deleted`);
        setWorkspaceDeleted(workspaceToDelete);

        // Update cache
        localStorage.setItem(
          'workspaces',
          JSON.stringify({ data: updatedWorkspaces, timestamp: Date.now() })
        );

        console.log(`Workspace ${workspaceToDelete.workspace_title} deleted`);

    };

    return(
        <WorkspaceContext.Provider value={{workspaces,createWorkspace,deleteWorkspace,updateWorkspace,loading,workspaceDeleted}}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspaces = () => {
    return useContext(WorkspaceContext);
};
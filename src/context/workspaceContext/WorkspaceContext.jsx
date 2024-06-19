/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { createContext, useContext, useState, useEffect} from 'react';
import supabase from "../../supabase/supabase";
import { fetchWithCache } from '../../utils/cacheUtils';

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({children}) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState(true);


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
        // Update cache
        localStorage.setItem(
          'workspaces',
          JSON.stringify({ data: [...updatedWorkspaces, newWorkspace], timestamp: Date.now() })
        );
      };


    const deleteWorkspace = (workspaceId) => {
        const updatedWorkspaces = workspaces.filter(workspace => workspace.id !== workspaceId);
        setWorkspaces(updatedWorkspaces);

        // Update cache
        localStorage.setItem(
          'workspaces',
          JSON.stringify({ data: updatedWorkspaces, timestamp: Date.now() })
        );

    };

    return(
        <WorkspaceContext.Provider value={{workspaces,createWorkspace,deleteWorkspace,loading}}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspaces = () => {
    return useContext(WorkspaceContext);
};

import React, { createContext, useContext, useState, useEffect } from "react";
import supabase from "../../supabase/supabase";
import { useAuth } from "../authContext";

const BacklogContext = createContext();

export const BacklogProvider = ({ children }) => {
  const { userId } = useAuth();
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backlogDeleted, setBacklogDeleted] = useState([]);
    const [userLoading, setUserLoading] = useState(true);
  const [localUserId, setLocalUserId] = useState(null); // local storage fallback for userId

  const getBacklogTasks = async () => {
    try {
        const { data, error } = await supabase
            .from("backlog")
            .select("*")
            .eq("user", userId)
        if (error) {
            console.error("Error fetching tasks:", error.message);
            return [];
        }
        return data;
        
    } catch (error) {
        console.error("Unexpected error:", error);
        return [];
    }
  };

  const refreshBacklogTasks = async () => {
    try {
        setLoading(true); // Show loading state
        const user = userId || localUserId; // Use userId or fallback to local storage
        if (!user) {
          console.warn("User ID is not available. Skipping task fetch.");
          return;
        }
        const tasks = await getBacklogTasks(user);
        setBacklogTasks(tasks);
        localStorage.setItem("backlogTasks", JSON.stringify(tasks)); // Store tasks in local storage
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false); // Hide loading state
      }
  };

    // Watch for changes in userId and update local storage
  useEffect(() => {
    if (userId) {
      setLocalUserId(userId); // Update local state
      localStorage.setItem("userId", userId); // Store userId in local storage
      setUserLoading(false); // Hide loading state
      console.log("User ID set in local storage:");
    } else {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        console.log("Using stored user ID");
        setLocalUserId(storedUserId); // Use stored userId as fallback
        setUserLoading(false); // Hide loading state
      }
    }
  }, [userId]);

  // Fetch backlog tasks when userId or localUserId changes
  useEffect(() => {
    const storedBacklogTasks = localStorage.getItem("backlogTasks");
    if (storedBacklogTasks) {
        setBacklogTasks(JSON.parse(storedBacklogTasks));
        setLoading(false);
        }   else if (!userLoading && (userId || localUserId)) {
        refreshBacklogTasks();
    }
  }, [userId, localUserId, userLoading]);


  return (
    <BacklogContext.Provider
      value={{
        backlogTasks,
        loading,
        refreshBacklogTasks,
        backlogDeleted,
      }}
    >
      {children}
    </BacklogContext.Provider>
  );

  };

export const useBacklog = () => useContext(BacklogContext);
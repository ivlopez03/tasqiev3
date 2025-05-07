import React, { createContext, useContext, useState, useEffect, use } from "react";
import supabase from "../../supabase/supabase";
import { useAuth } from "../authContext";

const BacklogContext = createContext();

export const BacklogProvider = ({ children }) => {
  const { session } = useAuth();
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backlogDeleted, setBacklogDeleted] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
 
  // Local storage fallback for userId

  // Function to fetch backlog tasks and their related tags
  const getBacklogTasksWithTags = async (userId) => {
    try {
      // Fetch backlog tasks
      const { data: tasks, error: tasksError } = await supabase
        .from("backlog")
        .select("*")
        .eq("user", userId);

      if (tasksError) {
        console.error("Error fetching tasks:", tasksError.message);
        return [];
      }

      // Fetch tags related to the backlog tasks
      const taskIds = tasks.map((task) => task.id); // Extract task IDs
      const { data: tags, error: tagsError } = await supabase
        .from("tags")
        .select("*")
        .in("backlog_task_id", taskIds); // Fetch tags for the task IDs

      if (tagsError) {
        console.error("Error fetching tags:", tagsError.message);
        return tasks; // Return tasks without tags if there's an error
      }

      // Combine tasks with their related tags
      const tasksWithTags = tasks.map((task) => ({
        ...task,
        tags: tags.filter((tag) => tag.backlog_task_id === task.id), // Attach tags to the corresponding task
      }));

      return tasksWithTags;
    } catch (error) {
      console.error("Unexpected error:", error);
      return [];
    }
  };

  const refreshBacklogTasks = async () => {
    if (session && session.user) {
      const userId = session.user.id; // Get the user ID from the session
      setLoading(true);
      // Fetch backlog tasks with tags for the logged-in user
      const tasks = await getBacklogTasksWithTags(userId);
      setBacklogTasks(tasks)
      setLoading(false);

    }
  }

  

  

 
  useEffect(() => {
    if (session && session.user && !hasFetched) {
      refreshBacklogTasks();
      setHasFetched(true);
    }
  }
  , [session, hasFetched]);
  

  return (
    <BacklogContext.Provider
      value={{
        backlogTasks,
        loading,
        getBacklogTasksWithTags,
        refreshBacklogTasks,
      }}
    >
      {children}
    </BacklogContext.Provider>
  );
};

export const useBacklog = () => useContext(BacklogContext);
import { useParams } from "react-router-dom";
import { statuses } from "./TaskCard";
import TaskCard from "./TaskCard";
import { useState, useEffect } from "react";
import supabase from "../../supabase/supabase";
import { LineWave } from "react-loader-spinner";


const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const { workspaceId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Fetch tasks and their related tags for the given workspaceId
        const { data, error } = await supabase
          .from("workspace_tasks")
          .select(`
            *,
            tags (tag_name)
          `)
          .eq("workspace_id", workspaceId);

        if (error) {
          console.error("Error fetching tasks:", error.message);
        } else {
          // Map tags into the task object for easier access
          const tasksWithTags = data.map((task) => ({
            ...task,
            tags: task.tags.map((tag) => tag.tag_name), // Extract tag names
          }));
          setTasks(tasksWithTags);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [workspaceId]);

  const columns = statuses.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status);
    return {
      title: status,
      tasks: tasksInColumn,
    };
  });

  const updateTask = (task) => {
    const updatedTasks = tasks.map((t) => {
      return t.id === task.id ? task : t;
    });
    setTasks(updatedTasks);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center ">
        <LineWave
           visible={true}
           height="100"
           width="100"
           color="#2563eb"
           ariaLabel="line-wave-loading"
           wrapperStyle={{}}
           wrapperClass=""
           firstLineColor=""
           middleLineColor=""
           lastLineColor=""
        />
      </div>
    );
  }

  return (
    <div className="h-full px-4 flex gap-4   ">
      {columns.map((column, index) => {
        return (
          <div key={index}>
            <h1 className="capitalize font-semibold text-lg">
              {column.title}{" "}
              {column.tasks.length > 0 && (
                <span className="bg-blue-50 text-blue-700 text-[10px] rounded-[4px] px-[4px] py-[2px] relative top-[-2px] ml-1">
                  {column.tasks.length}
                </span>
              )}
            </h1>
            <div className="h-[85%] overflow-y-auto pb-8 hover:scrollbar- hover:scrollbar-thumb-blue-500 hover:scrollbar-track-gray-200">
              {column.tasks.map((task) => (
                <TaskCard task={task} key={task.id} updateTask={updateTask}   />
              ))}
            </div>
            
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
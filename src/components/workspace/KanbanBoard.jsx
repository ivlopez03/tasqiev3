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

  const updateTask = async(task) => {
    try {
    const { data, error } = await supabase
      .from("workspace_tasks")
      .update({ status: task.status })
      .eq("id", task.id)

      console.log("Task updated:", data);

    } catch (error) {
      console.error("Error updating task:", error.message);
    } 
    // Update the local state with the new task data
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

  const handleDrop = (e, status) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const task = tasks.find((task) => task.id === id);
    if (task) {
      updateTask({ ...task, status: status });
    };
  }

  return (
    <div className="h-full w-fit px-4 flex gap-4  ">
      {columns.map((column, index) => {
        return (
          <div onDrop={(e)=> handleDrop(e, column.title)} onDragOver={(e) => e.preventDefault()} key={index} className=" h-full w-full min-w-xs  overflow-y-auto px-1.5 " >
            <div className="capitalize sticky top-0 z-10 bg-base-200 font-semibold text-lg px-4 py-1.5 flex items-center justify-between border-b border-base-300  ">
              {column.title}
              {column.tasks.length > 0 && (
                <span className="bg-base-300  text-[0.6rem] rounded-full px-2 py-0.5 ">
                  {column.tasks.length}
                </span>
              )}
            </div>
            {column.tasks.length > 0 && (
              <div className="flex flex-col gap-1.5 h-fit w-fit overflow-y-auto rounded-md   p-4 mt-2 bg-base-100 z-0  ">
              {column.tasks.map((task) => (
                <TaskCard task={task} key={task.id}   />
              ))}
            </div>
             
            )}
            
            
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
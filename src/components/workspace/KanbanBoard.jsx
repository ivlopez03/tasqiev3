import { tasks as initialTasks, statuses } from "./TaskCard";
import TaskCard from "./TaskCard";
import { useState } from "react";


function KanbanBoard(){

    const [tasks,setTasks] = useState(initialTasks);

    const columns = statuses.map((status) =>{
        const tasksInColumn = tasks.filter((task)=> task.status === status)
        return{
            title:status,
            tasks:tasksInColumn
        };
    })

    const updateTask = (task) => {
        const updatedTasks = tasks.map((t) => {
            return t.id === task.id ? task : t;
        });
        setTasks(updatedTasks);
    }
    

    return(
            <div className=" m-5 flex gap-4" >
                {columns.map((column)=>{
                    return(
                        <div key={column.id}>
                            <h1 className="capitalize">{column.title} {column.tasks.length > 0 && <span className=" bg-black text-white text-[10px] rounded-[4px] px-[4px] py-[2px] relative top-[-2px] ml-1">{column.tasks.length}</span> } </h1>
                            {column.tasks.map((task) => <TaskCard task={task} key={task.id}  updateTask={updateTask}/>)}
                        </div>
                    );
                })}
            </div>
        );

}


export default KanbanBoard;
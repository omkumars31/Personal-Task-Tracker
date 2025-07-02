import React from "react";
import TaskItem from './TaskItem';

const TaskList = ({tasks, setTasks, filter}) =>{

    const filteredTasks = tasks.filter(task =>{
        if(filter === 'completed') return task.completed;
        if(filter === 'pending') return !task.completed;
        return true; 
    });

    return(
        <div className="task-list">
            {filteredTasks.length === 0 ?(<p>No Tasks to Display.</p>
            ) : (
            filteredTasks.map(task => (
                <TaskItem key={task.id} task ={task} setTasks ={setTasks} />
            ))
            )}
        </div>
    );
}
export default TaskList
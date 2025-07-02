import React from "react";
import TaskItem from './TaskItem';

const TaskList = ({ tasks, setTasks, filter, searchTerm }) => {
  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);

    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="task-list">
      {filteredTasks.length === 0 ? (
        <p>No Tasks to Display.</p>
      ) : (
        filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} setTasks={setTasks} />
        ))
      )}
    </div>
  );
};

export default TaskList;

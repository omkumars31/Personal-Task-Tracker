import React, { useState } from 'react';

const TaskItem = ({ task, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDesc, setEditedDesc] = useState(task.description);

  const handleToggleComplete = () => {
    setTasks(prev =>
      prev.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t)
    );
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(t => t.id !== task.id));
    }
  };

  const handleEditSave = () => {
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id
          ? { ...t, title: editedTitle, description: editedDesc }
          : t
      )
    );
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <input
              type="text"
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
            />
          </>
        ) : (
          <>
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
          </>
        )}
      </div>

      <div className="task-actions">
        <button onClick={handleToggleComplete}>
          {task.completed ? 'Mark Pending' : 'Mark Done'}
        </button>
        {isEditing ? (
          <button onClick={handleEditSave}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;

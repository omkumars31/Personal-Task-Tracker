import React, { useState } from 'react';

const TaskForm = ({ setTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('General'); // 🏷️ Category

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      dueDate,
      category, // 🏷️ Add category
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [newTask, ...prev]);

    // Clear input fields
    setTitle('');
    setDescription('');
    setPriority('low');
    setDueDate('');
    setCategory('General'); // 🧼 Reset category
  };

  return (
    <form onSubmit={handleAddTask} className="task-form">
      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Urgent">Urgent</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;

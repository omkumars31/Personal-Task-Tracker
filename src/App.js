import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { getTasksFromStorage, saveTasksToStorage } from './utils/localStorage';

const App = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Load tasks from localStorage when user logs in
  useEffect(() => {
    if (username) {
      const storedTasks = getTasksFromStorage();
      setTasks(storedTasks);
    }
  }, [username]);

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    if (username) {
      saveTasksToStorage(tasks);
    }
  }, [tasks, username]);

  // Set dark/light mode on body
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  if (!username) {
    return <Login onLogin={setUsername} />;
  }

  return (
    <div className="app-container">
      {/* 🌙 Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(prev => !prev)}
        className="theme-toggle"
      >
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>

      <h2>Hello, {username}</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <TaskForm setTasks={setTasks} />
      <TaskFilter current={filter} setFilter={setFilter} tasks={tasks} />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        filter={filter}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default App;

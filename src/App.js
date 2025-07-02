import React, { useEffect, useState } from 'react'
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { getTasksFromStorage, saveTasksToStorage } from './utils/localStorage';
const App = () => {

    const [username,setUsername] = useState(localStorage.getItem('username'));
    const [tasks,setTasks] = useState([]);
    const [filter, setFilter] = useState('all');

    // will get tasks from localstorage
    useEffect(() =>{
        if(username){
            const storedTasks = getTasksFromStorage();
            setTasks(storedTasks);
        }

    },[username]);

    // whenever tasks change it will save to localStorage
    useEffect(() =>{
        if(username){
            saveTasksToStorage(tasks);
        }
    },[tasks,username]);

    if(!username){
        return <Login onLogin={setUsername} />;
    }

    return (
        <div className='app-container'>
            <h2>Hello, {username}</h2>
            <TaskForm setTasks={setTasks} />
            <TaskFilter current={filter} setFilter={setFilter} tasks={tasks} />
            <TaskList tasks = {tasks} setTasks={setTasks} filter={filter} />
        </div>
    );
};
export default App;
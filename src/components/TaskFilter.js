import React from 'react';

const TaskFilter = ({ current, setFilter, tasks }) => {
  const getCount = (type) => {
    if (type === 'completed') return tasks.filter(t => t.completed).length;
    if (type === 'pending') return tasks.filter(t => !t.completed).length;
    return tasks.length;
  };

  const filters = ['all', 'completed', 'pending'];

  return (
    <div className="task-filter">
      {filters.map(f => (
        <button
          key={f}
          className={current === f ? 'active' : ''}
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)} ({getCount(f)})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;

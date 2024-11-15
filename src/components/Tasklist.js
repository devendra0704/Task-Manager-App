import React from 'react';
import Task from './Task';

function TaskList({ tasks, onEdit, onDelete , selectedDay, onComplete , setEdit, taskToEdit , setTaskToEdit, onPriorityChange}) {
  return (
    <div className="task-lists p-4 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-blue-600">{tasks.length > 0 ? selectedDay : 'No tasks found'}</h2>
        <ul className="space-y-4">
          {tasks.map(task => (
            <Task key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onComplete={onComplete} setEdit={setEdit} taskToEdit={taskToEdit}  setTaskToEdit={setTaskToEdit}  onPriorityChange={onPriorityChange} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;

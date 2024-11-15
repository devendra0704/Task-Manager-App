import React, { useState } from 'react';

function Task({ task, onEdit, onDelete, onComplete, setEdit, taskToEdit, setTaskToEdit, onPriorityChange }) {

    const [priority, setPriority] = useState('medium');
    return (
        <li className=" bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">
                    Priority <span> : </span>
                    <select
                        value={task.priority}
                        onChange={(e) => onPriorityChange(task.id, e.target.value)}
                        className=" text-sm w-1/3  border rounded focus:outline-blue-500"
                    >
                        <option value="high">High</option>
                        <option value="med">Med</option>
                        <option value="low">Low</option>
                    </select>
                    
                </p>
                <p className="text-sm text-gray-500">Due Date: {task.dueDate}</p>
            </div>
            <div className="flex space-x-4">
                {!task.completed && (
                    <button
                        onClick={() => {
                            setTaskToEdit(task);
                            setEdit(true);
                        }}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                        Edit
                    </button>
                )}
                <button
                    onClick={() => onDelete(task.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Delete
                </button>

                {!task.completed && (
                    < button
                        onClick={() => onComplete(task.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                        Complete
                    </button>
                )}

            </div>
        </li>
    );
}


export default Task
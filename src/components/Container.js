import React, { useState } from 'react';
import AddTask from './AddTask.js';
import TaskList from './Tasklist.js';

function Container({ tasks,setTasks, addTask, editTask, deleteTask, selectedDay, completeTask, setEdit, edit, taskToEdit, setTaskToEdit }) {
    const [showAddTask, setShowAddTask] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const onPriorityChange = (taskId, newPriority) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, priority: newPriority } : task
            )
        );
    };

    const filterTasksByDay = (tasks, selectedDay) => {
        const today = new Date();
        const formatDate = (date) => new Date(date.setHours(0, 0, 0, 0));

        switch (selectedDay) {
            case 'Today':
                return tasks.filter(task =>
                    !task.completed && formatDate(new Date(task.dueDate)).getTime() === formatDate(today).getTime()
                );
            case 'Upcoming':
                return tasks.filter(task =>
                    !task.completed && formatDate(new Date(task.dueDate)).getTime() > formatDate(today).getTime()
                );
            case 'Overdue':
                return tasks.filter(task =>
                    !task.completed && formatDate(new Date(task.dueDate)).getTime() < formatDate(today).getTime()
                );
            case 'Completed':
                return tasks.filter(task => task.completed);
            default:
                return tasks;
        }
    };


    const filteredTasks = filterTasksByDay(tasks, selectedDay).filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by title
    );

    return (
        <div className='bg-slate-300 '>
            <div className=" flex flex-col items-center p-6 sm:flex-row sm:items-start sm:space-x-4 w-full">
                <input
                    type="text"
                    placeholder="Search Task"
                    className="w-full sm:w-96 p-2 mb-4 sm:mb-0 border rounded-md bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button
                    onClick={() => setShowAddTask(!showAddTask)}
                    className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600"
                >
                    Add Task
                </button>

                {(edit || showAddTask) && <AddTask addTask={addTask} setShowAddTask={setShowAddTask} onEdit={editTask} isEdit={edit} taskToEdit={taskToEdit} setEdit={setEdit} setTaskToEdit={setTaskToEdit} />}
            </div>

            <div>
                <TaskList tasks={filteredTasks} onEdit={editTask} onDelete={deleteTask} onComplete={completeTask} selectedDay={selectedDay} setEdit={setEdit} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} onPriorityChange={onPriorityChange} />
            </div>
        </div>
    );
}

export default Container;

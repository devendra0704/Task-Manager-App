import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';


function AddTask({ addTask, setShowAddTask, onEdit, isEdit, taskToEdit, setEdit, setTaskToEdit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('med');

    useEffect(() => {
        console.log("taskToEdit:",taskToEdit );
        if (isEdit && taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setDueDate(taskToEdit.dueDate);
            setPriority(taskToEdit.priority);
        }
    }, [isEdit, taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: isEdit ? taskToEdit.id : Date.now(),
            title,
            description,
            dueDate,
            priority,
            completed: false,
        };
        if(isEdit){
            console.log("edit: ", newTask);
            onEdit(newTask);
        }else{
            addTask(newTask);
        }
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('med');
        setShowAddTask(false);
        setEdit(false);
        setTaskToEdit(null);
        {
            isEdit?toast("Task Updated Successfully!")
            :toast("New Task Added Successfully!");
        }
        
    };

    const closeAddTask = () => {
        setShowAddTask(false);
        setEdit(false);
        setTaskToEdit(null);
    };
    

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative p-4 bg-white shadow-lg rounded-lg w-full max-w-md overflow-auto"
            >

                <IoMdClose
                    onClick={closeAddTask}
                    className="absolute top-4 right-4 text-2xl text-gray-600 cursor-pointer hover:text-red-500 transition"
                />

                <h2 className="text-lg font-bold mb-4 text-center">{isEdit? "Update Task" : "Add New Task"} </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border rounded-lg resize-none focus:outline-blue-500"
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-blue-500 resize-none"
                    ></textarea>

                    <div className="flex gap-4">
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                            className="text-sm w-1/2 p-2 border rounded focus:outline-blue-500"
                        />
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="text-sm w-1/2 p-2 border rounded focus:outline-blue-500"
                        >
                            <option value="high">High</option>
                            <option value="med">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        {isEdit ? 'Save Changes' : 'Save Task'}
                    </button>
                </form>
            </div>
        </div>


    );
}

export default AddTask;

import './App.css';
import Side_bar from './components/Side_bar.js';
import Container from './components/Container.js';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [selectedDay, setSelectedDay] = useState('Today');
  const [edit, setEdit] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);


  useEffect(() => {

    const filteredTasks = tasks.filter(task => task !== null);
    console.log("Updating localStorage with tasks:", filteredTasks);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
  }, [tasks]);

  const addTask = (task) => {
    if (task && task.title) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, task];
        console.log("Adding new task:", task);
        console.log("Updated tasks:", updatedTasks);
        return updatedTasks;
      });
    } else {
      console.error("Attempted to add an invalid task:", task);
    }
  };

  const editTask = (updatedTask) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
    });
    setTaskToEdit(null);
  };
  

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast("Task Deleted Successfully!");
  };

  const completeTask = (taskId) => {
    editTask({
      ...tasks.find((task) => task.id === taskId),
      completed: true,
    });
    toast("Task Completed Successfully!");
  };

  return (
    <div className='flex bg-slate-300  flex-col sm:flex-row h-screen w-full'>
      <Side_bar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <Container
        tasks={tasks}
        addTask={addTask}
        editTask={editTask}
        deleteTask={deleteTask}
        selectedDay={selectedDay}
        completeTask={completeTask}
        setEdit={setEdit}
        edit={edit}
        taskToEdit={taskToEdit}
        setTaskToEdit={setTaskToEdit}
        setTasks={setTasks}
      />
      <ToastContainer/>
    </div>
  );
}

export default App;

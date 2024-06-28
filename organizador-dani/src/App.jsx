import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './TaskList/TaskList';
import InitialTasks from './InitialTasks/InitialTasks';
import InProgressTasks from './InProgressTasks/InProgressTasks';
import CompletedTasks from './CompletedTasks/CompletedTasks';
import ArchivedTasks from './ArchivedTasks/ArchivedTasks';
import WelcomeModal from './WelcomeModal';
import './App.css';
import axios from 'axios';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);
    const [showModal, setShowModal] = useState(true);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const fetchArchivedTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/archived-tasks');
            setArchivedTasks(response.data);
        } catch (error) {
            console.error('Error fetching archived tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchArchivedTasks();
    }, []);

    const addTask = async (newTask) => {
        try {
            const response = await axios.post('http://localhost:5000/tasks', newTask);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/tasks/${id}`, { status });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleArchiveTask = async (id) => {
        try {
            await axios.put(`http://localhost:5000/tasks/${id}`, { status: 'archived' });
            fetchTasks();
            fetchArchivedTasks();
        } catch (error) {
            console.error('Error archiving task:', error);
        }
    };

    const handleDeleteArchivedTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${id}`);
            fetchArchivedTasks();
        } catch (error) {
            console.error('Error deleting archived task:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <Router>
            <div>
                {showModal && <WelcomeModal onClose={closeModal} />}
                <nav className="navbar">
                    <h1>Organi Yépez</h1>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/in-progress">Tareas en Proceso</Link></li>
                        <li><Link to="/completed">Tareas Completadas</Link></li>
                        <li><Link to="/archived">Tareas Archivadas</Link></li>
                    </ul>
                </nav>
                <div className="container">
                    <div className="task-form-container">
                        <TaskList onTaskAdded={addTask} />
                    </div>
                    <div className="task-cards-container">
                        <Routes>
                            <Route path="/in-progress" element={<InProgressTasks tasks={tasks.filter(task => task.status === 'in progress')} onStatusChange={handleStatusChange} onArchiveTask={handleArchiveTask} />} />
                            <Route path="/completed" element={<CompletedTasks tasks={tasks.filter(task => task.status === 'completed')} onArchiveTask={handleArchiveTask} />} />
                            <Route path="/archived" element={<ArchivedTasks tasks={archivedTasks} onDeleteArchivedTask={handleDeleteArchivedTask} />} />
                            <Route path="/" element={<InitialTasks tasks={tasks.filter(task => task.status === 'pending')} onStatusChange={handleStatusChange} onArchive={handleArchiveTask} />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TaskList.css';

const TaskList = ({ onTaskAdded }) => {
    const [newTask, setNewTask] = useState({
        title: '',
        category: '',
        priority: '',
        description: '',
        status: 'pending'
    });

    const addTaskToList = () => {
        if (newTask.title.trim() === '' || newTask.category.trim() === '' || newTask.priority.trim() === '') {
            alert('Por favor, complete todos los campos antes de agregar la tarea.');
            return;
        }

        onTaskAdded(newTask);
        setNewTask({
            title: '',
            category: '',
            priority: '',
            description: '',
            status: 'pending'
        });
    };

    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    return (
        <div className="task-list-container">
            <div className="task-form">
                <h2>Agregar Tarea</h2>
                <form onSubmit={(e) => { e.preventDefault(); addTaskToList(); }}>
                    <input type="text" name="title" placeholder="Título" value={newTask.title} onChange={handleChange} />
                    <input type="text" name="category" placeholder="Categoría" value={newTask.category} onChange={handleChange} />
                    <input type="text" name="priority" placeholder="Prioridad" value={newTask.priority} onChange={handleChange} />
                    <textarea name="description" placeholder="Descripción" value={newTask.description} onChange={handleChange} />
                    <button type="submit">Agregar</button>
                </form>
            </div>
        </div>
    );
};

export default TaskList;

import React, { useState } from 'react';
import './AddTaskForm.css';

const AddTaskForm = ({ onTaskAdded }) => {
    const [task, setTask] = useState({
        title: '',
        category: '',
        priority: '',
        description: '',
        status: 'inicializada' // estado por defecto
    });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onTaskAdded(task);
        setTask({
            title: '',
            category: '',
            priority: '',
            description: '',
            status: 'inicializada'
        });
    };

    return (
        <div className="add-task-form">
            <h2>Agregar Tarea</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Título de la tarea" value={task.title} onChange={handleChange} />
                <input type="text" name="category" placeholder="Categoría" value={task.category} onChange={handleChange} />
                <input type="text" name="priority" placeholder="Prioridad" value={task.priority} onChange={handleChange} />
                <textarea name="description" placeholder="Descripción" value={task.description} onChange={handleChange} />
                <select name="status" value={task.status} onChange={handleChange}>
                    <option value="inicializada">Inicializada</option>
                    <option value="en proceso">En Proceso</option>
                    <option value="completada">Completada</option>
                </select>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default AddTaskForm;

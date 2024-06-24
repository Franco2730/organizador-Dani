import React, { useState } from 'react';
import './InProgressTasks.css';

const InProgressTasks = ({ tasks, onStatusChange, onArchiveTask }) => {
    const [notes, setNotes] = useState([]);

    const handleStatusChange = (id, status) => {
        onStatusChange(id, status);
    };

    const handleArchiveClick = (id) => {
        onArchiveTask(id);
    };

    const handleAddNote = (index, note) => {
        const updatedNotes = [...notes];
        updatedNotes[index] = note;
        setNotes(updatedNotes);
    };

    return (
        <div className="task-list">
            <h2>Tareas en Proceso</h2>
            {tasks.map((task, index) => (
                <div key={task.id} className="task-card">
                    <h3>{task.title}</h3>
                    <p>Categoría: {task.category}</p>
                    <p>Prioridad: {task.priority}</p>
                    <p>Descripción: {task.description}</p>
                    <div className="status-options">
                        <button onClick={() => handleStatusChange(task.id, 'completed')}>Completada</button>
                        <button onClick={() => handleArchiveClick(task.id)}>Archivar</button>
                        <button onClick={() => handleAddNote(index, prompt('Ingrese la nota'))}>Dejar Nota</button>
                    </div>
                    {notes[index] && (
                        <div className="notes-section">
                            <h4>Notas:</h4>
                            <p>{notes[index]}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default InProgressTasks;

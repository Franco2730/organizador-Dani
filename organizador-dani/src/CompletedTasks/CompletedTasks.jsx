import React, { useState } from 'react';
import './CompletedTasks.css';

const CompletedTasks = ({ tasks, onArchiveTask }) => {
    const [notes, setNotes] = useState([]);

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
            <h2>Tareas Completadas</h2>
            {tasks.map((task, index) => (
                <div key={task.id} className="task-card">
                    <h3>{task.title}</h3>
                    <p>Categoría: {task.category}</p>
                    <p>Prioridad: {task.priority}</p>
                    <p>Descripción: {task.description}</p>
                    <div className="status-options">
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

export default CompletedTasks;

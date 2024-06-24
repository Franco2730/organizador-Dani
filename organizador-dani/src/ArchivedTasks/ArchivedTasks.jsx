import React, { useState } from 'react';
import './ArchivedTasks.css';

const ArchivedTasks = ({ tasks, onDeleteArchivedTask }) => {
    const [notes, setNotes] = useState([]);

    const handleDeleteClick = (id) => {
        onDeleteArchivedTask(id);
    };

    const handleAddNote = (index, note) => {
        const updatedNotes = [...notes];
        updatedNotes[index] = note;
        setNotes(updatedNotes);
    };

    return (
        <div className="task-list">
            <h2>Tareas Archivadas</h2>
            {tasks.map((task, index) => (
                <div key={task.id} className="task-card">
                    <h3>{task.title}</h3>
                    <p>Categoría: {task.category}</p>
                    <p>Prioridad: {task.priority}</p>
                    <p>Descripción: {task.description}</p>
                    <div className="status-options">
                        <button onClick={() => handleDeleteClick(task.id)}>Eliminar</button>
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

export default ArchivedTasks;

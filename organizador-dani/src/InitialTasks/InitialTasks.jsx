import React from 'react';

const InitialTasks = ({ tasks, onStatusChange, onArchive }) => {
    return (
        <div className="task-list">
            <h2>Tareas Inicializadas</h2>
            {tasks.map((task) => (
                <div key={task.id} className="task-card">
                    <h3>{task.title}</h3>
                    <p>Categoría: {task.category}</p>
                    <p>Prioridad: {task.priority}</p>
                    <p>Descripción: {task.description}</p>
                    <div className="status-options">
                        <button onClick={() => onStatusChange(task.id, 'in progress')}>En Proceso</button>
                        <button onClick={() => onStatusChange(task.id, 'completed')}>Completada</button>
                        <button onClick={() => onArchive(task.id)}>Archivar</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InitialTasks;

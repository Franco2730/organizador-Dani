import React from 'react';
import './WelcomeModal.css';

const WelcomeModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Bienvenido a Organi Yépez</h2>
                <p>
                    Nuestra aplicación te permite gestionar tus tareas de manera eficiente. Puedes agregar nuevas tareas,
                    moverlas a en proceso, completarlas o archivarlas. Utiliza las pestañas de navegación para ver las
                    tareas en diferentes estados. Recuerda también que podrás dejar notas en cada una de tus tareas por si necesitas recordar algo importante. Las tareas podrán ser eliminadas una vez se encuentren en la pestaña de archivadas.
                </p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default WelcomeModal;

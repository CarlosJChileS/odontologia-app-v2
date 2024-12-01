import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarCitas.css';

function GestionarCitas() {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        // Cargar las citas desde localStorage
        const storedCitas = JSON.parse(localStorage.getItem('citas')) || [];
        setCitas(storedCitas);
    }, []);

    const eliminarCita = (id) => {
        const confirmarEliminar = window.confirm('¿Estás seguro de que deseas eliminar esta cita?');
        
        if (confirmarEliminar) {
            const updatedCitas = citas.filter(cita => cita.id !== id);
            setCitas(updatedCitas);

            // Guardar las citas actualizadas en localStorage
            localStorage.setItem('citas', JSON.stringify(updatedCitas));

            alert('Cita eliminada');
        }
    };

    return (
        <div className="gestionar-citas-container">
            <h1>Gestionar Citas</h1>
            <ul>
                {citas.length === 0 ? (
                    <li>No hay citas registradas.</li>
                ) : (
                    citas.map(cita => (
                        <li key={cita.id} className="cita-item">
                            <div className="cita-info">
                                <p><strong>Paciente:</strong> {cita.paciente.nombre} ({cita.paciente.email})</p>
                                <p><strong>Fecha:</strong> {cita.fecha}</p>
                            </div>
                            <button onClick={() => eliminarCita(cita.id)} className="eliminar-cita-btn">
                                Eliminar Cita
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default GestionarCitas;

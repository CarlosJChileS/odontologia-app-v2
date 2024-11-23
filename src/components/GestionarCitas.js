// src/components/GestionarCitas.js

import React, { useState } from 'react';
import '../styles/components/GestionarCitas.css';

function GestionarCitas() {
    const [citas, setCitas] = useState([]);
    
    // Simulación de eliminación de citas
    const eliminarCita = (id) => {
        setCitas(citas.filter(cita => cita.id !== id));
        alert('Cita eliminada (simulación)');
    };

    return (
        <div className="gestionar-citas-container">
            <h1>Gestionar Citas</h1>
            <ul>
                {citas.map(cita => (
                    <li key={cita.id}>
                        <p>Paciente: {cita.paciente}</p>
                        <p>Fecha: {cita.fecha}</p>
                        <button onClick={() => eliminarCita(cita.id)}>Eliminar Cita</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GestionarCitas;

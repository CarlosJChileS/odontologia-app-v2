// src/components/GestionarPacientes.js

import React, { useState } from 'react';
import '../styles/components/GestionarPacientes.css';

function GestionarPacientes() {
    const [pacientes, setPacientes] = useState([]);
    
    // Simulación de agregar y eliminar pacientes
    const agregarPaciente = () => {
        // Lógica para agregar un paciente
        alert('Paciente agregado (simulación)');
    };
    
    const eliminarPaciente = (id) => {
        // Lógica para eliminar un paciente
        setPacientes(pacientes.filter(paciente => paciente.id !== id));
        alert('Paciente eliminado (simulación)');
    };

    return (
        <div className="gestionar-pacientes-container">
            <h1>Gestionar Pacientes</h1>
            <button onClick={agregarPaciente}>Agregar Paciente</button>
            <ul>
                {pacientes.map(paciente => (
                    <li key={paciente.id}>
                        {paciente.nombre}
                        <button onClick={() => eliminarPaciente(paciente.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GestionarPacientes;

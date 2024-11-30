import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarPacientes.css';

function GestionarPacientes() {
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        // Cargar pacientes desde localStorage
        const storedPacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
        setPacientes(storedPacientes);
    }, []);

    const agregarPaciente = (nombre) => {
        // Crear un nuevo paciente
        const nuevoPaciente = { id: Date.now(), nombre };

        // Actualizar la lista de pacientes
        const updatedPacientes = [...pacientes, nuevoPaciente];
        setPacientes(updatedPacientes);

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));

        alert('Paciente agregado');
    };

    const eliminarPaciente = (id) => {
        // Eliminar un paciente de la lista
        const updatedPacientes = pacientes.filter(paciente => paciente.id !== id);
        setPacientes(updatedPacientes);

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));

        alert('Paciente eliminado');
    };

    return (
        <div className="gestionar-pacientes-container">
            <h1>Gestionar Pacientes</h1>
            <button onClick={() => agregarPaciente('Nuevo Paciente')}>Agregar Paciente</button>
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

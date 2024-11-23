// src/components/GestionarOdontologos.js

import React, { useState } from 'react';
import '../styles/components/GestionarOdontologos.css';

function GestionarOdontologos() {
    const [odontologos, setOdontologos] = useState([]);
    
    // Simulación de agregar y eliminar odontólogos
    const agregarOdontologo = () => {
        // Lógica para agregar un odontólogo
        alert('Odontólogo agregado (simulación)');
    };
    
    const eliminarOdontologo = (id) => {
        // Lógica para eliminar un odontólogo
        setOdontologos(odontologos.filter(odontologo => odontologo.id !== id));
        alert('Odontólogo eliminado (simulación)');
    };

    return (
        <div className="gestionar-odontologos-container">
            <h1>Gestionar Odontólogos</h1>
            <button onClick={agregarOdontologo}>Agregar Odontólogo</button>
            <ul>
                {odontologos.map(odontologo => (
                    <li key={odontologo.id}>
                        {odontologo.nombre}
                        <button onClick={() => eliminarOdontologo(odontologo.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GestionarOdontologos;

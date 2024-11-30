import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarOdontologos.css';

function GestionarOdontologos() {
    const [odontologos, setOdontologos] = useState([]);

    useEffect(() => {
        // Cargar odontólogos desde localStorage
        const storedOdontologos = JSON.parse(localStorage.getItem('odontologos')) || [];
        setOdontologos(storedOdontologos);
    }, []);

    const agregarOdontologo = (nombre) => {
        // Crear un nuevo odontólogo
        const nuevoOdontologo = { id: Date.now(), nombre };

        // Actualizar la lista de odontólogos
        const updatedOdontologos = [...odontologos, nuevoOdontologo];
        setOdontologos(updatedOdontologos);

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('odontologos', JSON.stringify(updatedOdontologos));

        alert('Odontólogo agregado');
    };

    const eliminarOdontologo = (id) => {
        // Eliminar un odontólogo de la lista
        const updatedOdontologos = odontologos.filter(odontologo => odontologo.id !== id);
        setOdontologos(updatedOdontologos);

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('odontologos', JSON.stringify(updatedOdontologos));

        alert('Odontólogo eliminado');
    };

    return (
        <div className="gestionar-odontologos-container">
            <h1>Gestionar Odontólogos</h1>
            <button onClick={() => agregarOdontologo('Nuevo Odontólogo')}>Agregar Odontólogo</button>
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

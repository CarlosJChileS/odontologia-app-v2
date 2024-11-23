// src/components/EliminarCita.js

import React, { useState, useEffect } from 'react';

function EliminarCita() {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        // Aquí cargarías las citas desde el backend o desde un estado global
        // Ejemplo de citas simuladas
        setCitas([
            { id: 1, fecha: "2024-12-01", hora: "10:00", paciente: "Juan Perez" },
            { id: 2, fecha: "2024-12-02", hora: "11:00", paciente: "Maria Lopez" },
        ]);
    }, []);

    const eliminarCita = (id) => {
        // Lógica para eliminar cita, posiblemente interactuando con el backend
        setCitas(citas.filter(cita => cita.id !== id));
    };

    return (
        <div className="eliminar-cita">
            <h1>Eliminar Cita</h1>
            <ul>
                {citas.map((cita) => (
                    <li key={cita.id}>
                        {cita.fecha} a las {cita.hora} - Paciente: {cita.paciente}
                        <button onClick={() => eliminarCita(cita.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EliminarCita;

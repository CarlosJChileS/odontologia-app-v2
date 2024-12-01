import React, { useState, useEffect } from 'react';

function EliminarCita() {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        // Cargar las citas desde localStorage
        const storedCitas = JSON.parse(localStorage.getItem('citas')) || [];
        setCitas(storedCitas);
    }, []);

    const eliminarCita = (id) => {
        const cita = citas.find(cita => cita.id === id);

        if (cita.historiaClinica) {
            const confirmarEliminar = window.confirm('Esta cita tiene una historia clínica asociada. ¿Estás seguro de que deseas eliminarla también?');
            if (!confirmarEliminar) return;
        }

        const confirmarEliminarCita = window.confirm('¿Estás seguro de que deseas eliminar esta cita?');
        if (!confirmarEliminarCita) return;

        const updatedCitas = citas.filter(cita => cita.id !== id);
        setCitas(updatedCitas);

        // Guardar las citas actualizadas en localStorage
        localStorage.setItem('citas', JSON.stringify(updatedCitas));

        alert('Cita eliminada');
    };

    return (
        <div className="eliminar-cita">
            <h1>Eliminar Cita</h1>
            <ul>
                {citas.map((cita) => (
                    <li key={cita.id}>
                        {cita.fecha} a las {cita.hora} - Paciente: {cita.cedula}
                        <button onClick={() => eliminarCita(cita.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EliminarCita;

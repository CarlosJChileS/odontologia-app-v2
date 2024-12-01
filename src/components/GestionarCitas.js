import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarCitas.css';

function GestionarCitas() {
    const [citas, setCitas] = useState([]);
    const [cedulaPaciente, setCedulaPaciente] = useState('');
    const [fechaCita, setFechaCita] = useState('');
    const [motivoCita, setMotivoCita] = useState('');

    useEffect(() => {
        // Cargar las citas desde localStorage
        const storedCitas = JSON.parse(localStorage.getItem('citas')) || [];
        setCitas(storedCitas);
    }, []);

    // Función para agregar una nueva cita
    const agregarCita = () => {
        if (!cedulaPaciente.trim() || !fechaCita.trim() || !motivoCita.trim()) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const nuevaCita = {
            id: Date.now(),
            cedulaPaciente,
            fechaCita,
            motivoCita,
            historiaClinica: null // Historia clínica no asociada aún
        };

        // Actualizar la lista de citas
        const updatedCitas = [...citas, nuevaCita];
        setCitas(updatedCitas);

        // Guardar la lista de citas en localStorage
        localStorage.setItem('citas', JSON.stringify(updatedCitas));

        alert('Cita agregada');
        setCedulaPaciente('');
        setFechaCita('');
        setMotivoCita('');
    };

    // Función para eliminar una cita
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
            {/* Formulario para agregar una nueva cita */}
            <div className="input-container">
                <input
                    type="text"
                    value={cedulaPaciente}
                    onChange={(e) => setCedulaPaciente(e.target.value)}
                    placeholder="Ingrese la cédula del paciente"
                    aria-label="Cédula del paciente"
                />
                <input
                    type="text"
                    value={fechaCita}
                    onChange={(e) => setFechaCita(e.target.value)}
                    placeholder="Ingrese la fecha de la cita"
                    aria-label="Fecha de la cita"
                />
                <input
                    type="text"
                    value={motivoCita}
                    onChange={(e) => setMotivoCita(e.target.value)}
                    placeholder="Motivo de la cita"
                    aria-label="Motivo de la cita"
                />
                <button onClick={agregarCita}>Agregar Cita</button>
            </div>

            {/* Lista de citas */}
            <ul>
                {citas.length === 0 ? (
                    <li>No hay citas registradas.</li>
                ) : (
                    citas.map(cita => (
                        <li key={cita.id}>
                            <div className="cita-info">
                                <p><strong>Paciente:</strong> {cita.cedulaPaciente}</p>
                                <p><strong>Fecha:</strong> {cita.fechaCita}</p>
                                <p><strong>Motivo de la Cita:</strong> {cita.motivoCita}</p>
                                <p><strong>Historia Clínica:</strong> {cita.historiaClinica ? 'Asociada' : 'Pendiente'}</p>
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

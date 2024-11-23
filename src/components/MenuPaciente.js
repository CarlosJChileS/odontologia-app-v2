// src/components/MenuPaciente.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/MenuPaciente.css';

function MenuPaciente() {
    const navigate = useNavigate();
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        // Simulación de carga de citas desde un JSON local o una API
        fetch('/citasPaciente.json')
            .then((response) => response.json())
            .then((data) => setCitas(data))
            .catch((error) => console.error('Error al cargar citas:', error));
    }, []);

    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    const eliminarCita = (idCita, fechaCita) => {
        const fechaActual = new Date();
        const fechaCitaObj = new Date(fechaCita);
        const diferenciaDias = Math.floor((fechaCitaObj - fechaActual) / (1000 * 60 * 60 * 24));

        if (diferenciaDias >= 2) {
            const nuevasCitas = citas.filter(cita => cita.idCita !== idCita);
            setCitas(nuevasCitas);
            alert('Cita eliminada con éxito');
        } else {
            alert('No puedes eliminar una cita con menos de 2 días de anticipación.');
        }
    };

    return (
        <div className="menu-paciente-container">
            <div className="menu-paciente">
                <h1>Menú Paciente</h1>
                <button onClick={() => navigate('/agendar-cita')}>Agendar Cita</button>
                <button onClick={() => navigate('/calendario')}>Ver Calendario de Citas</button>
                <button onClick={() => navigate('/ver-historias')}>Ver Historias Clínicas</button>
                <button onClick={logout}>Cerrar Sesión</button>
            </div>

            <div className="citas-programadas">
                <h2>Mis Citas</h2>
                {citas.length > 0 ? (
                    <ul>
                        {citas.map((cita) => (
                            <li key={cita.idCita}>
                                <p><strong>Fecha:</strong> {cita.fecha}</p>
                                <p><strong>Hora:</strong> {cita.hora}</p>
                                <p><strong>Ubicación:</strong> {cita.ubicacion}</p>
                                <button onClick={() => eliminarCita(cita.idCita, cita.fecha)}>
                                    Eliminar Cita
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tienes citas programadas.</p>
                )}
            </div>
        </div>
    );
}

export default MenuPaciente;

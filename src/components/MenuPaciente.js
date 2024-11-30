import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/MenuPaciente.css';

function MenuPaciente() {
    const navigate = useNavigate();
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        // Cargar las citas desde localStorage
        const storedCitas = JSON.parse(localStorage.getItem('citasPaciente')) || [];
        setCitas(storedCitas);
    }, []);

    const verHistoriaClinica = (citaId) => {
        // Redirigir a la página de historia clínica correspondiente
        navigate(`/historias-clinicas/${citaId}`);
    };

    return (
        <div className="menu-paciente-container">
            <h1>Menú Paciente</h1>
            <h3>Citas Programadas</h3>
            {citas.length === 0 ? (
                <p>No tienes citas programadas.</p>
            ) : (
                <ul>
                    {citas.map(cita => (
                        <li key={cita.idCita}>
                            <p><strong>Fecha de Cita:</strong> {new Date(cita.fecha).toLocaleString()}</p>
                            <p><strong>Motivo:</strong> {cita.motivo}</p>
                            <button onClick={() => verHistoriaClinica(cita.idCita)}>Ver/Completar Historia Clínica</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MenuPaciente;

// src/components/AgendarCita.js
import React, { useState } from 'react';
import { useRoleRedirect } from '../helpers/redirectByRole';
import '../styles/components/AgendarCita.css';

function AgendarCita() {
    const [cedula, setCedula] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const goBackToMenu = useRoleRedirect();

    const validarSoloNumeros = (event) => {
        if (isNaN(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
            event.preventDefault();
        }
    };

    const guardarCita = (event) => {
        event.preventDefault();

        if (!cedula || !fecha || !hora || !ubicacion || !descripcion) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const nuevaCita = {
            cedula,
            fecha,
            hora,
            ubicacion,
            descripcion,
            idCita: Date.now(),
        };

        let citasPorPaciente = JSON.parse(localStorage.getItem('citasPorPaciente')) || {};

        if (!citasPorPaciente[cedula]) {
            citasPorPaciente[cedula] = [];
        }

        citasPorPaciente[cedula].push(nuevaCita);

        localStorage.setItem('citasPorPaciente', JSON.stringify(citasPorPaciente));

        alert('Cita guardada con éxito');
        setCedula('');
        setFecha('');
        setHora('');
        setUbicacion('');
        setDescripcion('');
    };

    return (
        <div className="container" id="agendarCita">
            <h1>Agendar Cita</h1>
            <form onSubmit={guardarCita}>
                <input
                    type="text"
                    name="cedula"
                    placeholder="Cédula"
                    maxLength="10"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    onKeyPress={validarSoloNumeros}
                    required
                />
                <input
                    type="date"
                    name="fecha"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                />
                <input
                    type="time"
                    name="hora"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    required
                />
                <input
                    type="text"
                    name="ubicacion"
                    placeholder="Ubicación"
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    required
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    rows="4"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Guardar Cita</button>
                <button type="button" onClick={goBackToMenu}>Volver al Menú</button>
            </form>
        </div>
    );
}

export default AgendarCita;

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

    const generarHoras = () => {
        const horas = [];
        for (let h = 8; h < 20; h++) { // Desde las 08:00 hasta las 19:30
            let horaFormato = `${h < 10 ? '0' + h : h}:00`;
            horas.push(horaFormato);
            horaFormato = `${h < 10 ? '0' + h : h}:30`;
            horas.push(horaFormato);
        }
        return horas;
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
                <select
                    name="hora"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    required
                >
                    <option value="">Seleccionar Hora</option>
                    {generarHoras().map((horaOption, index) => (
                        <option key={index} value={horaOption}>
                            {horaOption}
                        </option>
                    ))}
                </select>
                <select
                    name="ubicacion"
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    required
                >
                    <option value="">Seleccionar Ubicación</option>
                    <option value="Manta">Manta</option>
                    <option value="Tosagua">Tosagua</option>
                    <option value="El Carmen">El Carmen</option>
                    <option value="Chone">Chone</option>
                    <option value="Pedernales">Pedernales</option>
                </select>
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

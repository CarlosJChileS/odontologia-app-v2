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

    const validarSoloLetras = (event) => {
        const regex = /^[A-Za-z\s]+$/;
        if (!regex.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
            event.preventDefault();
        }
    };

    const guardarCita = (event) => {
        event.preventDefault();

        if (!cedula || !fecha || !hora || !ubicacion || !descripcion) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const confirmarAgregar = window.confirm("¿Deseas agregar esta cita?");
        if (!confirmarAgregar) return;

        const nuevaCita = {
            cedula,
            fecha,
            hora,
            ubicacion,
            descripcion,
            id: Date.now(),
            historiaClinica: null,  // Inicialmente no tiene historia clínica asignada
        };

        // Cargar las citas desde localStorage
        let citas = JSON.parse(localStorage.getItem('citas')) || [];
        citas.push(nuevaCita);

        // Guardar las citas en localStorage
        localStorage.setItem('citas', JSON.stringify(citas));

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
                {/* Campo para ingresar la cédula */}
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
                    onKeyPress={validarSoloLetras}
                    required
                ></textarea>
                <button type="submit">Guardar Cita</button>
                <button type="button" onClick={goBackToMenu}>Volver al Menú</button>
            </form>
        </div>
    );
}

export default AgendarCita;

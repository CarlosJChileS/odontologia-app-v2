import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/AgendarCita.css';

function AgendarCita() {
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [usuarioRol, setUsuarioRol] = useState(null);
    const [usuarioCedula, setUsuarioCedula] = useState('');
    const [citas, setCitas] = useState([]); // Nuevo estado para las citas
    const navigate = useNavigate();

    // Validar solo números para la cédula
    const validarSoloNumeros = (event) => {
        if (isNaN(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
            event.preventDefault();
        }
    };

    // Validar solo letras para la descripción
    const validarSoloLetras = (event) => {
        const regex = /^[A-Za-z\s]+$/;
        if (!regex.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
            event.preventDefault();
        }
    };

    // Obtener el rol y cédula del usuario desde el sessionStorage
    useEffect(() => {
        const rol = sessionStorage.getItem('usuarioRol');
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuario = usuarios.find(u => u.role === rol);
        if (!rol || !usuario) {
            alert('No estás logueado o el usuario no existe. Inicia sesión primero.');
            navigate('/login');
            return;
        }

        setUsuarioRol(rol);
        if (rol === 'paciente') {
            setUsuarioCedula(usuario.cedula);  // Guardamos la cédula del paciente logueado
        }

        // Cargar las citas desde localStorage y filtrarlas por cédula
        const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
        const citasFiltradas = citasGuardadas.filter(cita => cita.cedula === usuario.cedula); // Filtrar las citas por cédula
        setCitas(citasFiltradas);
    }, [navigate]);

    const guardarCita = (event) => {
        event.preventDefault();

        if (!usuarioCedula || !fecha || !hora || !ubicacion || !descripcion) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const confirmarAgregar = window.confirm("¿Deseas agregar esta cita?");
        if (!confirmarAgregar) return;

        const nuevaCita = {
            cedula: usuarioCedula,  // Usamos la cédula del paciente logueado
            fecha,
            hora,
            ubicacion,
            descripcion,
            id: Date.now(),
            historiaClinica: null,  // Inicialmente no tiene historia clínica asignada
        };

        // Cargar las citas desde localStorage
        let citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
        citasGuardadas.push(nuevaCita);

        // Guardar las citas en localStorage
        localStorage.setItem('citas', JSON.stringify(citasGuardadas));

        // Filtrar nuevamente las citas por cédula
        const citasFiltradas = citasGuardadas.filter(cita => cita.cedula === usuarioCedula);

        // Actualizar el estado de las citas
        setCitas(citasFiltradas);

        alert('Cita guardada con éxito');
        setFecha('');
        setHora('');
        setUbicacion('');
        setDescripcion('');
    };

    // Generar las horas disponibles para la cita
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

    // Eliminar una cita
    const eliminarCita = (idCita) => {
        const confirmarEliminar = window.confirm("¿Estás seguro de que deseas eliminar esta cita?");
        if (!confirmarEliminar) return;

        // Filtrar las citas para eliminar la seleccionada
        const citasFiltradas = citas.filter(cita => cita.id !== idCita);

        // Actualizar el localStorage con las citas filtradas
        localStorage.setItem('citas', JSON.stringify(citasFiltradas));

        // Actualizar el estado de las citas
        setCitas(citasFiltradas);

        alert("Cita eliminada con éxito");
    };

    // Volver al menú según el rol
    const volverAlMenu = () => {
        switch (usuarioRol) {
            case 'admin':
                navigate('/menu-administrador');
                break;
            case 'paciente':
                navigate('/menu-paciente');
                break;
            case 'odontologo':
                navigate('/menu-odontologo');
                break;
            default:
                alert('Rol no reconocido. Contacte al administrador.');
                break;
        }
    };

    return (
        <div className="container" id="agendarCita">
            <h1>Agendar Cita</h1>
            <form onSubmit={guardarCita}>
                {/* Cédula: Si el usuario es paciente, se llena automáticamente, si no, puede escribirla */}
                <input
                    type="text"
                    name="cedula"
                    placeholder="Cédula"
                    maxLength="10"
                    value={usuarioCedula}
                    onChange={(e) => setUsuarioCedula(e.target.value)}
                    onKeyPress={validarSoloNumeros}
                    required
                    disabled={usuarioRol === 'paciente'} // Desactiva el campo si es paciente
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
                <button type="button" onClick={volverAlMenu}>Volver al Menú</button>
            </form>

            <div id="citasContenedor">
                <h2>Citas Agendadas</h2>
                <ul>
                    {citas.map(cita => (
                        <li key={cita.id}>
                            <p>{`Fecha: ${cita.fecha}, Hora: ${cita.hora}, Ubicación: ${cita.ubicacion}, Descripción: ${cita.descripcion}`}</p>
                            <button onClick={() => eliminarCita(cita.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AgendarCita;

import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarOdontologos.css';

function GestionarOdontologos() {
    const [odontologos, setOdontologos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');  // Campo para la cédula
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [mostrarContrasenas, setMostrarContrasenas] = useState({}); // Estado para mostrar contraseñas individuales

    useEffect(() => {
        try {
            // Cargar odontólogos desde localStorage
            const storedOdontologos = JSON.parse(localStorage.getItem('odontologos')) || [];
            setOdontologos(storedOdontologos);
        } catch (err) {
            setError('Hubo un error al cargar los odontólogos.');
            console.error(err);
        }
    }, []);

    const agregarOdontologo = () => {
        if (!nombre.trim() || !cedula.trim() || !email.trim() || !password.trim()) {
            alert('Por favor ingresa todos los datos (nombre, cédula, correo, contraseña).');
            return;
        }

        // Crear un nuevo odontólogo con los datos ingresados y rol 'odontologo'
        const nuevoOdontologo = { 
            id: Date.now(), 
            nombre, 
            cedula, // Asociamos la cédula
            email, 
            password,
            role: 'odontologo'  // Asignamos el rol 'odontologo' por defecto
        };

        // Actualizar la lista de odontólogos
        const updatedOdontologos = [...odontologos, nuevoOdontologo];
        setOdontologos(updatedOdontologos);

        // Guardar la lista actualizada en localStorage
        try {
            localStorage.setItem('odontologos', JSON.stringify(updatedOdontologos));

            // También agregar el odontólogo a la lista global de usuarios
            const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
            usuariosGuardados.push(nuevoOdontologo);
            localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
        } catch (err) {
            setError('Hubo un error al guardar los odontólogos.');
            console.error(err);
        }

        // Limpiar los campos de entrada
        setNombre('');
        setCedula('');
        setEmail('');
        setPassword('');

        alert('Odontólogo agregado');
    };

    const eliminarOdontologo = (id) => {
        const updatedOdontologos = odontologos.filter(odontologo => odontologo.id !== id);
        setOdontologos(updatedOdontologos);

        // Guardar la lista actualizada en localStorage
        try {
            localStorage.setItem('odontologos', JSON.stringify(updatedOdontologos));

            // Eliminar el odontólogo de la lista global de usuarios
            const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
            const updatedUsuarios = usuariosGuardados.filter(user => user.id !== id);
            localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));
        } catch (err) {
            setError('Hubo un error al eliminar el odontólogo.');
            console.error(err);
        }

        alert('Odontólogo eliminado');
    };

    const toggleMostrarContrasena = (id) => {
        setMostrarContrasenas(prevState => ({
            ...prevState,
            [id]: !prevState[id], // Cambiar el estado solo para el odontólogo con el id correspondiente
        }));
    };

    return (
        <div className="gestionar-odontologos-container">
            <h1>Gestionar Odontólogos</h1>
            {error && <div className="error">{error}</div>}

            {/* Formulario para agregar un odontólogo */}
            <div className="input-container">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingrese el nombre del odontólogo"
                    aria-label="Nombre del odontólogo"
                />
                <input
                    type="text"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Ingrese la cédula del odontólogo"
                    aria-label="Cédula del odontólogo"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingrese el correo del odontólogo"
                    aria-label="Correo electrónico del odontólogo"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese la contraseña del odontólogo"
                    aria-label="Contraseña del odontólogo"
                />
                <button onClick={agregarOdontologo} disabled={!nombre.trim() || !cedula.trim() || !email.trim() || !password.trim()}>
                    Agregar Odontólogo
                </button>
            </div>

            {/* Contenedor de la lista de odontólogos con scroll */}
            <div className="odontologos-lista">
                <ul>
                    {odontologos.length === 0 ? (
                        <li>No hay odontólogos registrados.</li>
                    ) : (
                        odontologos.map(odontologo => (
                            <li key={odontologo.id}>
                                <div>
                                    <strong>{odontologo.nombre}</strong> - {odontologo.email}
                                    <span className="role-badge">{` - Rol: ${odontologo.role}`}</span> {/* Mostrar el rol */}
                                </div>
                                <div>
                                    <strong>Cédula: </strong>{odontologo.cedula} {/* Mostrar la cédula */}
                                </div>
                                <div>
                                    {/* Mostrar/Ocultar contraseña */}
                                    <strong>Contraseña: </strong>
                                    {mostrarContrasenas[odontologo.id] ? odontologo.password : '********'}
                                    <button onClick={() => toggleMostrarContrasena(odontologo.id)} aria-label="Mostrar/Ocultar Contraseña">
                                        {mostrarContrasenas[odontologo.id] ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                </div>
                                <button onClick={() => eliminarOdontologo(odontologo.id)} aria-label={`Eliminar ${odontologo.nombre}`}>
                                    Eliminar
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default GestionarOdontologos;

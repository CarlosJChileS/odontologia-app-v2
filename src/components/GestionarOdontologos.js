import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarOdontologos.css';

function GestionarOdontologos() {
    const [odontologos, setOdontologos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [mostrarContrasena, setMostrarContrasena] = useState(false);

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
        if (!nombre.trim() || !email.trim() || !password.trim()) {
            alert('Por favor ingresa todos los datos (nombre, correo, contraseña).');
            return;
        }

        // Crear un nuevo odontólogo con los datos ingresados
        const nuevoOdontologo = { id: Date.now(), nombre, email, password };

        // Actualizar la lista de odontólogos
        const updatedOdontologos = [...odontologos, nuevoOdontologo];
        setOdontologos(updatedOdontologos);

        // Guardar la lista actualizada en localStorage
        try {
            localStorage.setItem('odontologos', JSON.stringify(updatedOdontologos));
        } catch (err) {
            setError('Hubo un error al guardar los odontólogos.');
            console.error(err);
        }

        // Limpiar los campos de entrada
        setNombre('');
        setEmail('');
        setPassword('');

        alert('Odontólogo agregado');
    };

    const eliminarOdontologo = (id) => {
        // Eliminar un odontólogo de la lista
        const updatedOdontologos = odontologos.filter(odontologo => odontologo.id !== id);
        setOdontologos(updatedOdontologos);

        // Guardar la lista actualizada en localStorage
        try {
            localStorage.setItem('odontologos', JSON.stringify(updatedOdontologos));
        } catch (err) {
            setError('Hubo un error al eliminar el odontólogo.');
            console.error(err);
        }

        alert('Odontólogo eliminado');
    };

    const toggleMostrarContrasena = () => {
        setMostrarContrasena(!mostrarContrasena);
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
                <button onClick={agregarOdontologo} disabled={!nombre.trim() || !email.trim() || !password.trim()}>
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
                                </div>
                                <div>
                                    {/* Mostrar/Ocultar contraseña */}
                                    <strong>Contraseña: </strong>
                                    {mostrarContrasena ? odontologo.password : '********'}
                                    <button onClick={toggleMostrarContrasena} aria-label="Mostrar/Ocultar Contraseña">
                                        {mostrarContrasena ? 'Ocultar' : 'Mostrar'}
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

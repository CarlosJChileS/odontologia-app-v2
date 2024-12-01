import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarAdministradores.css';

function GestionarAdministradores() {
    const [administradores, setAdministradores] = useState([]);
    const [nombre, setNombre] = useState('');  // Estado para el nombre
    const [email, setEmail] = useState('');    // Estado para el correo
    const [password, setPassword] = useState(''); // Estado para la contraseña
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
    const [error, setError] = useState(null); // Manejar posibles errores

    useEffect(() => {
        try {
            // Cargar administradores desde localStorage
            const storedAdministradores = JSON.parse(localStorage.getItem('administradores')) || [];
            setAdministradores(storedAdministradores);
        } catch (err) {
            setError('Hubo un error al cargar los administradores.');
            console.error(err);
        }
    }, []);

    const agregarAdministrador = () => {
        if (!nombre.trim() || !email.trim() || !password.trim()) {
            alert('Por favor ingresa todos los datos del administrador.');
            return;
        }

        // Crear un nuevo administrador
        const nuevoAdministrador = { id: Date.now(), nombre, email, password };

        // Actualizar la lista de administradores
        const updatedAdministradores = [...administradores, nuevoAdministrador];
        setAdministradores(updatedAdministradores);

        // Guardar la lista actualizada en localStorage
        try {
            localStorage.setItem('administradores', JSON.stringify(updatedAdministradores));
        } catch (err) {
            setError('Hubo un error al guardar los administradores.');
            console.error(err);
        }

        // Limpiar los campos de entrada
        setNombre('');
        setEmail('');
        setPassword('');

        alert('Administrador agregado');
    };

    const eliminarAdministrador = (id) => {
        const confirmarEliminar = window.confirm('¿Estás seguro de que deseas eliminar este administrador?');
        
        if (confirmarEliminar) {
            // Eliminar un administrador de la lista
            const updatedAdministradores = administradores.filter(admin => admin.id !== id);
            setAdministradores(updatedAdministradores);

            // Guardar la lista actualizada en localStorage
            try {
                localStorage.setItem('administradores', JSON.stringify(updatedAdministradores));
            } catch (err) {
                setError('Hubo un error al eliminar el administrador.');
                console.error(err);
            }

            alert('Administrador eliminado');
        }
    };

    return (
        <div className="gestionar-administradores-container">
            <h1>Gestionar Administradores</h1>
            {error && <div className="error">{error}</div>}

            {/* Formulario para agregar un nuevo administrador */}
            <div className="input-container">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingrese el nombre del administrador"
                    aria-label="Nombre del administrador"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingrese el correo electrónico del administrador"
                    aria-label="Correo electrónico"
                />

                {/* Cambiar el input de contraseña a un textarea con scroll */}
                <textarea
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese la contraseña del administrador"
                    rows="3"
                    style={{
                        resize: 'none', 
                        width: '100%', 
                        fontSize: '1rem', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        border: '1px solid #ddd',
                        fontFamily: 'Arial, sans-serif',
                        display: 'block',
                    }}
                    aria-label="Contraseña"
                    disabled={!showPassword}
                />

                <label>
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    Ver contraseña
                </label>

                <button 
                    onClick={agregarAdministrador} 
                    disabled={!nombre.trim() || !email.trim() || !password.trim()}
                >
                    Agregar Administrador
                </button>
            </div>

            {/* Lista de administradores */}
            <ul>
                {administradores.length === 0 ? (
                    <li>No hay administradores registrados.</li>
                ) : (
                    administradores.map(admin => (
                        <li key={admin.id}>
                            {admin.nombre} ({admin.email})
                            <button onClick={() => eliminarAdministrador(admin.id)} aria-label={`Eliminar ${admin.nombre}`}>
                                Eliminar
                            </button>
                            {/* Mostrar la contraseña del administrador con scroll */}
                            <div className="admin-password">
                                <strong>Contraseña: </strong> 
                                <textarea
                                    value={admin.password}
                                    readOnly
                                    rows="3"
                                    style={{
                                        resize: 'none',
                                        width: '100%',
                                        fontSize: '1rem',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                        fontFamily: 'Arial, sans-serif',
                                    }}
                                />
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default GestionarAdministradores;

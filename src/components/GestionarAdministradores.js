import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarAdministradores.css';

function GestionarAdministradores() {
    const [administradores, setAdministradores] = useState([]);
    const [nombre, setNombre] = useState('');  // Estado para el nombre
    const [cedula, setCedula] = useState('');  // Estado para la cédula
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
        if (!nombre.trim() || !cedula.trim() || !email.trim() || !password.trim()) {
            alert('Por favor ingresa todos los datos del administrador.');
            return;
        }

        // Crear un nuevo administrador con rol 'admin'
        const nuevoAdministrador = { 
            id: Date.now(), 
            nombre, 
            cedula, // Asociamos la cédula
            email, 
            password, 
            role: 'admin'  // Asignamos el rol 'admin' por defecto
        };

        // Actualizar la lista de administradores
        const updatedAdministradores = [...administradores, nuevoAdministrador];
        setAdministradores(updatedAdministradores);

        // Guardar la lista de administradores actualizada en localStorage
        try {
            localStorage.setItem('administradores', JSON.stringify(updatedAdministradores));

            // También agregamos el nuevo administrador en la lista global de usuarios
            const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
            usuariosGuardados.push(nuevoAdministrador);  // Agregar al array global de usuarios
            localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
        } catch (err) {
            setError('Hubo un error al guardar los administradores.');
            console.error(err);
        }

        // Limpiar los campos de entrada
        setNombre('');
        setCedula('');
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

            // Guardar la lista de administradores actualizada en localStorage
            try {
                localStorage.setItem('administradores', JSON.stringify(updatedAdministradores));

                // También eliminamos el administrador de la lista global de usuarios
                const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
                const updatedUsuarios = usuariosGuardados.filter(user => user.id !== id);
                localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));
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
                    type="text"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Ingrese la cédula del administrador"
                    aria-label="Cédula del administrador"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingrese el correo electrónico del administrador"
                    aria-label="Correo electrónico"
                />

                {/* Campo de contraseña */}
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese la contraseña del administrador"
                    aria-label="Contraseña"
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
                    disabled={!nombre.trim() || !cedula.trim() || !email.trim() || !password.trim()}
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
                            <div>
                                <strong>{admin.nombre}</strong> ({admin.email})
                                <span className="cedula">Cédula: {admin.cedula}</span> {/* Mostrar la cédula */}
                                <span className="role-badge">{` - Rol: ${admin.role}`}</span> {/* Mostrar el rol */}
                            </div>
                            <div>
                                {/* Mostrar la contraseña del administrador con scroll */}
                                <strong>Contraseña: </strong> 
                                <input
                                    type="text"
                                    value={admin.password}
                                    readOnly
                                    className="password-field"
                                />
                            </div>
                            <button onClick={() => eliminarAdministrador(admin.id)} aria-label={`Eliminar ${admin.nombre}`}>
                                Eliminar
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default GestionarAdministradores;

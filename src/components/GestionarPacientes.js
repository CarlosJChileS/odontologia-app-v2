import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarPacientes.css';

function GestionarPacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState(''); // Campo para la cédula
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const storedPacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
            setPacientes(storedPacientes);
        } catch (err) {
            setError('Hubo un error al cargar los pacientes.');
            console.error(err);
        }
    }, []);

    const agregarPaciente = () => {
        if (!nombre.trim() || !cedula.trim() || !email.trim() || !password.trim()) {
            alert('Por favor ingresa todos los datos del paciente.');
            return;
        }

        // Crear un nuevo paciente con rol por defecto
        const nuevoPaciente = { 
            id: Date.now(), 
            nombre, 
            cedula, // Asociamos la cédula
            email, 
            password,
            role: 'paciente',  // Asignamos el rol 'paciente' por defecto
            showPassword: false // Inicializamos la contraseña como oculta
        };

        const updatedPacientes = [...pacientes, nuevoPaciente];
        setPacientes(updatedPacientes);

        try {
            // Guardar los pacientes actualizados en localStorage
            localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));

            // También guardamos el paciente en el array global de usuarios
            const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
            usuariosGuardados.push(nuevoPaciente);  // Agregamos el paciente a la lista de usuarios
            localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
        } catch (err) {
            setError('Hubo un error al guardar los pacientes.');
            console.error(err);
        }

        // Limpiar los campos de entrada
        setNombre('');
        setCedula('');
        setEmail('');
        setPassword('');

        alert('Paciente agregado');
    };

    const eliminarPaciente = (id) => {
        const updatedPacientes = pacientes.filter(paciente => paciente.id !== id);
        setPacientes(updatedPacientes);

        try {
            localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
            // Eliminamos también de la lista global de usuarios
            const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
            const updatedUsuarios = usuariosGuardados.filter(user => user.id !== id);
            localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));
        } catch (err) {
            setError('Hubo un error al eliminar el paciente.');
            console.error(err);
        }

        alert('Paciente eliminado');
    };

    const toggleMostrarContrasena = (id) => {
        setPacientes(pacientes.map(paciente => 
            paciente.id === id ? { ...paciente, showPassword: !paciente.showPassword } : paciente
        ));
    };

    return (
        <div className="gestionar-pacientes-container">
            <h1>Gestionar Pacientes</h1>
            {error && <div className="error">{error}</div>}

            {/* Formulario de entrada */}
            <div className="input-container">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del paciente"
                    aria-label="Nombre del paciente"
                />
                <input
                    type="text"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Cédula del paciente"
                    aria-label="Cédula del paciente"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    aria-label="Correo electrónico"
                />
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    aria-label="Contraseña"
                />
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    Ver contraseña
                </label>
                <button onClick={agregarPaciente} disabled={!nombre.trim() || !cedula.trim() || !email.trim() || !password.trim()}>
                    Agregar Paciente
                </button>
            </div>

            {/* Lista de pacientes */}
            <ul>
                {pacientes.length === 0 ? (
                    <li>No hay pacientes registrados.</li>
                ) : (
                    pacientes.map(paciente => (
                        <li key={paciente.id} className="paciente-item">
                            <div className="paciente-info">
                                <span className="paciente-nombre">{paciente.nombre}</span>
                                <span className="paciente-cedula">{paciente.cedula}</span> {/* Mostrar la cédula */}
                                <span className="paciente-email">{paciente.email}</span>
                                <span className="paciente-role">{`Rol: ${paciente.role}`}</span> {/* Mostrar el rol */}
                                <button onClick={() => eliminarPaciente(paciente.id)} className="eliminar-btn">
                                    Eliminar
                                </button>
                            </div>
                            <div className="paciente-contrasena">
                                <span>{paciente.showPassword ? paciente.password : '******'}</span>
                                <button 
                                    onClick={() => toggleMostrarContrasena(paciente.id)} 
                                    className="toggle-contrasena-btn"
                                >
                                    {paciente.showPassword ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default GestionarPacientes;

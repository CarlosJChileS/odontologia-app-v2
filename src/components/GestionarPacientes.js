import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarPacientes.css';

function GestionarPacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [nombre, setNombre] = useState('');
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
        if (!nombre.trim() || !email.trim() || !password.trim()) {
            alert('Por favor ingresa todos los datos del paciente.');
            return;
        }

        const nuevoPaciente = { id: Date.now(), nombre, email, password };
        const updatedPacientes = [...pacientes, nuevoPaciente];
        setPacientes(updatedPacientes);

        try {
            localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
        } catch (err) {
            setError('Hubo un error al guardar los pacientes.');
            console.error(err);
        }

        setNombre('');
        setEmail('');
        setPassword('');

        alert('Paciente agregado');
    };

    const eliminarPaciente = (id) => {
        const updatedPacientes = pacientes.filter(paciente => paciente.id !== id);
        setPacientes(updatedPacientes);

        try {
            localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
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
                <button onClick={agregarPaciente} disabled={!nombre.trim() || !email.trim() || !password.trim()}>
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
                                <span className="paciente-email">{paciente.email}</span>
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

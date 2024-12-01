import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarPacientes.css';

function GestionarPacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [nombre, setNombre] = useState('');  // Estado para el nombre
    const [email, setEmail] = useState('');    // Estado para el correo
    const [password, setPassword] = useState(''); // Estado para la contraseña
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña al agregar
    const [error, setError] = useState(null); // Manejar posibles errores

    // Cargar pacientes desde localStorage cuando el componente se monta
    useEffect(() => {
        try {
            const storedPacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
            setPacientes(storedPacientes);
        } catch (err) {
            setError('Hubo un error al cargar los pacientes.');
            console.error(err);
        }
    }, []);

    // Función para agregar un nuevo paciente
    const agregarPaciente = () => {
        if (!nombre.trim() || !email.trim() || !password.trim()) {
            alert('Por favor ingresa todos los datos del paciente.');
            return;
        }

        // Crear un nuevo paciente
        const nuevoPaciente = { id: Date.now(), nombre, email, password };

        // Actualizar la lista de pacientes
        const updatedPacientes = [...pacientes, nuevoPaciente];
        setPacientes(updatedPacientes);

        // Guardar la lista actualizada en localStorage
        try {
            localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
        } catch (err) {
            setError('Hubo un error al guardar los pacientes.');
            console.error(err);
        }

        // Limpiar los campos de entrada
        setNombre('');
        setEmail('');
        setPassword('');

        alert('Paciente agregado');
    };

    // Función para eliminar un paciente
    const eliminarPaciente = (id) => {
        const updatedPacientes = pacientes.filter(paciente => paciente.id !== id);
        setPacientes(updatedPacientes);

        // Guardar la lista actualizada en localStorage
        try {
            localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
        } catch (err) {
            setError('Hubo un error al eliminar el paciente.');
            console.error(err);
        }

        alert('Paciente eliminado');
    };

    // Alternar visibilidad de la contraseña
    const toggleMostrarContrasena = (id) => {
        setPacientes(pacientes.map(paciente => 
            paciente.id === id ? { ...paciente, showPassword: !paciente.showPassword } : paciente
        ));
    };

    return (
        <div className="gestionar-pacientes-container">
            <h1>Gestionar Pacientes</h1>
            {error && <div className="error">{error}</div>}

            {/* Formulario para agregar paciente */}
            <div className="input-container">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingrese el nombre del paciente"
                    aria-label="Nombre del paciente"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingrese el correo electrónico del paciente"
                    aria-label="Correo electrónico"
                />
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese la contraseña del paciente"
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
                        <li key={paciente.id}>
                            <div className="paciente-info">
                                {paciente.nombre} ({paciente.email})
                                <button onClick={() => eliminarPaciente(paciente.id)} aria-label={`Eliminar ${paciente.nombre}`}>
                                    Eliminar
                                </button>
                            </div>
                            <div className="paciente-contrasena">
                                <span>{paciente.showPassword ? paciente.password : '******'}</span>
                                <button onClick={() => toggleMostrarContrasena(paciente.id)} aria-label={`Mostrar/Ocultar contraseña`}>
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

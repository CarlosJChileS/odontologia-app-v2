import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarPacientes.css';

function GestionarPacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
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

        const nuevoPaciente = {
            id: Date.now(),
            nombre,
            cedula,
            email,
            password,
            role: 'paciente',
            showPassword: false
        };

        const updatedPacientes = [...pacientes, nuevoPaciente];
        setPacientes(updatedPacientes);

        try {
            localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));

            const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
            usuariosGuardados.push(nuevoPaciente);
            localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
        } catch (err) {
            setError('Hubo un error al guardar los pacientes.');
            console.error(err);
        }

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

            <div className="input-container">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del paciente"
                />
                <input
                    type="text"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Cédula del paciente"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                />
                <button onClick={agregarPaciente} disabled={!nombre.trim() || !cedula.trim() || !email.trim() || !password.trim()}>
                    Agregar Paciente
                </button>
            </div>

            <div className="pacientes-lista">
                <ul>
                    {pacientes.length === 0 ? (
                        <li>No hay pacientes registrados.</li>
                    ) : (
                        pacientes.map(paciente => (
                            <li key={paciente.id}>
                                <div>
                                    <strong>{paciente.nombre}</strong> - {paciente.email}
                                </div>
                                <div>
                                    <strong>Cédula: </strong>{paciente.cedula}
                                </div>
                                <div>
                                    <strong>Contraseña: </strong>
                                    {paciente.showPassword ? paciente.password : '********'}
                                    <button onClick={() => toggleMostrarContrasena(paciente.id)}>
                                        {paciente.showPassword ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                </div>
                                <button onClick={() => eliminarPaciente(paciente.id)}>Eliminar</button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default GestionarPacientes;

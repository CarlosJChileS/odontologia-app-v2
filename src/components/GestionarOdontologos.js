import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarOdontologos.css';

function GestionarOdontologos() {
    const [odontologos, setOdontologos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [mostrarContrasenas, setMostrarContrasenas] = useState({});

    useEffect(() => {
        try {
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

        const nuevoOdontologo = {
            id: Date.now(),
            nombre,
            cedula,
            email,
            password,
            role: 'odontologo'
        };

        const updatedOdontologos = [...odontologos, nuevoOdontologo];
        setOdontologos(updatedOdontologos);

        try {
            localStorage.setItem('odontologos', JSON.stringify(updatedOdontologos));

            const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
            usuariosGuardados.push(nuevoOdontologo);
            localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
        } catch (err) {
            setError('Hubo un error al guardar los odontólogos.');
            console.error(err);
        }

        setNombre('');
        setCedula('');
        setEmail('');
        setPassword('');

        alert('Odontólogo agregado');
    };

    const eliminarOdontologo = (id) => {
        const updatedOdontologos = odontologos.filter(odontologo => odontologo.id !== id);
        setOdontologos(updatedOdontologos);

        try {
            localStorage.setItem('odontologos', JSON.stringify(updatedOdontologos));

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
            [id]: !prevState[id]
        }));
    };

    return (
        <div className="gestionar-odontologos-container">
            <h1>Gestionar Odontólogos</h1>
            {error && <div className="error">{error}</div>}

            <div className="input-container">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingrese el nombre del odontólogo"
                />
                <input
                    type="text"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Ingrese la cédula del odontólogo"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingrese el correo del odontólogo"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese la contraseña del odontólogo"
                />
                <button onClick={agregarOdontologo} disabled={!nombre.trim() || !cedula.trim() || !email.trim() || !password.trim()}>
                    Agregar Odontólogo
                </button>
            </div>

            <div className="odontologos-lista">
                <ul>
                    {odontologos.length === 0 ? (
                        <li>No hay odontólogos registrados.</li>
                    ) : (
                        odontologos.map(odontologo => (
                            <li key={odontologo.id}>
                                <div>
                                    <strong>{odontologo.nombre}</strong> - {odontologo.email}
                                    <span className="role-badge">{` - Rol: ${odontologo.role}`}</span>
                                </div>
                                <div>
                                    <strong>Cédula: </strong>{odontologo.cedula}
                                </div>
                                <div>
                                    <strong>Contraseña: </strong>
                                    {mostrarContrasenas[odontologo.id] ? odontologo.password : '********'}
                                    <button onClick={() => toggleMostrarContrasena(odontologo.id)}>
                                        {mostrarContrasenas[odontologo.id] ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                </div>
                                <button onClick={() => eliminarOdontologo(odontologo.id)}>Eliminar</button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default GestionarOdontologos;

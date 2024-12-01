import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarAdministradores.css';

function GestionarAdministradores() {
    const [administradores, setAdministradores] = useState([]);
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
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

        const nuevoAdministrador = { 
            id: Date.now(), 
            nombre, 
            cedula, 
            email, 
            password, 
            role: 'admin' 
        };

        const updatedAdministradores = [...administradores, nuevoAdministrador];
        setAdministradores(updatedAdministradores);

        try {
            localStorage.setItem('administradores', JSON.stringify(updatedAdministradores));

            const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
            usuariosGuardados.push(nuevoAdministrador);
            localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
        } catch (err) {
            setError('Hubo un error al guardar los administradores.');
            console.error(err);
        }

        setNombre('');
        setCedula('');
        setEmail('');
        setPassword('');

        alert('Administrador agregado');
    };

    const eliminarAdministrador = (id) => {
        const confirmarEliminar = window.confirm('¿Estás seguro de que deseas eliminar este administrador?');
        
        if (confirmarEliminar) {
            const updatedAdministradores = administradores.filter(admin => admin.id !== id);
            setAdministradores(updatedAdministradores);

            try {
                localStorage.setItem('administradores', JSON.stringify(updatedAdministradores));

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

            <ul>
                {administradores.length === 0 ? (
                    <li>No hay administradores registrados.</li>
                ) : (
                    administradores.map(admin => (
                        <li key={admin.id}>
                            <div>
                                <strong>{admin.nombre}</strong> ({admin.email})
                                <span className="cedula">Cédula: {admin.cedula}</span>
                                <span className="role-badge">{` - Rol: ${admin.role}`}</span>
                            </div>
                            <div>
                                <strong>Contraseña: </strong>
                                <input
                                    type="text"
                                    value={admin.password}
                                    readOnly
                                    className="password-field"
                                />
                            </div>
                            <button onClick={() => eliminarAdministrador(admin.id)}>
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

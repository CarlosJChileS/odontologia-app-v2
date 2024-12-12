import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/MenuAdministrador.css';

function MenuAdministrador() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cedula, setCedula] = useState('');
    const [role, setRole] = useState('paciente');
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        setUsuarios(storedUsuarios);

        const usuarioLogueado = JSON.parse(sessionStorage.getItem('user'));
        if (usuarioLogueado) {
            setCedula(usuarioLogueado.cedula);
        }
    }, []);

    const crearUsuario = () => {
        const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóú\s]+$/;
        if (!nombre || !email || !password || !cedula) {
            alert('Por favor ingresa todos los datos del nuevo usuario.');
            return;
        }

        const nuevoUsuario = { 
            id: Date.now(), 
            nombre, 
            email, 
            password, 
            cedula,  
            role 
        };

        const updatedUsuarios = [...usuarios, nuevoUsuario];
        setUsuarios(updatedUsuarios);
        localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));

        setNombre('');
        setEmail('');
        setPassword('');
        setCedula('');
        alert('Usuario creado correctamente.');
    };

    const eliminarUsuario = (id) => {
        const updatedUsuarios = usuarios.filter(user => user.id !== id);
        setUsuarios(updatedUsuarios);
        localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));
        alert('Usuario eliminado.');
    };

    const logout = () => {
        sessionStorage.clear();
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="menu-administrador">
            <h1>Menú Administrador</h1>

            <div className="input-container">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del usuario"
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
                <input
                    type="text"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Cédula del usuario"
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="paciente">Paciente</option>
                    <option value="odontologo">Odontólogo</option>
                    <option value="admin">Admin</option>
                </select>
                <button onClick={crearUsuario}>Crear Usuario</button>
            </div>

            <div className="usuarios-lista">
                <h2>Usuarios Registrados</h2>
                <ul>
                    {usuarios.length === 0 ? (
                        <li>No hay usuarios registrados.</li>
                    ) : (
                        usuarios.map(user => (
                            <li key={user.id}>
                                <div>
                                    <strong>{user.nombre}</strong> - {user.email} - {user.role}
                                    <button onClick={() => eliminarUsuario(user.id)}>Eliminar</button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <button onClick={logout}>Cerrar Sesión</button>
        </div>
    );
}

export default MenuAdministrador;

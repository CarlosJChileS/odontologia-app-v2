import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('paciente'); // Por defecto, paciente
    const navigate = useNavigate();

    // Maneja la creación de nuevos usuarios
    const crearUsuario = () => {
        if (!nombre || !email || !password) {
            alert('Por favor ingresa todos los datos del nuevo usuario.');
            return;
        }

        // Recuperamos los usuarios existentes en localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Creamos un nuevo usuario
        const nuevoUsuario = { 
            id: Date.now(), 
            nombre, 
            email, 
            password, 
            role 
        };

        // Agregamos el nuevo usuario al array de usuarios
        usuarios.push(nuevoUsuario);

        // Guardamos los usuarios actualizados en localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Limpiamos los campos del formulario
        setNombre('');
        setEmail('');
        setPassword('');
        setRole('paciente');

        alert('Usuario creado correctamente.');
    };

    return (
        <div className="admin-dashboard">
            <h1>Panel de Administración</h1>
            
            {/* Formulario para crear un nuevo usuario */}
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
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="paciente">Paciente</option>
                    <option value="odontologo">Odontólogo</option>
                    <option value="admin">Admin</option>
                </select>
                <button onClick={crearUsuario}>Crear Usuario</button>
            </div>
        </div>
    );
}

export default AdminDashboard;

// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Simulación de consulta de usuario (esto será reemplazado con una base de datos)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            sessionStorage.setItem('usuarioRol', user.role);

            // Redirigir según el rol
            switch (user.role) {
                case 'admin':
                    navigate('/menu-administrador');
                    break;
                case 'paciente':
                    navigate('/menu-paciente');
                    break;
                case 'odontologo':
                    navigate('/menu-odontologo');
                    break;
                default:
                    alert('Rol no reconocido. Contacte al administrador.');
                    break;
            }
        } else {
            alert('Credenciales incorrectas. Intente de nuevo.');
        }
    };

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
}

export default Login;

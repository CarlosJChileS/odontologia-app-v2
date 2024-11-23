// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Función para manejar el inicio de sesión
    const handleLogin = (role) => (e) => {
        e.preventDefault();

        // Simulación de validación de credenciales basada en el rol
        switch (role) {
            case 'admin':
                sessionStorage.setItem('usuarioRol', 'admin');
                navigate('/menu-administrador');
                break;
            case 'paciente':
                sessionStorage.setItem('usuarioRol', 'paciente');
                navigate('/menu-paciente');
                break;
            case 'odontologo':
                sessionStorage.setItem('usuarioRol', 'odontologo');
                navigate('/menu-odontologo');
                break;
            default:
                alert('Credenciales incorrectas. Intente de nuevo.');
                break;
        }
    };

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <form>
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
                <div className="login-buttons">
                    <button type="button" onClick={handleLogin('paciente')}>
                        Iniciar sesión como Paciente
                    </button>
                    <button type="button" onClick={handleLogin('odontologo')}>
                        Iniciar sesión como Odontólogo
                    </button>
                    <button type="button" onClick={() => navigate('/register')}>
                        Registrarse
                    </button>
                    <button
                        type="button"
                        className="admin-login"
                        onClick={handleLogin('admin')}
                    >
                        Iniciar como Administrador
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;

// src/components/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        // Aquí guarda el nuevo usuario en localStorage o en un servicio de backend
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ email, password, role: 'paciente' });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        navigate('/login');
    };

    return (
        <div className="register-container">
            <h1>Registrar</h1>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default Register;

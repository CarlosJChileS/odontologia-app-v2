import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Simulación de usuarios (sin validaciones)
        const users = [
            { email: 'admin@ejemplo.com', password: 'admin123', role: 'admin' },
            { email: 'paciente@ejemplo.com', password: 'paciente123', role: 'paciente' },
            { email: 'odontologo@ejemplo.com', password: 'odontologo123', role: 'odontologo' }
        ];

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Usar localStorage para persistir el rol
            localStorage.setItem('usuarioRol', user.role);

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
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="login-buttons">
                    <button type="submit">Iniciar Sesión</button>
                    <button
                        type="button"
                        className="register-btn"
                        onClick={() => navigate('/register')}
                    >
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;

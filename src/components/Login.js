import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Si no hay usuarios en localStorage, agregamos algunos de prueba
        if (!localStorage.getItem('usuarios')) {
            const usuariosEjemplo = [
                { email: 'admin@ejemplo.com', password: 'admin123', role: 'admin' },
                { email: 'paciente@ejemplo.com', password: 'paciente123', role: 'paciente' },
                { email: 'odontologo@ejemplo.com', password: 'odontologo123', role: 'odontologo' }
            ];
            localStorage.setItem('usuarios', JSON.stringify(usuariosEjemplo));
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        // Recupera los usuarios desde localStorage (ahora en un array global)
        const users = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Busca al usuario en los datos
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Guardar el rol en sessionStorage
            sessionStorage.setItem('usuarioRol', user.role);

            // Redirige a la ruta correspondiente según el rol
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
            alert('Credenciales incorrectas. Intenta de nuevo.');
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

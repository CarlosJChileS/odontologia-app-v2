import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
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

    const handleLogin = () => {
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = usuariosGuardados.find(user => user.email === email && user.password === password);

        if (usuario) {
            sessionStorage.setItem('usuario', JSON.stringify(usuario));
            sessionStorage.setItem('rol', usuario.role);

            if (usuario.role === 'admin') {
                navigate('/admin-dashboard');
            } else if (usuario.role === 'odontologo') {
                navigate('/odontologo-dashboard');
            } else if (usuario.role === 'paciente') {
                navigate('/paciente-dashboard');
            }
        } else {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            {error && <div className="error">{error}</div>}

            <div className="input-container">
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
                <button onClick={handleLogin}>Iniciar Sesión</button>
            </div>
        </div>
    );
}

export default Login;

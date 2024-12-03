import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Lista de correos privilegiados
    const correosPrivilegiados = [
        { email: 'admin@ejemplo.com', password: 'admin123', role: 'admin' },
        { email: 'paciente@ejemplo.com', password: 'paciente123', role: 'paciente', cedula: '1234567890' },
        { email: 'odontologo@ejemplo.com', password: 'odontologo123', role: 'odontologo' }
    ];

    useEffect(() => {
        // Si no hay usuarios en localStorage, agregamos algunos de prueba
        if (!localStorage.getItem('usuarios')) {
            const usuariosEjemplo = [
                { email: 'user1@ejemplo.com', password: 'user123', role: 'paciente', cedula: '9876543210' },
                { email: 'user2@ejemplo.com', password: 'user123', role: 'odontologo' }
            ];
            localStorage.setItem('usuarios', JSON.stringify(usuariosEjemplo));
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        // Primero verificamos si el correo pertenece a los correos privilegiados
        const userPrivilegiado = correosPrivilegiados.find(
            (u) => u.email === email && u.password === password
        );

        if (userPrivilegiado) {
            // Guardar el rol y cédula del usuario privilegiado en sessionStorage
            sessionStorage.setItem('usuarioRol', userPrivilegiado.role);
            if (userPrivilegiado.cedula) {
                sessionStorage.setItem('usuarioCedula', userPrivilegiado.cedula); // Guardamos la cédula
            }

            // Redirigir según el rol del usuario privilegiado
            switch (userPrivilegiado.role) {
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
            return;
        }

        // Si no es un usuario privilegiado, buscamos en el localStorage
        const users = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Buscar al usuario en los datos
        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
            // Guardar el rol y cédula en sessionStorage
            sessionStorage.setItem('usuarioRol', user.role);
            if (user.cedula) {
                sessionStorage.setItem('usuarioCedula', user.cedula); // Guardamos la cédula
            }

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
                </div>
            </form>
        </div>
    );
}

export default Login;

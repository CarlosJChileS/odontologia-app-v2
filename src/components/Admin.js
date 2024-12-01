import React, { useState } from 'react';

function Admin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Función para agregar un odontólogo
    const addOdontologo = (e) => {
        e.preventDefault();

        // Validación: Verificar si los campos están vacíos
        if (!email || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        // Validar formato del correo electrónico
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setError("El correo electrónico no es válido.");
            return;
        }

        // Confirmar la acción
        const confirmarAgregar = window.confirm("¿Estás seguro de que deseas agregar a este odontólogo?");
        if (!confirmarAgregar) return;

        // Obtener los usuarios actuales de localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Verificar si el correo ya está registrado
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            setError("Este correo electrónico ya está registrado.");
            return;
        }

        // Agregar el nuevo odontólogo
        users.push({ email, password, role: 'odontologo' });
        localStorage.setItem('users', JSON.stringify(users));

        // Feedback positivo
        setSuccess('Odontólogo añadido exitosamente.');
        setEmail('');
        setPassword('');
        setError('');
    };

    return (
        <div className="admin-container">
            <h1>Panel de Administrador</h1>

            {/* Mensajes de error y éxito */}
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={addOdontologo}>
                <input
                    type="email"
                    placeholder="Correo electrónico del odontólogo"
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
                <button type="submit">Agregar Odontólogo</button>
            </form>
        </div>
    );
}

export default Admin;

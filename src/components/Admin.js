import React, { useState } from 'react';

function Admin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const addOdontologo = (e) => {
        e.preventDefault();

        const confirmarAgregar = window.confirm("¿Estás seguro de que deseas agregar a este odontólogo?");
        if (!confirmarAgregar) return;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ email, password, role: 'odontologo' });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Odontólogo añadido exitosamente.');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="admin-container">
            <h1>Panel de Administrador</h1>
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

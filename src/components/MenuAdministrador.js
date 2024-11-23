// src/components/MenuAdministrador.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/MenuAdministrador.css';

function MenuAdministrador() {
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    return (
        <div className="menu-administrador">
            <h1>Menú Administrador</h1>
            <button onClick={() => navigate('/gestionar-pacientes')}>Gestionar Pacientes</button>
            <button onClick={() => navigate('/gestionar-odontologos')}>Gestionar Odontólogos</button>
            <button onClick={() => navigate('/gestionar-citas')}>Gestionar Citas</button>
            <button onClick={logout}>Cerrar Sesión</button>
        </div>
    );
}

export default MenuAdministrador;

// src/components/MenuOdontologo.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/MenuOdontologo.css';

function MenuOdontologo() {
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    return (
        <div className="menu-odontologo">
            <h1>Menú Odontólogo</h1>
            <button onClick={() => navigate('/gestionar-historias')}>Gestionar Historias Clínicas</button>
            <button onClick={() => navigate('/ver-historias')}>Ver Historias Clínicas</button>
            <button onClick={() => navigate('/calendario')}>Ver Calendario de Citas</button>
            <button onClick={logout}>Cerrar Sesión</button>
        </div>
    );
}

export default MenuOdontologo;

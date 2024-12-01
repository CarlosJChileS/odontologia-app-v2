import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/MenuPaciente.css';

function MenuPaciente() {
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    return (
        <div className="menu-paciente-container">
            <div className="menu-paciente">
                <h1>Menú Paciente</h1>
                <button onClick={() => navigate('/agendar-cita')}>Agendar Cita</button>
                <button onClick={() => navigate('/calendario')}>Ver Calendario de Citas</button>
                <button onClick={() => navigate('/ver-historias')}>Ver Historias Clínicas</button>
                <button onClick={logout}>Cerrar Sesión</button>
            </div>
        </div>
    );
}

export default MenuPaciente;

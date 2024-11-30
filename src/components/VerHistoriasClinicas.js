import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/VerHistoriasClinicas.css';

function VerHistoriasClinicas() {
    const [historias, setHistorias] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Al cargar el componente, intentamos obtener las historias desde el localStorage
        const historiasGuardadas = JSON.parse(localStorage.getItem('historiasClinicas'));
        if (historiasGuardadas) {
            setHistorias(historiasGuardadas);
            setMensaje('Historias clínicas cargadas desde el almacenamiento local');
        } else {
            setMensaje('No hay historias clínicas disponibles.');
        }
    }, []);

    const volverAlMenu = () => {
        const rol = sessionStorage.getItem('usuarioRol');
        if (rol === 'paciente') {
            navigate('/menu-paciente');
        } else if (rol === 'odontologo') {
            navigate('/menu-odontologo');
        } else if (rol === 'admin') {
            navigate('/menu-administrador');
        } else {
            navigate('/login'); // Redirige al login si no hay rol definido
        }
    };

    return (
        <div className="ver-historias-container">
            <h1>Historias Clínicas</h1>
            {mensaje && <p className="mensaje">{mensaje}</p>}
            <div className="button-group">
                <button onClick={volverAlMenu} className="volver-button">Volver al Menú</button>
            </div>
            {historias.length === 0 && !mensaje ? (
                <p>No hay historias clínicas disponibles.</p>
            ) : (
                <ul className="historia-list">
                    {historias.map((historia, index) => (
                        <li key={index} className="historia-item">
                            <p><strong>Cédula:</strong> {historia.cedula}</p>
                            <p><strong>Tipo de Sangre:</strong> {historia.tipoSangre}</p>
                            <p><strong>Motivo de Consulta:</strong> {historia.motivoConsulta}</p>
                            <p><strong>Enfermedad Actual:</strong> {historia.enfermedadActual}</p>
                            <p><strong>Antecedentes Patológicos Personales:</strong> {historia.antecedentesPatoPersonales}</p>
                            <p><strong>Constantes Vitales:</strong> {historia.constantesVitales}</p>
                            <p><strong>Sistema Estomatognático:</strong> {historia.sistemaEstomatognatico}</p>
                            <p><strong>Odontograma:</strong> {historia.odontograma}</p>
                            <p><strong>Indicadores de Salud Bucal:</strong> {historia.indicadoresSaludBucal}</p>
                            <p><strong>Índices CPO:</strong> {historia.indicesCPO}</p>
                            <p><strong>Diagnóstico:</strong> {historia.diagnostico}</p>
                            <p><strong>Procedimientos:</strong> {historia.procedimientos}</p>
                            <p><strong>Evolución:</strong> {historia.evolucion}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default VerHistoriasClinicas;

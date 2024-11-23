// src/components/GestionarHistoriasClinicas.js

import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarHistoriasClinicas.css';

function GestionarHistoriasClinicas() {
    const [historias, setHistorias] = useState([]);
    const [selectedHistoria, setSelectedHistoria] = useState(null);

    useEffect(() => {
        // Cargar datos de historias clínicas desde un archivo JSON o una API (simulado aquí)
        fetch('/historiasClinicas.json')
            .then((response) => response.json())
            .then((data) => setHistorias(data))
            .catch((error) => console.error('Error al cargar historias clínicas:', error));
    }, []);

    const seleccionarHistoria = (historia) => {
        setSelectedHistoria(historia);
    };

    const cerrarDetalles = () => {
        setSelectedHistoria(null);
    };

    return (
        <div className="gestionar-historias-container">
            <h1>Gestionar Historias Clínicas</h1>
            <div className="historias-lista">
                {historias.length > 0 ? (
                    <ul>
                        {historias.map((historia) => (
                            <li key={historia.idHistoriaClinica}>
                                <p><strong>Cédula:</strong> {historia.cedula}</p>
                                <p><strong>Motivo de Consulta:</strong> {historia.motivoConsulta}</p>
                                <button onClick={() => seleccionarHistoria(historia)}>Ver Detalles</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay historias clínicas disponibles.</p>
                )}
            </div>

            {selectedHistoria && (
                <div className="historia-detalles">
                    <h2>Detalles de la Historia Clínica</h2>
                    <p><strong>Cédula:</strong> {selectedHistoria.cedula}</p>
                    <p><strong>Tipo de Sangre:</strong> {selectedHistoria.tipoSangre}</p>
                    <p><strong>Motivo de Consulta:</strong> {selectedHistoria.motivoConsulta}</p>
                    <p><strong>Diagnóstico:</strong> {selectedHistoria.diagnostico}</p>
                    <p><strong>Procedimientos:</strong> {selectedHistoria.procedimientos}</p>
                    <p><strong>Evolución:</strong> {selectedHistoria.evolucion}</p>
                    <button onClick={cerrarDetalles}>Cerrar</button>
                </div>
            )}
        </div>
    );
}

export default GestionarHistoriasClinicas;

import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarHistoriasClinicas.css';

function GestionarHistoriasClinicas() {
    const [historias, setHistorias] = useState([]);
    const [selectedHistoria, setSelectedHistoria] = useState(null);

    useEffect(() => {
        // Cargar historias clínicas desde localStorage
        const storedHistorias = JSON.parse(localStorage.getItem('historiasClinicas')) || [];
        setHistorias(storedHistorias);
    }, []);

    const agregarHistoriaClinica = (historia) => {
        // Agregar la historia clínica al listado
        const nuevaHistoria = { ...historia, idHistoriaClinica: Date.now() };

        // Actualizar las historias clínicas en el estado
        const updatedHistorias = [...historias, nuevaHistoria];
        setHistorias(updatedHistorias);

        // Guardar las historias clínicas actualizadas en localStorage
        localStorage.setItem('historiasClinicas', JSON.stringify(updatedHistorias));

        alert('Historia clínica guardada');
    };

    const eliminarHistoriaClinica = (id) => {
        // Eliminar la historia clínica de la lista
        const updatedHistorias = historias.filter(historia => historia.idHistoriaClinica !== id);
        setHistorias(updatedHistorias);

        // Guardar las historias clínicas actualizadas en localStorage
        localStorage.setItem('historiasClinicas', JSON.stringify(updatedHistorias));

        alert('Historia clínica eliminada');
    };

    const seleccionarHistoria = (historia) => {
        setSelectedHistoria(historia);
    };

    const cerrarDetalles = () => {
        setSelectedHistoria(null);
    };

    return (
        <div className="gestionar-historias-container">
            <h1>Gestionar Historias Clínicas</h1>
            <button onClick={() => agregarHistoriaClinica({ cedula: '123', tipoSangre: 'A+', motivoConsulta: 'Dolor', diagnostico: 'Caries', procedimientos: 'Extracción' })}>
                Agregar Historia Clínica
            </button>
            <ul>
                {historias.map(historia => (
                    <li key={historia.idHistoriaClinica}>
                        <p><strong>Cédula:</strong> {historia.cedula}</p>
                        <p><strong>Motivo de Consulta:</strong> {historia.motivoConsulta}</p>
                        <button onClick={() => seleccionarHistoria(historia)}>Ver Detalles</button>
                        <button onClick={() => eliminarHistoriaClinica(historia.idHistoriaClinica)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            {selectedHistoria && (
                <div className="historia-detalles">
                    <h2>Detalles de la Historia Clínica</h2>
                    <p><strong>Cédula:</strong> {selectedHistoria.cedula}</p>
                    <p><strong>Tipo de Sangre:</strong> {selectedHistoria.tipoSangre}</p>
                    <p><strong>Motivo de Consulta:</strong> {selectedHistoria.motivoConsulta}</p>
                    <p><strong>Diagnóstico:</strong> {selectedHistoria.diagnostico}</p>
                    <p><strong>Procedimientos:</strong> {selectedHistoria.procedimientos}</p>
                    <button onClick={cerrarDetalles}>Cerrar</button>
                </div>
            )}
        </div>
    );
}

export default GestionarHistoriasClinicas;

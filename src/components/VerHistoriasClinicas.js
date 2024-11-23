// src/components/VerHistoriasClinicas.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/VerHistoriasClinicas.css';

function VerHistoriasClinicas() {
    const [historias, setHistorias] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const cargarJSON = () => {
        fetch('/historiasClinicas.json')
            .then((response) => {
                if (!response.ok) throw new Error('Error al cargar los datos desde JSON');
                return response.json();
            })
            .then((data) => {
                setHistorias(data);
                setMensaje('Historias cargadas desde JSON');
            })
            .catch((error) => {
                console.error("Error al cargar historias clínicas desde JSON:", error);
                setMensaje("No se pudieron cargar las historias clínicas desde JSON.");
            });
    };

    const cargarXML = () => {
        fetch('/historiasClinicas.xml')
            .then((response) => response.text())
            .then((data) => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                const historiasArray = Array.from(xml.getElementsByTagName("historiaClinica")).map(historia => ({
                    cedula: historia.getElementsByTagName("cedula")[0].textContent,
                    tipoSangre: historia.getElementsByTagName("tipoSangre")[0].textContent,
                    motivoConsulta: historia.getElementsByTagName("motivoConsulta")[0].textContent,
                    enfermedadActual: historia.getElementsByTagName("enfermedadActual")[0].textContent,
                    antecedentesPatoPersonales: historia.getElementsByTagName("antecedentesPatoPersonales")[0].textContent,
                    constantesVitales: historia.getElementsByTagName("constantesVitales")[0].textContent,
                    sistemaEstomatognatico: historia.getElementsByTagName("sistemaEstomatognatico")[0].textContent,
                    odontograma: historia.getElementsByTagName("odontograma")[0].textContent,
                    indicadoresSaludBucal: historia.getElementsByTagName("indicadoresSaludBucal")[0].textContent,
                    indicesCPO: historia.getElementsByTagName("indicesCPO")[0].textContent,
                    diagnostico: historia.getElementsByTagName("diagnostico")[0].textContent,
                    procedimientos: historia.getElementsByTagName("procedimientos")[0].textContent,
                    evolucion: historia.getElementsByTagName("evolucion")[0].textContent
                }));
                setHistorias(historiasArray);
                setMensaje('Historias cargadas desde XML');
            })
            .catch((error) => {
                console.error("Error al cargar historias clínicas desde XML:", error);
                setMensaje("No se pudieron cargar las historias clínicas desde XML.");
            });
    };

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
                <button onClick={cargarJSON}>Cargar desde JSON</button>
                <button onClick={cargarXML}>Cargar desde XML</button>
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

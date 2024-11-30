import React, { useState, useEffect } from 'react';
import '../styles/components/HistoriasClinicas.css';

function HistoriasClinicas() {
    const [historiasClinicas, setHistoriasClinicas] = useState([]);
    const [historia, setHistoria] = useState({
        cedula: '',
        tipoSangre: '',
        motivoConsulta: '',
        enfermedadActual: '',
        antecedentesPatoPersonales: '',
        constantesVitales: '',
        sistemaEstomatognatico: '',
        odontograma: '',
        indicadoresSaludBucal: '',
        indicesCPO: '',
        diagnostico: '',
        procedimientos: '',
        evolucion: ''
    });
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        // Cargar las historias clínicas desde localStorage
        const storedHistorias = JSON.parse(localStorage.getItem('historiasClinicas')) || [];
        setHistoriasClinicas(storedHistorias);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHistoria((prevHistoria) => ({
            ...prevHistoria,
            [name]: value,
        }));
    };

    const guardarHistoriaClinica = (e) => {
        e.preventDefault();

        // Validación: Verificar que todos los campos estén completos
        if (Object.values(historia).some(value => value === '')) {
            setMensaje('Por favor, complete todos los campos.');
            return;
        }

        // Crear la nueva historia clínica con un ID único
        const nuevaHistoria = { ...historia, idHistoriaClinica: Date.now() };
        const updatedHistorias = [...historiasClinicas, nuevaHistoria];
        setHistoriasClinicas(updatedHistorias);

        // Guardar en localStorage
        localStorage.setItem('historiasClinicas', JSON.stringify(updatedHistorias));

        // Limpiar el formulario
        setHistoria({
            cedula: '',
            tipoSangre: '',
            motivoConsulta: '',
            enfermedadActual: '',
            antecedentesPatoPersonales: '',
            constantesVitales: '',
            sistemaEstomatognatico: '',
            odontograma: '',
            indicadoresSaludBucal: '',
            indicesCPO: '',
            diagnostico: '',
            procedimientos: '',
            evolucion: ''
        });
        setMensaje("Historia clínica guardada exitosamente");

        // Exportar a XML la nueva historia clínica guardada
        exportarHistoriaClinicaXML(nuevaHistoria);
    };

    const exportarHistoriaClinicaXML = (historia) => {
        const xmlString = `
            <historiaClinica>
                <cedula>${historia.cedula}</cedula>
                <tipoSangre>${historia.tipoSangre}</tipoSangre>
                <motivoConsulta>${historia.motivoConsulta}</motivoConsulta>
                <enfermedadActual>${historia.enfermedadActual}</enfermedadActual>
                <antecedentesPatoPersonales>${historia.antecedentesPatoPersonales}</antecedentesPatoPersonales>
                <constantesVitales>${historia.constantesVitales}</constantesVitales>
                <sistemaEstomatognatico>${historia.sistemaEstomatognatico}</sistemaEstomatognatico>
                <odontograma>${historia.odontograma}</odontograma>
                <indicadoresSaludBucal>${historia.indicadoresSaludBucal}</indicadoresSaludBucal>
                <indicesCPO>${historia.indicesCPO}</indicesCPO>
                <diagnostico>${historia.diagnostico}</diagnostico>
                <procedimientos>${historia.procedimientos}</procedimientos>
                <evolucion>${historia.evolucion}</evolucion>
            </historiaClinica>
        `;

        const blob = new Blob([xmlString], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `HistoriaClinica_${historia.cedula}.xml`;
        link.click();
    };

    return (
        <div className="container">
            <h1>Historia Clínica</h1>
            {mensaje && <p className="mensaje">{mensaje}</p>}
            
            <form onSubmit={guardarHistoriaClinica}>
                <input
                    type="text"
                    name="cedula"
                    placeholder="Cédula del Paciente"
                    value={historia.cedula}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="tipoSangre"
                    placeholder="Tipo de Sangre"
                    value={historia.tipoSangre}
                    onChange={handleInputChange}
                    required
                />
                <textarea name="motivoConsulta" placeholder="Motivo de la Consulta" onChange={handleInputChange} value={historia.motivoConsulta} required />
                <textarea name="enfermedadActual" placeholder="Enfermedad Actual" onChange={handleInputChange} value={historia.enfermedadActual} required />
                <textarea name="antecedentesPatoPersonales" placeholder="Antecedentes Patológicos Personales" onChange={handleInputChange} value={historia.antecedentesPatoPersonales} required />
                <textarea name="constantesVitales" placeholder="Constantes Vitales" onChange={handleInputChange} value={historia.constantesVitales} required />
                <textarea name="sistemaEstomatognatico" placeholder="Sistema Estomatognático" onChange={handleInputChange} value={historia.sistemaEstomatognatico} required />
                <textarea name="odontograma" placeholder="Odontograma" onChange={handleInputChange} value={historia.odontograma} required />
                <textarea name="indicadoresSaludBucal" placeholder="Indicadores de Salud Bucal" onChange={handleInputChange} value={historia.indicadoresSaludBucal} required />
                <input type="text" name="indicesCPO" placeholder="Índices CPO" onChange={handleInputChange} value={historia.indicesCPO} required />
                <textarea name="diagnostico" placeholder="Diagnóstico" onChange={handleInputChange} value={historia.diagnostico} required />
                <textarea name="procedimientos" placeholder="Procedimientos" onChange={handleInputChange} value={historia.procedimientos} required />
                <textarea name="evolucion" placeholder="Evolución" onChange={handleInputChange} value={historia.evolucion} required />
                <button type="submit">Guardar Historia Clínica</button>
            </form>
        </div>
    );
}

export default HistoriasClinicas;

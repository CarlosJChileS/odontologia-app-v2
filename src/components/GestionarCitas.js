import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarHistoriasClinicas.css';

function GestionarHistoriasClinicas() {
    const [historias, setHistorias] = useState([]);
    const [citas, setCitas] = useState([]);
    const [cedulaPaciente, setCedulaPaciente] = useState('');
    const [tipoSangre, setTipoSangre] = useState('');
    const [motivoConsulta, setMotivoConsulta] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [procedimientos, setProcedimientos] = useState('');

    useEffect(() => {
        // Cargar citas e historias clínicas desde localStorage
        const storedHistorias = JSON.parse(localStorage.getItem('historiasClinicas')) || [];
        const storedCitas = JSON.parse(localStorage.getItem('citas')) || [];
        setHistorias(storedHistorias);
        setCitas(storedCitas);
    }, []);

    const agregarHistoriaClinica = () => {
        if (!cedulaPaciente.trim() || !tipoSangre.trim() || !motivoConsulta.trim() || !diagnostico.trim() || !procedimientos.trim()) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const nuevaHistoria = {
            idHistoriaClinica: Date.now(),
            cedula: cedulaPaciente,
            tipoSangre,
            motivoConsulta,
            diagnostico,
            procedimientos,
        };

        // Buscar la cita pendiente de historia clínica
        const citaIndex = citas.findIndex(cita => cita.cedula === cedulaPaciente && !cita.historiaClinica);
        if (citaIndex === -1) {
            alert('No se encontró una cita pendiente para esta cédula');
            return;
        }

        // Asociar la historia clínica a la cita
        citas[citaIndex].historiaClinica = nuevaHistoria;

        // Actualizar las citas en el localStorage
        const updatedCitas = [...citas];
        const updatedHistorias = [...historias, nuevaHistoria];
        setCitas(updatedCitas);
        setHistorias(updatedHistorias);

        localStorage.setItem('citas', JSON.stringify(updatedCitas));
        localStorage.setItem('historiasClinicas', JSON.stringify(updatedHistorias));

        alert('Historia clínica creada y asociada a la cita');
        setCedulaPaciente('');
        setTipoSangre('');
        setMotivoConsulta('');
        setDiagnostico('');
        setProcedimientos('');
    };

    return (
        <div className="container" id="gestionarHistorias">
            <h1>Gestionar Historias Clínicas</h1>
            <form onSubmit={(e) => { e.preventDefault(); agregarHistoriaClinica(); }}>
                <input
                    type="text"
                    name="cedulaPaciente"
                    placeholder="Cédula del Paciente"
                    value={cedulaPaciente}
                    onChange={(e) => setCedulaPaciente(e.target.value)}
                    required
                />
                <input
                    type="text"
                    name="tipoSangre"
                    placeholder="Tipo de Sangre"
                    value={tipoSangre}
                    onChange={(e) => setTipoSangre(e.target.value)}
                    required
                />
                <textarea
                    name="motivoConsulta"
                    placeholder="Motivo de la Consulta"
                    value={motivoConsulta}
                    onChange={(e) => setMotivoConsulta(e.target.value)}
                    required
                ></textarea>
                <textarea
                    name="diagnostico"
                    placeholder="Diagnóstico"
                    value={diagnostico}
                    onChange={(e) => setDiagnostico(e.target.value)}
                    required
                ></textarea>
                <textarea
                    name="procedimientos"
                    placeholder="Procedimientos"
                    value={procedimientos}
                    onChange={(e) => setProcedimientos(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Guardar Historia Clínica</button>
            </form>
        </div>
    );
}

export default GestionarHistoriasClinicas;

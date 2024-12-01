import React, { useState, useEffect } from 'react';
import '../styles/components/GestionarHistoriasClinicas.css';

function GestionarHistoriasClinicas() {
    const [historias, setHistorias] = useState([]);
    const [citas, setCitas] = useState([]);
    const [cedulaPaciente, setCedulaPaciente] = useState('');
    const [tipoSangre, setTipoSangre] = useState('');
    const [motivoConsulta, setMotivoConsulta] = useState('');
    const [enfermedadActual, setEnfermedadActual] = useState('');
    const [antecedentesPatoPersonales, setAntecedentesPatoPersonales] = useState('');
    const [constantesVitales, setConstantesVitales] = useState('');
    const [sistemaEstomatognatico, setSistemaEstomatognatico] = useState('');
    const [odontograma, setOdontograma] = useState('');
    const [indicadoresSaludBucal, setIndicadoresSaludBucal] = useState('');
    const [indicesCPO, setIndicesCPO] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [procedimientos, setProcedimientos] = useState('');
    const [evolucion, setEvolucion] = useState('');
    const [selectedCita, setSelectedCita] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(null); // Para controlar qué formulario se debe mostrar

    useEffect(() => {
        // Cargar historias clínicas y citas desde localStorage
        const storedHistorias = JSON.parse(localStorage.getItem('historiasClinicas')) || [];
        const storedCitas = JSON.parse(localStorage.getItem('citas')) || [];
        setHistorias(storedHistorias);
        setCitas(storedCitas);
    }, []);

    // Función para agregar una historia clínica
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
            enfermedadActual,
            antecedentesPatoPersonales,
            constantesVitales,
            sistemaEstomatognatico,
            odontograma,
            indicadoresSaludBucal,
            indicesCPO,
            diagnostico,
            procedimientos,
            evolucion
        };

        // Buscar la cita pendiente de historia clínica
        const citaIndex = citas.findIndex(cita => cita.cedulaPaciente === cedulaPaciente && !cita.historiaClinica);
        if (citaIndex === -1) {
            alert('No se encontró una cita pendiente para esta cédula');
            return;
        }

        // Asociar la historia clínica a la cita
        citas[citaIndex].historiaClinica = nuevaHistoria;

        // Actualizar citas e historias clínicas en el estado y localStorage
        const updatedCitas = [...citas];
        const updatedHistorias = [...historias, nuevaHistoria];
        setCitas(updatedCitas);
        setHistorias(updatedHistorias);

        localStorage.setItem('citas', JSON.stringify(updatedCitas));
        localStorage.setItem('historiasClinicas', JSON.stringify(updatedHistorias));

        alert('Historia clínica creada y asociada a la cita');
        resetFormulario();
    };

    // Resetear el formulario de agregar historia clínica
    const resetFormulario = () => {
        setCedulaPaciente('');
        setTipoSangre('');
        setMotivoConsulta('');
        setEnfermedadActual('');
        setAntecedentesPatoPersonales('');
        setConstantesVitales('');
        setSistemaEstomatognatico('');
        setOdontograma('');
        setIndicadoresSaludBucal('');
        setIndicesCPO('');
        setDiagnostico('');
        setProcedimientos('');
        setEvolucion('');
    };

    // Función para mostrar el formulario de agregar historia clínica
    const mostrarFormularioAgregar = () => {
        setMostrarFormulario('agregar'); // Mostrar el formulario para agregar historia clínica
    };

    // Función para mostrar la lista de citas y opciones de eliminación
    const mostrarCitas = () => {
        setMostrarFormulario('citas'); // Mostrar las citas
    };

    // Función para mostrar el formulario de eliminar historia clínica
    const mostrarFormularioEliminar = () => {
        setMostrarFormulario('eliminar'); // Mostrar el formulario para eliminar historia clínica
    };

    return (
        <div className="gestionar-historias-container">
            <h1>Gestionar Historias Clínicas</h1>

            {/* Opciones para elegir qué hacer */}
            {mostrarFormulario === null && (
                <div>
                    <button onClick={mostrarFormularioAgregar}>Agregar Historia Clínica</button>
                    <button onClick={mostrarFormularioEliminar}>Eliminar Historia Clínica</button>
                    <button onClick={mostrarCitas}>Ver Citas</button>
                </div>
            )}

            {/* Mostrar el formulario de agregar historia clínica */}
            {mostrarFormulario === 'agregar' && (
                <div>
                    <h2>Formulario para Agregar Historia Clínica</h2>
                    {/* Formulario para agregar una historia clínica */}
                    <div className="input-container">
                        <input
                            type="text"
                            value={cedulaPaciente}
                            onChange={(e) => setCedulaPaciente(e.target.value)}
                            placeholder="Ingrese la cédula del paciente"
                            aria-label="Cédula del paciente"
                        />
                        <input
                            type="text"
                            value={tipoSangre}
                            onChange={(e) => setTipoSangre(e.target.value)}
                            placeholder="Tipo de sangre"
                            aria-label="Tipo de sangre"
                        />
                        <input
                            type="text"
                            value={motivoConsulta}
                            onChange={(e) => setMotivoConsulta(e.target.value)}
                            placeholder="Motivo de consulta"
                            aria-label="Motivo de consulta"
                        />
                        <input
                            type="text"
                            value={enfermedadActual}
                            onChange={(e) => setEnfermedadActual(e.target.value)}
                            placeholder="Enfermedad actual"
                            aria-label="Enfermedad actual"
                        />
                        <input
                            type="text"
                            value={antecedentesPatoPersonales}
                            onChange={(e) => setAntecedentesPatoPersonales(e.target.value)}
                            placeholder="Antecedentes Patológicos Personales"
                            aria-label="Antecedentes Patológicos Personales"
                        />
                        <input
                            type="text"
                            value={constantesVitales}
                            onChange={(e) => setConstantesVitales(e.target.value)}
                            placeholder="Constantes vitales"
                            aria-label="Constantes vitales"
                        />
                        <input
                            type="text"
                            value={sistemaEstomatognatico}
                            onChange={(e) => setSistemaEstomatognatico(e.target.value)}
                            placeholder="Sistema Estomatognático"
                            aria-label="Sistema Estomatognático"
                        />
                        <input
                            type="text"
                            value={odontograma}
                            onChange={(e) => setOdontograma(e.target.value)}
                            placeholder="Odontograma"
                            aria-label="Odontograma"
                        />
                        <input
                            type="text"
                            value={indicadoresSaludBucal}
                            onChange={(e) => setIndicadoresSaludBucal(e.target.value)}
                            placeholder="Indicadores de salud bucal"
                            aria-label="Indicadores de salud bucal"
                        />
                        <input
                            type="text"
                            value={indicesCPO}
                            onChange={(e) => setIndicesCPO(e.target.value)}
                            placeholder="Índices CPO"
                            aria-label="Índices CPO"
                        />
                        <input
                            type="text"
                            value={diagnostico}
                            onChange={(e) => setDiagnostico(e.target.value)}
                            placeholder="Diagnóstico"
                            aria-label="Diagnóstico"
                        />
                        <input
                            type="text"
                            value={procedimientos}
                            onChange={(e) => setProcedimientos(e.target.value)}
                            placeholder="Procedimientos"
                            aria-label="Procedimientos"
                        />
                        <input
                            type="text"
                            value={evolucion}
                            onChange={(e) => setEvolucion(e.target.value)}
                            placeholder="Evolución"
                            aria-label="Evolución"
                        />
                        <button onClick={agregarHistoriaClinica}>Asociar Historia Clínica</button>
                    </div>
                </div>
            )}

            {/* Mostrar lista de citas pendientes para agregar historia clínica */}
            {mostrarFormulario === 'citas' && (
                <ul>
                    {citas.filter(cita => !cita.historiaClinica).map(cita => (
                        <li key={cita.id}>
                            <p><strong>Paciente:</strong> {cita.cedulaPaciente}</p>
                            <p><strong>Fecha:</strong> {cita.fechaCita}</p>
                            <p><strong>Motivo de la Cita:</strong> {cita.motivoCita}</p>
                            <button onClick={() => setSelectedCita(cita)}>Asignar Historia Clínica</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default GestionarHistoriasClinicas;

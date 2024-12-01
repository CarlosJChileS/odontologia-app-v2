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
    const [mensaje, setMensaje] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(null);
    const [selectedHistoria, setSelectedHistoria] = useState(null); // Historia seleccionada para eliminar

    // Cargar historias clínicas y citas desde localStorage
    useEffect(() => {
        const storedHistorias = JSON.parse(localStorage.getItem('historiasClinicas')) || [];
        const storedCitas = JSON.parse(localStorage.getItem('citas')) || [];
        setHistorias(storedHistorias);
        setCitas(storedCitas);
    }, []);

    // Función para agregar historia clínica a la cita seleccionada
    const asociarHistoriaClinica = () => {
        if (!cedulaPaciente.trim()) {
            setMensaje('Por favor, ingresa la cédula del paciente.');
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

        const citaIndex = citas.findIndex(cita => cita.id === selectedCita);
        if (citaIndex === -1) {
            setMensaje('Cita no encontrada.');
            return;
        }

        citas[citaIndex].historiaClinica = nuevaHistoria;

        const updatedCitas = [...citas];
        const updatedHistorias = [...historias, nuevaHistoria];

        localStorage.setItem('citas', JSON.stringify(updatedCitas));
        localStorage.setItem('historiasClinicas', JSON.stringify(updatedHistorias));

        setCitas(updatedCitas);
        setHistorias(updatedHistorias);

        setMensaje('Historia clínica asociada correctamente a la cita.');
        resetFormulario();
        setMostrarFormulario(null);
    };

    // Función para eliminar una cita con su historia clínica
    const eliminarHistoriaClinica = () => {
        if (!selectedHistoria) {
            setMensaje('Por favor, selecciona una historia clínica para eliminar.');
            return;
        }

        const confirmarEliminar = window.confirm('¿Estás seguro de eliminar esta historia clínica y la cita asociada?');
        if (!confirmarEliminar) return;

        // Eliminar la historia clínica
        const historiaIndex = historias.findIndex(historia => historia.idHistoriaClinica === selectedHistoria);
        if (historiaIndex === -1) {
            setMensaje('Historia clínica no encontrada.');
            return;
        }

        // Buscar la cita asociada y eliminarla
        const historia = historias[historiaIndex];
        const citaIndex = citas.findIndex(cita => cita.id === historia.citaId);
        if (citaIndex !== -1) {
            citas.splice(citaIndex, 1); // Eliminar la cita
        }

        // Eliminar la historia clínica de la lista
        historias.splice(historiaIndex, 1);
        localStorage.setItem('historiasClinicas', JSON.stringify(historias));
        localStorage.setItem('citas', JSON.stringify(citas));

        // Actualizar el estado
        setHistorias([...historias]);
        setCitas([...citas]);
        setMensaje('Historia clínica y cita asociada eliminadas correctamente.');
        setSelectedHistoria(null); // Resetear la selección
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

    // Mostrar el formulario de asociar historia clínica
    const mostrarFormularioAsociar = () => {
        setMostrarFormulario('asociar');
    };

    // Mostrar el formulario de eliminar historia clínica
    const mostrarFormularioEliminar = () => {
        setMostrarFormulario('eliminar');
    };

    return (
        <div className="gestionar-historias-container">
            <h1>Gestionar Historias Clínicas</h1>

            {/* Opciones para elegir qué hacer */}
            {mostrarFormulario === null && (
                <div>
                    <button onClick={mostrarFormularioAsociar}>Asociar Cita con Historia Clínica</button>
                    <button onClick={mostrarFormularioEliminar}>Eliminar Historia Clínica</button>
                </div>
            )}

            {/* Mostrar la lista de citas para asociar historia clínica */}
            {mostrarFormulario === 'asociar' && (
                <div>
                    <h2>Selecciona la cita a asociar con Historia Clínica</h2>
                    <div className="citas-container">
                        {citas.filter(cita => !cita.historiaClinica).map(cita => (
                            <div className="cita-box" key={cita.id}>
                                <p><strong>Paciente:</strong> {cita.cedula}</p>
                                <p><strong>Fecha:</strong> {cita.fecha}</p>
                                <p><strong>Motivo de la Cita:</strong> {cita.descripcion}</p>
                                <button onClick={() => setSelectedCita(cita.id)}>
                                    Seleccionar Cita
                                </button>
                            </div>
                        ))}
                    </div>

                    {selectedCita && (
                        <div className="formulario-historia-clinica">
                            <h3>Asociar Historia Clínica</h3>
                            <input
                                type="text"
                                value={cedulaPaciente}
                                onChange={(e) => setCedulaPaciente(e.target.value)}
                                placeholder="Ingrese la cédula del paciente"
                            />
                            <input
                                type="text"
                                value={tipoSangre}
                                onChange={(e) => setTipoSangre(e.target.value)}
                                placeholder="Tipo de sangre"
                            />
                            <input
                                type="text"
                                value={motivoConsulta}
                                onChange={(e) => setMotivoConsulta(e.target.value)}
                                placeholder="Motivo de consulta"
                            />
                            <textarea
                                value={enfermedadActual}
                                onChange={(e) => setEnfermedadActual(e.target.value)}
                                placeholder="Enfermedad actual"
                            />
                            <textarea
                                value={antecedentesPatoPersonales}
                                onChange={(e) => setAntecedentesPatoPersonales(e.target.value)}
                                placeholder="Antecedentes patológicos personales"
                            />
                            <input
                                type="text"
                                value={constantesVitales}
                                onChange={(e) => setConstantesVitales(e.target.value)}
                                placeholder="Constantes vitales"
                            />
                            <input
                                type="text"
                                value={sistemaEstomatognatico}
                                onChange={(e) => setSistemaEstomatognatico(e.target.value)}
                                placeholder="Sistema estomatognático"
                            />
                            <input
                                type="text"
                                value={odontograma}
                                onChange={(e) => setOdontograma(e.target.value)}
                                placeholder="Odontograma"
                            />
                            <input
                                type="text"
                                value={indicadoresSaludBucal}
                                onChange={(e) => setIndicadoresSaludBucal(e.target.value)}
                                placeholder="Indicadores de salud bucal"
                            />
                            <input
                                type="text"
                                value={indicesCPO}
                                onChange={(e) => setIndicesCPO(e.target.value)}
                                placeholder="Índices CPO"
                            />
                            <input
                                type="text"
                                value={diagnostico}
                                onChange={(e) => setDiagnostico(e.target.value)}
                                placeholder="Diagnóstico"
                            />
                            <textarea
                                value={procedimientos}
                                onChange={(e) => setProcedimientos(e.target.value)}
                                placeholder="Procedimientos realizados"
                            />
                            <textarea
                                value={evolucion}
                                onChange={(e) => setEvolucion(e.target.value)}
                                placeholder="Evolución"
                            />
                            <button onClick={asociarHistoriaClinica}>Asociar Historia</button>
                        </div>
                    )}
                </div>
            )}

            {/* Mostrar la lista de historias clínicas para eliminar */}
            {mostrarFormulario === 'eliminar' && (
                <div>
                    <h2>Selecciona la Historia Clínica para Eliminar</h2>
                    <div className="historias-container">
                        {historias.map(historia => (
                            <div className="historia-box" key={historia.idHistoriaClinica}>
                                <p><strong>Paciente:</strong> {historia.cedula}</p>
                                <p><strong>Fecha:</strong> {historia.fecha}</p>
                                <p><strong>Motivo de consulta:</strong> {historia.motivoConsulta}</p>
                                <button onClick={() => setSelectedHistoria(historia.idHistoriaClinica)}>
                                    Seleccionar Historia Clínica
                                </button>
                            </div>
                        ))}
                    </div>

                    {selectedHistoria && (
                        <div className="confirmacion-eliminar">
                            <button onClick={eliminarHistoriaClinica}>Eliminar Historia Clínica y Cita</button>
                        </div>
                    )}
                </div>
            )}

            {/* Mostrar el mensaje de éxito o error */}
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default GestionarHistoriasClinicas;

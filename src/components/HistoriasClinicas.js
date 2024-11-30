import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/components/HistoriasClinicas.css';

function HistoriasClinicas() {
    const { citaId } = useParams();  // Obtener el ID de la cita a la que se vinculará la historia clínica
    const navigate = useNavigate();

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

        // Verificar si la cita ya tiene una historia clínica asociada
        const historiaExistente = storedHistorias.find(h => h.citaId === citaId);
        if (historiaExistente) {
            setHistoria(historiaExistente);  // Si existe, cargarla para editar
        }
    }, [citaId]);

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

        // Crear la nueva historia clínica con un ID único si no existe
        const nuevaHistoria = { ...historia, citaId, idHistoriaClinica: Date.now() };
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

        // Redirigir al paciente o odontólogo
        navigate('/menu-paciente'); // O a cualquier otra ruta que desees
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

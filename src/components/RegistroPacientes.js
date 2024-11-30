import React, { useState } from 'react';
import '../styles/components/RegistroPaciente.css';

function RegistroPaciente() {
    const [tipoSangre, setTipoSangre] = useState('');
    const [cedula, setCedula] = useState('');
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'tipoSangre':
                setTipoSangre(value);
                break;
            case 'cedula':
                setCedula(value);
                break;
            case 'motivoConsulta':
                setMotivoConsulta(value);
                break;
            case 'enfermedadActual':
                setEnfermedadActual(value);
                break;
            case 'antecedentesPatoPersonales':
                setAntecedentesPatoPersonales(value);
                break;
            case 'constantesVitales':
                setConstantesVitales(value);
                break;
            case 'sistemaEstomatognatico':
                setSistemaEstomatognatico(value);
                break;
            case 'odontograma':
                setOdontograma(value);
                break;
            case 'indicadoresSaludBucal':
                setIndicadoresSaludBucal(value);
                break;
            case 'indicesCPO':
                setIndicesCPO(value);
                break;
            case 'diagnostico':
                setDiagnostico(value);
                break;
            case 'procedimientos':
                setProcedimientos(value);
                break;
            case 'evolucion':
                setEvolucion(value);
                break;
            default:
                break;
        }
    };

    const guardarPerfil = (e) => {
        e.preventDefault();

        // Validación del tipo de sangre
        if (!tipoSangre) {
            alert("Por favor, seleccione su tipo de sangre.");
            return;
        }

        // Validación de cédula (debe ser un número)
        if (!/^\d+$/.test(cedula)) {
            alert("La cédula debe ser un número.");
            return;
        }

        // Lógica para guardar el perfil del paciente
        const perfilPaciente = {
            tipoSangre,
            cedula,
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

        // Guardamos el perfil del paciente en localStorage
        let perfilesGuardados = JSON.parse(localStorage.getItem('perfilesPacientes')) || [];
        perfilesGuardados.push(perfilPaciente);
        localStorage.setItem('perfilesPacientes', JSON.stringify(perfilesGuardados));

        alert("Perfil guardado con éxito.");
    };

    return (
        <div className="container">
            <h1>Registro de Paciente</h1>
            <form onSubmit={guardarPerfil}>
                <label>Tipo de Sangre</label>
                <select name="tipoSangre" value={tipoSangre} onChange={handleInputChange} required>
                    <option value="">Seleccione...</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                </select>

                <label>Cédula</label>
                <input type="text" name="cedula" value={cedula} onChange={handleInputChange} required />

                <label>Motivo de Consulta</label>
                <input type="text" name="motivoConsulta" value={motivoConsulta} onChange={handleInputChange} />

                <label>Enfermedad Actual</label>
                <input type="text" name="enfermedadActual" value={enfermedadActual} onChange={handleInputChange} />

                <label>Antecedentes Patológicos Personales</label>
                <input type="text" name="antecedentesPatoPersonales" value={antecedentesPatoPersonales} onChange={handleInputChange} />

                <label>Constantes Vitales</label>
                <input type="text" name="constantesVitales" value={constantesVitales} onChange={handleInputChange} />

                <label>Sistema Estomatognático</label>
                <input type="text" name="sistemaEstomatognatico" value={sistemaEstomatognatico} onChange={handleInputChange} />

                <label>Odontograma</label>
                <input type="text" name="odontograma" value={odontograma} onChange={handleInputChange} />

                <label>Indicadores de Salud Bucal</label>
                <input type="text" name="indicadoresSaludBucal" value={indicadoresSaludBucal} onChange={handleInputChange} />

                <label>Índices CPO</label>
                <input type="text" name="indicesCPO" value={indicesCPO} onChange={handleInputChange} />

                <label>Diagnóstico</label>
                <input type="text" name="diagnostico" value={diagnostico} onChange={handleInputChange} />

                <label>Procedimientos</label>
                <input type="text" name="procedimientos" value={procedimientos} onChange={handleInputChange} />

                <label>Evolución</label>
                <input type="text" name="evolucion" value={evolucion} onChange={handleInputChange} />

                <button type="submit">Guardar Perfil</button>
            </form>
        </div>
    );
}

export default RegistroPaciente;

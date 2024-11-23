import React, { useState } from 'react';
import '../styles/components/RegistroPaciente.css';

function RegistroPaciente() {
    const [tipoSangre, setTipoSangre] = useState('');
    
    const handleInputChange = (e) => {
        setTipoSangre(e.target.value);
    };

    const guardarPerfil = (e) => {
        e.preventDefault();

        if (!tipoSangre) {
            alert("Por favor, seleccione su tipo de sangre.");
            return;
        }

        // Lógica para guardar el perfil del paciente con el tipo de sangre
        const perfilPaciente = {
            tipoSangre: tipoSangre,
            // Otros campos del paciente...
        };

        // Aquí puedes guardar el perfilPaciente en localStorage o enviar a la base de datos
        localStorage.setItem('perfilPaciente', JSON.stringify(perfilPaciente));

        alert("Perfil guardado con éxito.");
    };

    return (
        <div className="container">
            <h1>Registro de Paciente</h1>
            <form onSubmit={guardarPerfil}>
                <label>Tipo de Sangre</label>
                <select value={tipoSangre} onChange={handleInputChange} required>
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
                <button type="submit">Guardar Perfil</button>
            </form>
        </div>
    );
}

export default RegistroPaciente;

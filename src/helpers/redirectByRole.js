// src/helpers/redirectByRole.js

import { useNavigate } from 'react-router-dom';

export function useRoleRedirect() {
    const navigate = useNavigate();

    return () => {
        const rol = sessionStorage.getItem('usuarioRol');
        console.log('Rol obtenido:', rol); // Agrega esta línea para depurar
        if (rol === 'paciente') {
            navigate('/menu-paciente');
        } else if (rol === 'odontologo') {
            navigate('/menu-odontologo');
        } else {
            navigate('/login'); // Redirigir a login si no hay rol guardado
        }
    };
}

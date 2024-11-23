// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ allowedRoles, children }) {
    const userRole = sessionStorage.getItem('usuarioRol');

    // Verifica si el rol del usuario está dentro de los roles permitidos
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;

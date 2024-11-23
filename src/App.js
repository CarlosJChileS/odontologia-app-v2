// src/App.js

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MenuAdministrador from './components/MenuAdministrador';
import MenuPaciente from './components/MenuPaciente';
import MenuOdontologo from './components/MenuOdontologo';
import AgendarCita from './components/AgendarCita';
import Calendario from './components/Calendario';
import VerHistoriasClinicas from './components/VerHistoriasClinicas';
import GestionarHistoriasClinicas from './components/GestionarHistoriasClinicas';
import GestionarPacientes from './components/GestionarPacientes';
import GestionarOdontologos from './components/GestionarOdontologos';
import GestionarCitas from './components/GestionarCitas';
import Admin from './components/Admin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                {/* Redirige a /login si la ruta es "/" */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Rutas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas protegidas para administrador */}
                <Route 
                    path="/menu-administrador" 
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <MenuAdministrador />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/gestionar-pacientes" 
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <GestionarPacientes />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/gestionar-odontologos" 
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <GestionarOdontologos />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/gestionar-citas" 
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <GestionarCitas />
                        </ProtectedRoute>
                    } 
                />

                {/* Rutas protegidas para paciente */}
                <Route 
                    path="/menu-paciente" 
                    element={
                        <ProtectedRoute allowedRoles={['paciente']}>
                            <MenuPaciente />
                        </ProtectedRoute>
                    } 
                />
                
                {/* Rutas protegidas para odontólogo */}
                <Route 
                    path="/menu-odontologo" 
                    element={
                        <ProtectedRoute allowedRoles={['odontologo']}>
                            <MenuOdontologo />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/gestionar-historias" 
                    element={
                        <ProtectedRoute allowedRoles={['odontologo']}>
                            <GestionarHistoriasClinicas />
                        </ProtectedRoute>
                    } 
                />

                {/* Rutas adicionales que no requieren protección */}
                <Route path="/agendar-cita" element={<AgendarCita />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/ver-historias" element={<VerHistoriasClinicas />} />

                {/* Redirige a /login para cualquier ruta inexistente */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;

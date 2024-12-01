import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { useRoleRedirect } from '../helpers/redirectByRole';
import '../styles/components/Calendario.css';

function Calendario() {
    const calendarRef = useRef(null);
    const [eventos, setEventos] = useState([]);
    const goBackToMenu = useRoleRedirect();

    // Cargar citas desde localStorage
    useEffect(() => {
        const storedCitas = JSON.parse(localStorage.getItem('citas')) || [];
        const eventosCitas = storedCitas.map(cita => ({
            id: cita.id, // Usamos el ID de la cita
            title: `Cédula: ${cita.cedula}`,
            start: `${cita.fecha}T${cita.hora}`,
            extendedProps: {
                descripcion: cita.descripcion,
                ubicacion: cita.ubicacion,
            },
        }));
        setEventos(eventosCitas);
    }, []);

    // Eliminar la cita seleccionada
    const eliminarCita = (idCita) => {
        // Recuperamos las citas actuales desde localStorage
        const citas = JSON.parse(localStorage.getItem('citas')) || [];

        // Filtramos la cita que no queremos
        const citasFiltradas = citas.filter(cita => cita.id !== idCita);

        // Si la cita fue eliminada, actualizamos el localStorage
        if (citas.length !== citasFiltradas.length) {
            localStorage.setItem('citas', JSON.stringify(citasFiltradas));

            // Actualizamos el estado de los eventos
            setEventos(citasFiltradas.map(cita => ({
                id: cita.id,
                title: `Cédula: ${cita.cedula}`,
                start: `${cita.fecha}T${cita.hora}`,
                extendedProps: {
                    descripcion: cita.descripcion,
                    ubicacion: cita.ubicacion,
                },
            })));

            alert("Cita eliminada con éxito");
        } else {
            alert("No se encontró la cita que quieres eliminar");
        }
    };

    // Manejar el clic en un evento (cita) y confirmar eliminación
    const handleEventClick = (info) => {
        const detallesCita = `Detalles de la cita:\n\nCédula: ${info.event.title}\nDescripción: ${info.event.extendedProps.descripcion}`;
        const confirmarEliminar = window.confirm(`${detallesCita}\n\n¿Deseas eliminar esta cita?`);

        if (confirmarEliminar) {
            // Eliminar la cita utilizando el ID del evento
            eliminarCita(info.event.id);  // Usamos el ID único del evento para eliminar la cita

            // Eliminar el evento del calendario (directamente desde el estado)
            setEventos((prevEventos) => prevEventos.filter(evento => evento.id !== info.event.id));
        }
    };

    return (
        <div className="container calendario-container">
            <h1>Calendario de Citas</h1>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={esLocale}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                events={eventos}  // Pasamos los eventos al FullCalendar
                dateClick={(info) => calendarRef.current.getApi().changeView('timeGridDay', info.dateStr)}
                eventClick={handleEventClick}  // Define el comportamiento al hacer clic en un evento
                eventDidMount={(info) => {
                    // Ajustamos el texto del evento para evitar que se desborde
                    if (info.el && info.el.querySelector('.fc-event-title')) {
                        const titleElement = info.el.querySelector('.fc-event-title');
                        titleElement.style.whiteSpace = 'normal';
                    }
                }}
            />
            {/* Botón para volver al menú */}
            <button onClick={goBackToMenu} aria-label="Volver al Menú">Volver al Menú</button>
        </div>
    );
}

export default Calendario;

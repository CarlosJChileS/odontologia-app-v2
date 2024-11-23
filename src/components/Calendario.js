// src/components/Calendario.js
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

    useEffect(() => {
        fetch('/citas.json')
            .then(response => response.json())
            .then(data => {
                const eventosCitas = data.map(cita => ({
                    id: cita.idCita,
                    title: `Cédula: ${cita.cedula}`,
                    start: `${cita.fecha}T${cita.hora}`,
                    extendedProps: {
                        descripcion: cita.descripcion,
                        ubicacion: cita.ubicacion,
                    },
                }));
                setEventos(eventosCitas);
            })
            .catch(error => console.error("Error al cargar citas desde JSON:", error));
    }, []);

    const handleEventClick = (info) => {
        const detallesCita = `Detalles de la cita:\n\nCédula: ${info.event.title}\nDescripción: ${info.event.extendedProps.descripcion}`;
        const confirmarEliminar = window.confirm(`${detallesCita}\n\n¿Deseas eliminar esta cita?`);

        if (confirmarEliminar) {
            eliminarCita(info.event.id);
            setEventos(eventos.filter(evento => evento.id !== info.event.id));
        }
    };

    const eliminarCita = (idCita) => {
        console.log(`Eliminaría la cita con ID: ${idCita}`);
        alert("Cita eliminada con éxito");
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
                events={eventos}
                dateClick={(info) => calendarRef.current.getApi().changeView('timeGridDay', info.dateStr)}
                eventClick={handleEventClick}
                eventDidMount={(info) => {
                    if (info.el && info.el.querySelector('.fc-event-title')) {
                        const titleElement = info.el.querySelector('.fc-event-title');
                        titleElement.style.whiteSpace = 'normal';
                    }
                }}
            />
            <button onClick={goBackToMenu}>Volver al Menú</button>
        </div>
    );
}

export default Calendario;

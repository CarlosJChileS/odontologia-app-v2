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
            id: cita.id,
            title: `Cédula: ${cita.cedula}`,
            start: `${cita.fecha}T${cita.hora}`,
            extendedProps: {
                descripcion: cita.descripcion,
                ubicacion: cita.ubicacion,
            },
        }));
        setEventos(eventosCitas);
    }, []);

    // Manejar el clic en un evento (cita)
    const handleEventClick = (info) => {
        const detallesCita = `Detalles de la cita:\n\nCédula: ${info.event.title}\nDescripción: ${info.event.extendedProps.descripcion}`;
        const confirmarEliminar = window.confirm(`${detallesCita}\n\n¿Deseas eliminar esta cita?`);

        if (confirmarEliminar) {
            eliminarCita(info.event.id); // Eliminar cita del localStorage

            // Filtramos el evento del calendario y actualizamos el estado
            setEventos((prevEventos) => {
                return prevEventos.filter(evento => evento.id !== info.event.id);
            });

            // Actualizamos FullCalendar para reflejar la eliminación
            const calendarApi = calendarRef.current.getApi();
            calendarApi.refetchEvents(); // Forzamos a FullCalendar a recargar los eventos
        }
    };

    // Eliminar cita de localStorage
    const eliminarCita = (idCita) => {
        let citas = JSON.parse(localStorage.getItem('citas')) || [];
        citas = citas.filter(cita => cita.id !== idCita); // Filtramos la cita eliminada
        localStorage.setItem('citas', JSON.stringify(citas)); // Guardamos las citas actualizadas en localStorage

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
                events={eventos} // Pasamos los eventos al FullCalendar
                dateClick={(info) => calendarRef.current.getApi().changeView('timeGridDay', info.dateStr)}
                eventClick={handleEventClick} // Definimos el comportamiento al hacer clic en un evento
                eventDidMount={(info) => {
                    // Ajustamos el texto del evento para que no se desborde
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

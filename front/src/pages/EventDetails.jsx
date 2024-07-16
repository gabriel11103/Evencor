import React, { useEffect, useState, useCallback } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();

  const fetchEvent = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/eventos/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEvent(data);
        setError('');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('Error en la conexión con el servidor');
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <Container className="event-details-container">
      <h2 className="text-center mb-4">Detalles del Evento</h2>
      {event ? (
        <Card>
          <Card.Body>
            <Card.Title>Evento: {event.nombre}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Fecha: {new Date(event.fechaEvento).toLocaleString()}
            </Card.Subtitle>
            <Card.Text>Precio: ${event.precio}</Card.Text>
            <Card.Text>Establecimiento: {event.establecimiento}</Card.Text>
            <Link to="/eventos">
              <Button variant="secondary">Volver a la Lista de Eventos</Button>
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <p>Cargando...</p>
      )}
    </Container>
  );
};

export default EventDetails;


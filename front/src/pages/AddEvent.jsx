import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AddEvent.css';

function AddEvent() {
  const [fechaEvento, setFechaEvento] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [establecimiento, setEstablecimiento] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const establecimientos = [
    'Plaza de la Música',
    'Quality',
    'Forja',
    'Orfeo',
    'Comedor',
    'La Fábrica',
    'Kempes',
    'Palacio',
    'Studio Theater'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Obtén el token del localStorage
      const response = await fetch('http://localhost:3001/eventos', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Envía el token en los encabezados de la solicitud
        },
        body: JSON.stringify({ fechaEvento, nombre, precio, establecimiento }),
      });
      if (response.ok) {
        navigate('/eventos');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('Error solo el admin puede agregar eventos');
    }
  };

  return (
    <Container className="add-event-container">
      <h2 className="text-center mb-4">Agregar Evento</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFechaEvento" className="mb-3">
          <Form.Label>Fecha del Evento</Form.Label>
          <Form.Control
            type="datetime-local"
            placeholder="Introduce la fecha del evento"
            value={fechaEvento}
            onChange={(e) => setFechaEvento(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formNombre" className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduce el nombre del evento"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPrecio" className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Introduce el precio del evento"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEstablecimiento" className="mb-3">
          <Form.Label>Establecimiento</Form.Label>
          <Form.Control
            as="select"
            value={establecimiento}
            onChange={(e) => setEstablecimiento(e.target.value)}
            required
          >
            <option value="">Selecciona un establecimiento</option>
            {establecimientos.map((est, index) => (
              <option key={index} value={est}>{est}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Agregar Evento
        </Button>
      </Form>
    </Container>
  );
}

export default AddEvent;


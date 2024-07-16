import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './EditEvent.css';

const EditEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [fechaEvento, setFechaEvento] = useState('');
  const [establecimiento, setEstablecimiento] = useState('');
  const navigate = useNavigate();

  const establecimientos = [
    'Plaza de la Música',
    'Quality',
    'Forja',
    'Orfeo Superdomo',
    'Comedor Universitario',
    'La Fábrica',
    'Kempes',
    'Palacio',
    'Studio Theater'
  ];

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3001/eventos/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
          setNombre(data.nombre || '');
          setPrecio(data.precio || '');
          setFechaEvento(new Date(data.fechaEvento).toISOString().slice(0, 16) || '');
          setEstablecimiento(data.establecimiento || '');
        } else {
          const data = await response.json();
          setError(data.error);
        }
      } catch (error) {
        setError('Error en la conexión con el servidor');
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    try {
      const response = await fetch(`http://localhost:3001/eventos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Incluye el token en los encabezados
        },
        body: JSON.stringify({ nombre, precio, fechaEvento, establecimiento }),
      });
      if (response.ok) {
        navigate('/eventos');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('Error solo el admin puede editar un evento');
    }
  };

  return (
    <Container className="edit-event-container">
      <h2 className="text-center mb-4">Editar Evento</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {event ? (
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
            Guardar Cambios
          </Button>
        </Form>
      ) : (
        <p>Cargando...</p>
      )}
    </Container>
  );
};

export default EditEvent;


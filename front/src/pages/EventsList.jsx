import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Table, Container, Button, Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './EventsList.css';

const EventsList = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searched, setSearched] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchEventos = useCallback(async (nombre = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/eventos?nombre=${nombre}`);
      if (Array.isArray(response.data.eventos)) {
        setEventos(response.data.eventos);
      } else {
        console.error('La respuesta de la API no contiene la propiedad "eventos" como un array:', response.data);
        setError('Error: La respuesta de la API no contiene "eventos" como un array.');
      }
      setError('');
    } catch (error) {
      setError('Error al obtener eventos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEventos();
    const role = localStorage.getItem('role');
    setIsAdmin(role === 'admin');
  }, [fetchEventos]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSearch = () => {
    fetchEventos(searchTerm);
    setSearched(true);
  };

  const handleReset = () => {
    setSearchTerm('');
    fetchEventos();
    setSearched(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:3001/eventos/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setEventos(eventos.filter(evento => evento.idEvento !== id));
        setSuccessMessage('Evento eliminado con éxito');
        setError('');
      } catch (error) {
        setError('Error al eliminar el evento, solo puede hacerlo el admin');
      }
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <Container>
      <h2 className="text-center mb-4">Lista de Eventos</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form className="mb-4">
        <Form.Group controlId="searchEvent">
          <Form.Control
            type="text"
            placeholder="Buscar por nombre del evento"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSearch} className="mt-2">Buscar</Button>
        {searched && (
          <Button variant="secondary" onClick={handleReset} className="mt-2 ms-2">Volver a la Lista De Eventos</Button>
        )}
      </Form>
      {!searched && isAdmin && (
        <Link to="/eventos/add" className="btn btn-primary mb-3">Agregar Evento</Link>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Establecimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(eventos) && eventos.length > 0 ? (
            eventos.map(evento => (
              <tr key={evento.idEvento}>
                <td>{evento.idEvento}</td>
                <td>{new Date(evento.fechaEvento).toLocaleDateString()}</td>
                <td>{evento.nombre || 'No asignado'}</td>
                <td>${evento.precio}</td>
                <td>{evento.establecimiento}</td>
                <td>
                  <Link to={`/eventos/${evento.idEvento}`} className="btn btn-info btn-sm">Ver</Link>
                  {isAdmin && (
                    <>
                      <Link to={`/eventos/editar/${evento.idEvento}`} className="btn btn-warning btn-sm mx-2">Editar</Link>
                      <Button onClick={() => handleDelete(evento.idEvento)} className="btn btn-danger btn-sm">Eliminar</Button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No hay eventos para mostrar</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default EventsList;


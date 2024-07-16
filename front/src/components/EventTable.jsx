import React, { useState } from 'react';

function EventTable() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  const fetchEvents = () => {
    fetch("http://localhost:3001/eventos")
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        // Extrae la propiedad 'eventos' de la respuesta
        setEvents(data.eventos || []);  
        setError('');
      })
      .catch(error => {
        setError('Error fetching data: ' + error.message);
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="container" style={{ marginTop: '70px' }}>
      <button type="button" className="btn btn-primary mb-3" onClick={fetchEvents}>
        Consultar Eventos
      </button>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered border-primary table-striped container-xl">
        <thead>
          <tr>
            <th scope="col">IdEvento</th>
            <th scope="col">Fecha de Evento</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Establecimiento</th>
          </tr>
        </thead>
        <tbody id="TablaEventos">
          {events.map(e => (
            <tr key={e.idEvento}>
              <td>{e.idEvento}</td>
              <td>{new Date(e.fechaEvento).toLocaleString()}</td>
              <td>{e.nombre}</td>
              <td>${e.precio}</td>
              <td>{e.establecimiento}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventTable;

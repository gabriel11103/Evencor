import React from 'react';
import EventTable from '../components/EventTable';
import './Home.css';  // Asegúrate de que este archivo CSS esté importado

function Home() {
  return (
    <div className="home-container">
      <h1 className="text-center mt-5">Bienvenido a Evencor</h1>
      <p className="text-center mb-5">Consulta los eventos disponibles.</p>
      <EventTable />
    </div>
  );
}

export default Home;

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const isLoggedIn = !!localStorage.getItem('token'); // Verifica si hay un token en localStorage
  const email = localStorage.getItem('email'); // Obtiene el email del usuario logueado
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/'); 
  };

  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
      <Navbar.Brand as={Link} to="/">Evencor</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navbar-nav">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/info">Info</Nav.Link>
          <Nav.Link as={Link} to="/eventos">Eventos</Nav.Link>
          {isLoggedIn ? (
            <>
              <Nav.Link as={Link} to="/user">Usuario: {email}</Nav.Link>
              <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Ingresa</Nav.Link>
              <Nav.Link as={Link} to="/register">Registrate</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;


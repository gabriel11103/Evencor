import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function UserPage() {
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  if (!email) {
    navigate('/login');
    return null;
  }

  return (
    <Container>
      <h2>Usuario Actual</h2>
      <p>Email: {email}</p>
      <p>Rol: {role}</p>
    </Container>
  );
}

export default UserPage;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Info from './pages/Info';
import Login from './pages/Login';
import Register from './pages/Register';
import EventsList from './pages/EventsList';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import EventDetails from './pages/EventDetails';
import UserPage from './pages/UserPage'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/eventos" element={<EventsList />} />
            <Route path="/eventos/add" element={<AddEvent />} />
            <Route path="/eventos/editar/:id" element={<EditEvent />} />
            <Route path="/eventos/:id" element={<EventDetails />} />
            <Route path="/user" element={<UserPage />} /> {/* Ruta para la página del usuario */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;



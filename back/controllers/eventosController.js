const EventoSvc = require("../services/eventossvc");

const getAllEventos = async (req, res) => {
  try {
    const { nombre } = req.query;
    const eventos = nombre
      ? await EventoSvc.getAllByEvento(nombre)
      : await EventoSvc.getAll();
    res.json({ eventos });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving events" });
  }
};

const getEventoById = async (req, res) => {
  try {
    const evento = await EventoSvc.getById(req.params.id);
    if (evento) {
      res.json(evento);
    } else {
      res.status(404).json({ error: "Evento no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving event" });
  }
};

const createEvento = async (req, res) => {
  const { fechaEvento, nombre, precio, establecimiento } = req.body;
  try {
    const newEvent = await EventoSvc.create({
      fechaEvento,
      nombre,
      precio,
      establecimiento,
    });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el evento" });
  }
};

const updateEvento = async (req, res) => {
  try {
    const updatedEvento = await EventoSvc.update(req.params.id, req.body);
    if (updatedEvento) {
      res.json(updatedEvento);
    } else {
      res.status(404).send("Event not found");
    }
  } catch (error) {
    res.status(500).send("Error updating event");
  }
};

const deleteEvento = async (req, res) => {
  try {
    const deletedEvento = await EventoSvc.deleteById(req.params.id);
    if (deletedEvento) {
      res.json({ message: "Event deleted" });
    } else {
      res.status(404).send("Event not found");
    }
  } catch (error) {
    res.status(500).send("Error deleting event");
  }
};

const searchEventosByName = async (req, res) => {
  const { nombre } = req.query;
  try {
    const eventos = await EventoSvc.getAllByEvento(nombre);
    res.json({ eventos });
  } catch (error) {
    res.status(500).json({ error: "Error searching events" });
  }
};

module.exports = {
  getAllEventos,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento,
  searchEventosByName,
};

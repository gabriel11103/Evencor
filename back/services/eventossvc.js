const Evento = require("../models/eventos");
const { Op } = require("sequelize");

const getAll = async () => {
  return await Evento.findAll({
    order: [
      ["fechaEvento", "ASC"],
      ["idEvento", "ASC"],
    ],
    attributes: [
      "idEvento",
      "nombre",
      "fechaEvento",
      "precio",
      "establecimiento",
    ],
  });
};

const getById = async (id) => {
  return await Evento.findByPk(id);
};

const getAllByEvento = async (nombreEvento) => {
  return await Evento.findAll({
    where: {
      nombre: {
        [Op.startsWith]: nombreEvento,
      },
    },
    order: [
      ["fechaEvento", "ASC"],
      ["idEvento", "ASC"],
    ],
    attributes: [
      "idEvento",
      "nombre",
      "fechaEvento",
      "precio",
      "establecimiento",
    ],
  });
};

const create = async (eventoData) => {
  return await Evento.create(eventoData);
};

const update = async (id, eventoData) => {
  const evento = await Evento.findByPk(id);
  if (evento) {
    return await evento.update(eventoData);
  }
  return null;
};

const deleteById = async (id) => {
  const evento = await Evento.findByPk(id);
  if (evento) {
    await evento.destroy();
    return evento;
  }
  return null;
};

module.exports = {
  getAll,
  getById,
  getAllByEvento,
  create,
  update,
  deleteById,
};

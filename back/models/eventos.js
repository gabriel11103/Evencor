const { Model, DataTypes } = require('sequelize');
const db = require('../data/db');

class Evento extends Model {}

Evento.init({
  idEvento: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fechaEvento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  establecimiento: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'Evento',
  tableName: 'eventos',
});

module.exports = Evento;




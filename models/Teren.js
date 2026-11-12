const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Teren = sequelize.define('Teren', {
  TerenID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Denumire: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  OraDeschidere: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  OraInchidere: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  Sport: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  TarifOrar: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  Disponibil: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'terenuri',
  timestamps: false,
});

module.exports = Teren;
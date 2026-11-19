const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rezervare = sequelize.define('Rezervare', {
  RezervareID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'rezervareid',
  },
  UtilizatorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'utilizatorid',
  },
  TerenID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'terenid',
  },
  DataCreare: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'datacreare',
  },
  OraStart: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'orastart',
  },
  OraFinal: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'orafinal',
  },
  Status: {
    type: DataTypes.STRING(50),
    defaultValue: 'Confirmata',
    field: 'status',
  },
}, {
  tableName: 'rezervari',
  timestamps: false,
});

module.exports = Rezervare;
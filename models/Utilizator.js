const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Utilizator = sequelize.define('Utilizator', {
  UtilizatorID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'utilizatorid',
  },
  Nume: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'nume',
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    field: 'email',
  },
  Telefon: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'telefon',
  },
  TipUser: {
    type: DataTypes.STRING(50),
    defaultValue: 'Client',
    field: 'tipuser',
  },
  DataCreare: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'datacreare',
  },
}, {
  tableName: 'utilizatori',
  timestamps: false,
});

module.exports = Utilizator;
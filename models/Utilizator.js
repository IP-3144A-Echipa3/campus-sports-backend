const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Utilizator = sequelize.define('Utilizator', {
  UtilizatorID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nume: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  Telefon: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  TipUser: {
    type: DataTypes.STRING(50),
    defaultValue: 'Client',
  },
  DataCreare: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'utilizatori',
  timestamps: false, // We manually mapped DataCreare instead of using Sequelize default timestamps
});

module.exports = Utilizator;
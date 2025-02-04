const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Cliente = sequelize.define('Cliente', {
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [7, 15]
        }
    }
}, {
    tableName: 'clientes',
    timestamps: false
});

module.exports = Cliente;
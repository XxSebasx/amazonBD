const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('pedido', {
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        required: true
    },
    monto:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        required: true,
        validate:{
            min: 1
        }
    },
    estado:{
        type: DataTypes.ENUM('Pendiente', 'completado', 'cancelado'),
        allowNull: false,
        defaultValue: 'Pendiente'
    },
    clienteID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: 'clientes',
            key: 'ID'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false,
    tableName: 'pedidos'
});

module.exports = Pedido;
const Cliente = require('./Cliente');
const Pedido = require('./Pedido');

// Definir las asociaciones
Cliente.hasMany(Pedido, { foreignKey: 'clienteID' });
Pedido.belongsTo(Cliente, { foreignKey: 'clienteID' });

module.exports = {
    Cliente,
    Pedido
};